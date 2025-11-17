import api from "./api";

/**
 * Normaliza el objeto que viene de la API a algo cómodo para el front.
 * Basado en el Service del backend:
 *  - status: "active" | "draft" | "inactive"
 *  - students_count: contador de inscriptos
 */
function mapService(apiService) {
  if (!apiService) return null;

  return {
    id: apiService.id,
    title: apiService.title,
    type: apiService.type, // "Curso" | "Taller"
    duration: apiService.duration || apiService.duration_label || "",
    price: apiService.price,
    students: apiService.students_count ?? apiService.students ?? 0,
    status: apiService.status,
    raw: apiService, // por si más adelante necesitás campos extra
  };
}

/* ================================
 *  PUBLIC (usa listPublicServices)
 * ================================ */

/**
 * GET /api/services
 * Acepta filtros opcionales: { type, status }
 * - Por defecto el backend devuelve sólo status = "active".
 */
export async function getPublicServices(params = {}) {
  const res = await api.get("/services", { params });
  return res.data.map(mapService);
}

/**
 * GET /api/services/:id
 */
export async function getServiceById(id) {
  const res = await api.get(`/services/${id}`);
  return mapService(res.data);
}

/* ================================
 *  CLIENTE AUTENTICADO
 * ================================ */

/**
 * POST /api/services/:id/enroll
 */
export async function enrollInService(id, payload = {}) {
  const res = await api.post(`/services/${id}/enroll`, payload);
  return res.data; // { message, enrollment }
}

/**
 * GET /api/services/me/enrollments
 */
export async function getMyEnrollments() {
  const res = await api.get("/services/me/enrollments");
  return res.data; // [{...enrollment, service: {...}}...]
}

/* ================================
 *  ADMIN
 * ================================ */

/**
 * Lista para el ADMIN.
 *
 * Como no hay un endpoint separado tipo /api/services/admin/list,
 * usamos listPublicServices con distintos status:
 *  - status=active
 *  - status=draft
 * (si más adelante querés incluir "inactive", se agrega otra llamada)
 */
export async function getAdminServices() {
  const [activeRes, draftRes] = await Promise.all([
    api.get("/services", { params: { status: "active" } }),
    api.get("/services", { params: { status: "draft" } }),
  ]);

  const merged = [...activeRes.data, ...draftRes.data];
  return merged.map(mapService);
}

/**
 * POST /api/services/admin
 */
export async function createService(payload) {
  const res = await api.post("/services/admin", payload);
  return mapService(res.data);
}

/**
 * PUT /api/services/admin/:id
 */
export async function updateService(id, payload) {
  const res = await api.put(`/services/admin/${id}`, payload);
  return mapService(res.data);
}

/**
 * DELETE /api/services/admin/:id
 * (soft delete → status = "inactive")
 */
export async function deleteService(id) {
  const res = await api.delete(`/services/admin/${id}`);
  return res.data; // { message: "Servicio marcado como inactivo" }
}

/**
 * GET /api/services/admin/:id/enrollments
 * Devuelve { service, enrollments }
 */
export async function getServiceEnrollments(id) {
  const res = await api.get(`/services/admin/${id}/enrollments`);
  return res.data;
}
