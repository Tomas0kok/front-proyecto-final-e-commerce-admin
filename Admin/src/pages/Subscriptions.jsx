import { Plus, Check } from "lucide-react";

const mockPlans = [
  {
    id: 1,
    name: "Plan Básico",
    price: "$9.99",
    period: "mes",
    subscribers: 450,
    features: [
      "Acceso a contenido básico",
      "1 curso gratis al mes",
      "Descuento 10% en productos",
      "Newsletter semanal",
    ],
    color: "text-info",
  },
  {
    id: 2,
    name: "Plan Premium",
    price: "$19.99",
    period: "mes",
    subscribers: 234,
    features: [
      "Todo lo del Plan Básico",
      "3 cursos gratis al mes",
      "Descuento 20% en productos",
      "Acceso a talleres exclusivos",
      "Consultoría personalizada",
    ],
    color: "text-primary",
  },
  {
    id: 3,
    name: "Plan Empresarial",
    price: "$49.99",
    period: "mes",
    subscribers: 89,
    features: [
      "Todo lo del Plan Premium",
      "Cursos ilimitados",
      "Descuento 30% en productos",
      "Soporte prioritario",
      "Talleres in-company",
      "Certificaciones oficiales",
    ],
    color: "text-warning",
  },
];

const Subscriptions = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Suscripciones</h1>
          <p className="text-muted mb-0">
            Gestiona los planes de suscripción disponibles
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Nuevo Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="row g-4 mb-5">
        {mockPlans.map((plan) => (
          <div key={plan.id} className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center transition-transform">
              <div className="card-header bg-white border-0 pb-0">
                <h4 className="fw-bold mb-2">{plan.name}</h4>
                <div>
                  <span className={`fs-2 fw-bold ${plan.color}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted">/{plan.period}</span>
                </div>
                <span className="badge bg-secondary mt-2">
                  {plan.subscribers} suscriptores
                </span>
              </div>

              <div className="card-body">
                <ul className="list-unstyled text-start mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="d-flex align-items-start mb-2">
                      <Check
                        size={18}
                        className="text-success flex-shrink-0 me-2 mt-1"
                      />
                      <span className="text-dark small">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-ghost-eco btn-sm">
                  Editar Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subscribers Overview */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0">
          <h5 className="fw-semibold mb-0">Resumen de Suscriptores</h5>
        </div>
        <div className="card-body">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Total Suscriptores</p>
                <h4 className="fw-bold mb-0">773</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Ingresos Mensuales</p>
                <h4 className="fw-bold text-success mb-0">$12,458</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Nuevos este mes</p>
                <h4 className="fw-bold text-primary mb-0">+89</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Tasa de Retención</p>
                <h4 className="fw-bold text-info mb-0">94%</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
