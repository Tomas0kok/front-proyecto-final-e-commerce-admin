import { useState, useEffect, useMemo } from "react";
import { Plus, Users, Clock, DollarSign } from "lucide-react";
import { getAdminServices } from "../services/servicesService";

// Helper para manejar número o string
const formatPrice = (price) => {
  if (price == null) return "-";
  if (typeof price === "number") return `$${price}`;
  return String(price);
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
   *  Cargar servicios desde la API (vista admin)
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminServices(); // activos + draft
        if (isMounted) {
          setServices(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("No se pudieron cargar los servicios.");
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
   *  Filtro por tipo (Curso / Taller)
   * =======================*/
  const filteredServices = useMemo(() => {
    if (filterType === "all") return services;
    return services.filter((service) => service.type === filterType);
  }, [services, filterType]);

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Servicios</h1>
          <p className="text-muted mb-0">
            Administra cursos y talleres de reciclaje
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Nuevo Servicio
        </button>
      </div>

      {/* Filtros */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex flex-wrap align-items-center gap-3 justify-content-between">
          <span className="fw-semibold">Filtrar por tipo:</span>
          <div className="d-flex flex-wrap gap-2" role="group">
            <button
              type="button"
              className={`btn btn-filter ${
                filterType === "all" ? "btn-filter-active" : ""
              }`}
              onClick={() => setFilterType("all")}
            >
              Todos
            </button>
            <button
              type="button"
              className={`btn btn-filter ${
                filterType === "Curso" ? "btn-filter-active" : ""
              }`}
              onClick={() => setFilterType("Curso")}
            >
              Cursos
            </button>
            <button
              type="button"
              className={`btn btn-filter ${
                filterType === "Taller" ? "btn-filter-active" : ""
              }`}
              onClick={() => setFilterType("Taller")}
            >
              Talleres
            </button>
          </div>
        </div>
      </div>

      {/* Loading / error */}
      {loading && (
        <div className="text-center text-muted py-4">Cargando servicios...</div>
      )}

      {error && !loading && (
        <div className="text-center text-danger py-4">{error}</div>
      )}

      {/* Services List */}
      {!loading && !error && (
        <div className="row gy-4">
          {filteredServices.length === 0 ? (
            <div className="col-12">
              <p className="text-muted text-center mb-0">
                No hay servicios para el filtro seleccionado.
              </p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.id} className="col-12">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white border-0 pb-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-semibold mb-1">{service.title}</h5>
                        <div className="d-flex gap-2">
                          <span className="badge bg-secondary text-white">
                            {service.type}
                          </span>
                          <span
                            className={`badge rounded-pill ${
                              service.status === "active"
                                ? "badge-quantity-good"
                                : "badge-eco"
                            }`}
                          >
                            {service.status === "active"
                              ? "Activo"
                              : service.status === "draft"
                              ? "Borrador"
                              : "Inactivo"}
                          </span>
                        </div>
                      </div>
                      <button className="btn btn-ghost-eco btn-sm">
                        Editar
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row g-3">
                      {/* Duración */}
                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                          <Clock className="text-primary" size={22} />
                          <div>
                            <p className="text-muted small mb-1">Duración</p>
                            <p className="fw-semibold mb-0">
                              {service.duration || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Precio */}
                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                          <DollarSign className="text-success" size={22} />
                          <div>
                            <p className="text-muted small mb-1">Precio</p>
                            <p className="fw-semibold mb-0">
                              {formatPrice(service.price)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Estudiantes */}
                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                          <Users className="text-info" size={22} />
                          <div>
                            <p className="text-muted small mb-1">Estudiantes</p>
                            <p className="fw-semibold mb-0">
                              {service.students ?? 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
