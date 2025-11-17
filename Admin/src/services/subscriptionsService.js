import api from "./api";

function mapPlan(apiPlan) {
  if (!apiPlan) return null;

  return {
    id: apiPlan.id,
    name: apiPlan.name,
    price: apiPlan.price, // número o string, lo formateamos en la UI
    // si tu modelo tiene algo tipo billing_period, period_label, etc.,
    // lo usás acá. Por ahora ponemos "mes" como default.
    period: apiPlan.period || apiPlan.period_label || "mes",
    subscribers: apiPlan.subscribers_count ?? 0,
    features: (apiPlan.features || []).map((f) => {
      return f.label || f.title || f.description || f.name || "";
    }),
    status: apiPlan.status,
    raw: apiPlan,
  };
}

/* ================================
 *  PUBLIC
 * ================================ */

// GET /api/subscriptions/plans
export async function getActivePlans() {
  const res = await api.get("/subscriptions/plans");
  return res.data.map(mapPlan);
}

// GET /api/subscriptions/plans/:id
export async function getPlanById(id) {
  const res = await api.get(`/subscriptions/plans/${id}`);
  return mapPlan(res.data);
}

/* ================================
 *  ADMIN
 * ================================ */

// POST /api/subscriptions/admin/plans
export async function createPlan(payload) {
  const res = await api.post("/subscriptions/admin/plans", payload);
  return mapPlan(res.data);
}

// PUT /api/subscriptions/admin/plans/:id
export async function updatePlan(id, payload) {
  const res = await api.put(`/subscriptions/admin/plans/${id}`, payload);
  return mapPlan(res.data);
}

// DELETE /api/subscriptions/admin/plans/:id
export async function deletePlan(id) {
  const res = await api.delete(`/subscriptions/admin/plans/${id}`);
  return res.data; // { message: "Plan marcado como inactivo" }
}

// GET /api/subscriptions/admin/plans/:id/subscribers
export async function getPlanSubscribers(id) {
  const res = await api.get(`/subscriptions/admin/plans/${id}/subscribers`);
  return res.data; // { plan, subscribers: [...] }
}
