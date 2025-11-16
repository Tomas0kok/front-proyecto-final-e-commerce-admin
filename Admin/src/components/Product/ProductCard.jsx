import { MoreVertical, Edit, Trash } from "lucide-react";

const ProductCard = ({ product, getStockBadgeClass }) => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100 border-0 shadow-sm">
        <div className="d-flex align-items-center justify-content-center bg-light display-3 py-4">
          {product.image}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title fw-semibold mb-1">{product.name}</h5>
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
              className={`badge rounded-pill ${getStockBadgeClass(product)}`}
            >
              {product.status === "active"
                ? `Stock: ${product.stock}`
                : "Sin stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
