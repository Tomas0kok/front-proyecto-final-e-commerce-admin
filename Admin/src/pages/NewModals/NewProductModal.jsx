// src/pages/NewProductModal.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { createProduct, getCategories } from "../../services/productsService";

const NewProductModal = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
    category_id: "",
    imageFile: null,
  });

  const [categories, setCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Error categorías:", err);
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  const handleClose = () => {
    navigate("/admin/products");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "stock") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else if (name === "category_id") {
      setForm((prev) => ({
        ...prev,
        [name]: value, // lo parseamos en el back
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0] || null;
    setForm((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      await createProduct(form);

      navigate("/admin/products");

      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (err) {
      console.error("No se pudo crear el producto.", err.response?.data || err);
      setError("No se pudo crear el producto. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={true} title="Nuevo producto" onClose={handleClose} size="md">
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="row g-3">
          <div className="col-6">
            <label className="form-label">Precio</label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              className="form-control"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label">Stock</label>
            <input
              type="number"
              min="0"
              name="stock"
              className="form-control"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Ejemplo simple de categoría */}
        <label className="form-label">Categoría</label>
        <div className="mb-2">
          <label className="form-label">Categoría</label>
          <div className="eco-dropdown">
            <button
              type="button"
              className="eco-dropdown-toggle"
              onClick={() => setCategoryOpen((prev) => !prev)}
            >
              <span>
                {categories.find((c) => c.id === form.category_id)?.name ||
                  "Seleccionar categoría..."}
              </span>
              <span className="eco-dropdown-caret">▾</span>
            </button>

            {categoryOpen && (
              <div className="eco-dropdown-menu">
                {categories.map((cat) => {
                  const active = form.category_id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={
                        "eco-dropdown-item" +
                        (active ? " eco-dropdown-item-active" : "")
                      }
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          category_id: cat.id,
                        }));
                        setCategoryOpen(false);
                      }}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label className="form-label">Imagen del producto</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleClose}
            disabled={saving}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Guardando..." : "Crear producto"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewProductModal;
