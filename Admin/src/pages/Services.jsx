import { useState } from "react";
import { Plus, Users, Clock, DollarSign } from "lucide-react";

const mockServices = [
  {
    id: 1,
    title: "Curso de Compostaje Básico",
    type: "Curso",
    duration: "4 semanas",
    price: "$50",
    students: 234,
    status: "active",
  },
  {
    id: 2,
    title: "Taller de Reciclaje Creativo",
    type: "Taller",
    duration: "1 día",
    price: "$30",
    students: 89,
    status: "active",
  },
  {
    id: 3,
    title: "Curso Avanzado de Sostenibilidad",
    type: "Curso",
    duration: "8 semanas",
    price: "$120",
    students: 156,
    status: "active",
  },
  {
    id: 4,
    title: "Taller de Huertos Urbanos",
    type: "Taller",
    duration: "2 días",
    price: "$45",
    students: 67,
    status: "draft",
  },
];

const Services = () => {
  const [filterType, setFilterType] = useState("all");

  const filteredServices = mockServices.filter((service) => {
    if (filterType === "all") return true;
    return service.type === filterType;
  });

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

      {/* Services List */}
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
                          {service.status === "active" ? "Activo" : "Borrador"}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-ghost-eco btn-sm">Editar</button>
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
                          <p className="fw-semibold mb-0">{service.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                        <DollarSign className="text-success" size={22} />
                        <div>
                          <p className="text-muted small mb-1">Precio</p>
                          <p className="fw-semibold mb-0">{service.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* Estudiantes */}
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                        <Users className="text-info" size={22} />
                        <div>
                          <p className="text-muted small mb-1">Estudiantes</p>
                          <p className="fw-semibold mb-0">{service.students}</p>
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
    </div>
  );
};

export default Services;
