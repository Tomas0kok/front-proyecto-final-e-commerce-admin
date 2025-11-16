import { Plus, Search, MoreVertical, Edit, Trash } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Bolsa Reutilizable Eco",
    category: "Accesorios",
    price: "$20.00",
    stock: 150,
    status: "active",
    image: "🛍️",
  },
  {
    id: 2,
    name: "Kit de Compostaje",
    category: "Jardinería",
    price: "$40.00",
    stock: 75,
    status: "active",
    image: "🌱",
  },
  {
    id: 3,
    name: "Botellas de Vidrio Set",
    category: "Cocina",
    price: "$25.00",
    stock: 200,
    status: "active",
    image: "🍾",
  },
  {
    id: 4,
    name: "Papel Reciclado Pack",
    category: "Oficina",
    price: "$15.00",
    stock: 0,
    status: "out_of_stock",
    image: "📄",
  },
];

const Products = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Productos</h1>
          <p className="text-muted mb-0">
            Gestiona tu catálogo de productos ecológicos
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-8 position-relative">
              <Search
                size={18}
                className="position-absolute top-50 translate-middle-y ms-3 text-muted"
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="form-control ps-5"
              />
            </div>
            <div className="col-md-4 text-md-end">
              <button className="btn btn-outline-secondary">Filtros</button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {mockProducts.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="d-flex align-items-center justify-content-center bg-light display-3 py-4">
                {product.image}
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      {product.name}
                    </h5>
                    <p className="text-muted small mb-2">{product.category}</p>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm border-0"
                      data-bs-toggle="dropdown"
                    >
                      <MoreVertical size={18} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button className="dropdown-item">
                          <Edit size={14} className="me-2" />
                          Editar
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger">
                          <Trash size={14} className="me-2" />
                          Eliminar
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="fw-bold text-primary mb-0">{product.price}</p>
                  <span
                    className={`badge ${
                      product.status === "active" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {product.status === "active"
                      ? `Stock: ${product.stock}`
                      : "Sin stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
