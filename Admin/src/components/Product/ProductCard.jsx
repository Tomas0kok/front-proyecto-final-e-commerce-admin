import { MoreVertical, Edit, Trash } from "lucide-react";

const ProductCard = ({ product, category, getStockBadgeClass }) => {
  const stockBadgeClass = getStockBadgeClass(product);
  const displayCategory = category || "";

  // Imagen: primero backend (image_url), luego mock (image), luego placeholder
  const fallbackImage =
    "https://via.placeholder.com/300x200.png?text=Producto+eco";
  const imageSrc = product.image_url || product.image || fallbackImage;

  // Precio: soporta número o string
  const priceText =
    typeof product.price === "number"
      ? `$${product.price.toFixed(2)}`
      : product.price || "$0.00";

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100 border-0 shadow-sm">
        {/* Imagen */}
        <div className="ratio ratio-4x3 bg-light">
          <img
            src={imageSrc}
            alt={product.name}
            className="img-fluid object-fit-cover rounded-top"
          />
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title fw-semibold mb-1">{product.name}</h5>

              {/* 👇 Acá usamos SIEMPRE el string, nunca el objeto */}
              {displayCategory && (
                <p className="text-muted small mb-2">{displayCategory}</p>
              )}
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
            <p className="fw-bold text-primary mb-0">{priceText}</p>

            <span className={`badge rounded-pill ${stockBadgeClass}`}>
              {product.status === "active"
                ? `Stock: ${product.stock ?? 0}`
                : "Sin stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
