import api from "./api";

/**
 * Listar productos (usa /products públicos).
 * Si más adelante querés pasar filtros por query (?category, ?status),
 * podés agregar un objeto params y pasarlo al get.
 */
export const getProducts = async () => {
  const res = await api.get("/store/products"); // 👈 antes era "/products"
  return res.data;
};

/**
 * Detalle de un producto (público)
 */
export async function getProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

/**
 * Crear producto (ADMIN)
 * Endpoint: POST /admin/products
 */
export async function createProduct(payload) {
  const res = await api.post("/admin/products", payload);
  return res.data;
}

/**
 * Actualizar producto (ADMIN)
 * Endpoint: PUT /admin/products/:id
 */
export async function updateProduct(id, payload) {
  const res = await api.put(`/admin/products/${id}`, payload);
  return res.data;
}

/**
 * Eliminar producto (ADMIN)
 * Endpoint: DELETE /admin/products/:id
 */
export async function deleteProduct(id) {
  await api.delete(`/admin/products/${id}`);
}
