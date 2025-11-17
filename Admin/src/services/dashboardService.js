import api from "./api";

function safeNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * Calcula las métricas del dashboard a partir de:
 * - /api/store/admin/orders
 * - /api/store/products?status=active
 * - /api/services?status=active
 * - /api/subscriptions/plans
 */
export async function getDashboardOverview() {
  const [ordersRes, productsRes, servicesRes, plansRes] = await Promise.all([
    api.get("/store/admin/orders"),
    api.get("/store/products", { params: { status: "active" } }),
    api.get("/services", { params: { status: "active" } }),
    api.get("/subscriptions/plans"),
  ]);

  const orders = ordersRes.data || [];
  const products = productsRes.data || [];
  const services = servicesRes.data || [];
  const plans = plansRes.data || [];

  /* ============
   * Métricas base
   * ============ */

  // Ventas totales: sumamos total_amount de todas las órdenes
  const totalSales = orders.reduce(
    (acc, order) => acc + safeNumber(order.total_amount),
    0
  );

  // Órdenes pendientes (status === "pending")
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  // Productos activos = productos devueltos por /products?status=active
  const activeProducts = products.length;

  // Cursos activos = servicios con status "active" (ya filtrados por el endpoint)
  const activeCourses = services.length;

  // Suscriptores = suma de subscribers_count en los planes activos
  const subscribers = plans.reduce(
    (acc, plan) => acc + safeNumber(plan.subscribers_count),
    0
  );

  /* ============
   * Top Products
   * ============ */

  const productStats = new Map();

  for (const order of orders) {
    const items = order.items || [];
    for (const item of items) {
      const product = item.product || {};
      const name = product.name || `Producto #${item.product_id}`;

      const qty = safeNumber(item.quantity);
      const revenue = safeNumber(item.subtotal);

      if (!productStats.has(name)) {
        productStats.set(name, {
          name,
          sales: 0,
          revenue: 0,
        });
      }

      const current = productStats.get(name);
      current.sales += qty;
      current.revenue += revenue;
    }
  }

  const topProducts = Array.from(productStats.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);

  return {
    totalSales,
    pendingOrders,
    activeProducts,
    activeCourses,
    subscribers,
    topProducts,
  };
}
