import { useEffect, useState, useMemo } from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  GraduationCap,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { getDashboardOverview } from "../services/dashboardService";

/* =========================
 * Helpers
 * =======================*/

const formatCurrency = (amount) => {
  const n = Number(amount) || 0;
  return n.toLocaleString("es-UY", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Fallbacks mock para cuando no haya datos reales (por ejemplo en desarrollo)
const mockTopProductsFallback = [
  { name: "Bolsa Reutilizable Eco", sales: 234, revenue: 4680 },
  { name: "Kit de Compostaje", sales: 189, revenue: 7560 },
  { name: "Botellas de Vidrio Set", sales: 156, revenue: 3120 },
  { name: "Papel Reciclado Pack", sales: 143, revenue: 2145 },
];

const recentActivityMock = [
  { action: "Nueva orden #1234", time: "Hace 5 min" },
  { action: "Nuevo suscriptor Premium", time: "Hace 15 min" },
  { action: "Producto agregado: Macetas Eco", time: "Hace 1 hora" },
  { action: "Curso completado: Compostaje 101", time: "Hace 2 horas" },
];

/* =========================
 * Componente
 * =======================*/

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
   * Cargar métricas del Dashboard
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardOverview();
        if (isMounted) {
          setMetrics(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("No se pudo cargar el resumen del dashboard.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
   * Construir cards de stats
   * =======================*/
  const stats = useMemo(() => {
    if (!metrics) {
      // Mientras carga o si falló, devolvemos algo razonable vacío
      return [];
    }

    const {
      totalSales,
      activeProducts,
      subscribers,
      activeCourses,
      pendingOrders,
    } = metrics;

    return [
      {
        title: "Ventas Totales",
        value: formatCurrency(totalSales),
        // Estos textos siguen siendo mock hasta que quieras hacer métricas por mes
        change: "+12.5% vs mes anterior",
        changeType: "positive",
        icon: DollarSign,
        iconColor: "text-primary",
      },
      {
        title: "Productos Activos",
        value: String(activeProducts ?? 0),
        change: "+8 nuevos",
        changeType: "positive",
        icon: Package,
        iconColor: "text-primary",
      },
      {
        title: "Suscriptores",
        value: String(subscribers ?? 0),
        change: "+23% este mes",
        changeType: "positive",
        icon: Users,
        iconColor: "text-primary",
      },
      {
        title: "Cursos Activos",
        value: String(activeCourses ?? 0),
        change: "3 en desarrollo",
        changeType: "neutral",
        icon: GraduationCap,
        iconColor: "text-primary",
      },
      {
        title: "Órdenes Pendientes",
        value: String(pendingOrders ?? 0),
        change: "-5 vs ayer",
        changeType: "negative",
        icon: ShoppingBag,
        iconColor: "text-primary",
      },
      {
        title: "Tasa de Conversión",
        // Por ahora sigue siendo mock (no tenemos analytics)
        value: "3.2%",
        change: "+0.8%",
        changeType: "positive",
        icon: TrendingUp,
        iconColor: "text-primary",
      },
    ];
  }, [metrics]);

  /* =========================
   * Top Products (real + fallback)
   * =======================*/
  const topProducts = useMemo(() => {
    if (!metrics || !metrics.topProducts || metrics.topProducts.length === 0) {
      return mockTopProductsFallback;
    }

    // metrics.topProducts: { name, sales, revenue (number) }
    return metrics.topProducts.map((p) => ({
      ...p,
      revenueFormatted: formatCurrency(p.revenue),
    }));
  }, [metrics]);

  const recentActivity = recentActivityMock;

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="fw-bold display-6 mb-1">Dashboard</h1>
        <p className="text-muted">
          Resumen general de tu plataforma de reciclaje
        </p>
      </div>

      {/* Mensaje de error si algo falla */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="row g-4 mb-4">
        {loading && !metrics ? (
          <div className="col-12">
            <p className="text-muted">Cargando métricas...</p>
          </div>
        ) : (
          stats.map((s, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <StatCard {...s} />
            </div>
          ))
        )}
      </div>

      {/* Products + Activity */}
      <div className="row g-4">
        {/* Productos Más Vendidos */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0 fw-semibold">Productos Más Vendidos</h5>
            </div>
            <div className="card-body">
              {loading && !metrics ? (
                <p className="text-muted mb-0">Cargando productos...</p>
              ) : (
                topProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-3"
                  >
                    <div>
                      <p className="fw-medium mb-0">{product.name}</p>
                      <small className="text-muted">
                        {product.sales} ventas
                      </small>
                    </div>
                    <span className="fw-semibold text-primary">
                      {product.revenueFormatted
                        ? product.revenueFormatted
                        : formatCurrency(product.revenue)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Actividad Reciente (por ahora mock) */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0 fw-semibold">Actividad Reciente</h5>
            </div>
            <div className="card-body">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 mb-3"
                >
                  <div className="mt-2">
                    <div
                      className="rounded-circle bg-pn"
                      style={{ width: "8px", height: "8px" }}
                    />
                  </div>
                  <div>
                    <p className="fw-medium mb-0">{activity.action}</p>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
