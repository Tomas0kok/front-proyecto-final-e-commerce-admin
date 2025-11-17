import { useEffect, useState, useMemo } from "react";
import { Plus, Check } from "lucide-react";
import { getActivePlans } from "../services/subscriptionsService";

const formatPrice = (price) => {
  if (price == null) return "-";
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  return String(price);
};

// Mock para métricas avanzadas del resumen (de momento)
const mockMonthlyRevenue = "$12,458";
const mockNewThisMonth = "+89";
const mockRetention = "94%";

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
   *  Cargar planes desde la API
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getActivePlans(); // /api/subscriptions/plans
        if (isMounted) {
          setPlans(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("No se pudieron cargar los planes de suscripción.");
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
   *  Total de suscriptores (real)
   * =======================*/
  const totalSubscribers = useMemo(
    () => plans.reduce((acc, plan) => acc + (plan.subscribers || 0), 0),
    [plans]
  );

  // Paleta de colores simple basada en posición, como el mock original
  const getPlanColorClass = (index) => {
    if (index === 0) return "text-info";
    if (index === 1) return "text-primary";
    if (index === 2) return "text-warning";
    return "text-primary";
  };

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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Plans Grid */}
      <div className="row g-4 mb-5">
        {loading && plans.length === 0 ? (
          <div className="col-12">
            <p className="text-muted text-center mb-0">
              Cargando planes de suscripción...
            </p>
          </div>
        ) : plans.length === 0 ? (
          <div className="col-12">
            <p className="text-muted text-center mb-0">
              No hay planes activos configurados.
            </p>
          </div>
        ) : (
          plans.map((plan, idx) => (
            <div key={plan.id} className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center transition-transform">
                <div className="card-header bg-white border-0 pb-0">
                  <h4 className="fw-bold mb-2">{plan.name}</h4>
                  <div>
                    <span className={`fs-2 fw-bold ${getPlanColorClass(idx)}`}>
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-muted">/{plan.period}</span>
                  </div>
                  <span className="badge bg-secondary mt-2">
                    {plan.subscribers} suscriptores
                  </span>
                </div>

                <div className="card-body">
                  <ul className="list-unstyled text-start mb-4">
                    {plan.features.map((feature, featureIdx) => (
                      <li
                        key={featureIdx}
                        className="d-flex align-items-start mb-2"
                      >
                        <Check
                          size={18}
                          className="text-success flex-shrink-0 me-2 mt-1"
                        />
                        <span className="text-dark small">
                          {feature || "Característica del plan"}
                        </span>
                      </li>
                    ))}
                    {plan.features.length === 0 && (
                      <li className="text-muted small">
                        Este plan aún no tiene características cargadas.
                      </li>
                    )}
                  </ul>
                  <button className="btn btn-ghost-eco btn-sm">
                    Editar Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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
                <h4 className="fw-bold mb-0">{totalSubscribers}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Ingresos Mensuales</p>
                <h4 className="fw-bold text-success mb-0">
                  {mockMonthlyRevenue}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Nuevos este mes</p>
                <h4 className="fw-bold text-primary mb-0">
                  {mockNewThisMonth}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded">
                <p className="text-muted small mb-1">Tasa de Retención</p>
                <h4 className="fw-bold text-info mb-0">{mockRetention}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
