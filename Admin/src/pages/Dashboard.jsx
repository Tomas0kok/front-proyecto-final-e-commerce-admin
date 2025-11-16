import Layout from "../../components/admin/Layout";
import StatCard from "../../components/admin/StatCard";
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  GraduationCap,
} from "lucide-react";

const Dashboard = () => {
  const topProducts = [
    { name: "Bolsa Reutilizable Eco", sales: 234, revenue: "$4,680" },
    { name: "Kit de Compostaje", sales: 189, revenue: "$7,560" },
    { name: "Botellas de Vidrio Set", sales: 156, revenue: "$3,120" },
    { name: "Papel Reciclado Pack", sales: 143, revenue: "$2,145" },
  ];

  const recentActivity = [
    { action: "Nueva orden #1234", time: "Hace 5 min" },
    { action: "Nuevo suscriptor Premium", time: "Hace 15 min" },
    { action: "Producto agregado: Macetas Eco", time: "Hace 1 hora" },
    { action: "Curso completado: Compostaje 101", time: "Hace 2 horas" },
  ];

  return (
    <Layout>
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="fw-bold display-6 mb-1">Dashboard</h1>
          <p className="text-muted">
            Resumen general de tu plataforma de reciclaje
          </p>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <StatCard
              title="Ventas Totales"
              value="$24,500"
              change="+12.5% vs mes anterior"
              changeType="positive"
              icon={DollarSign}
              iconColor="text-success"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatCard
              title="Productos Activos"
              value="156"
              change="+8 nuevos"
              changeType="positive"
              icon={Package}
              iconColor="text-primary"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatCard
              title="Suscriptores"
              value="2,340"
              change="+23% este mes"
              changeType="positive"
              icon={Users}
              iconColor="text-info"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatCard
              title="Cursos Activos"
              value="12"
              change="3 en desarrollo"
              changeType="neutral"
              icon={GraduationCap}
              iconColor="text-warning"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatCard
              title="Órdenes Pendientes"
              value="45"
              change="-5 vs ayer"
              changeType="negative"
              icon={ShoppingBag}
              iconColor="text-danger"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <StatCard
              title="Tasa de Conversión"
              value="3.2%"
              change="+0.8%"
              changeType="positive"
              icon={TrendingUp}
              iconColor="text-success"
            />
          </div>
        </div>

        {/* Recent Sections */}
        <div className="row g-4">
          {/* Productos Más Vendidos */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0 fw-semibold">Productos Más Vendidos</h5>
              </div>
              <div className="card-body">
                {topProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-3"
                  >
                    <div>
                      <p className="fw-medium mb-0">{product.name}</p>
                      <small className="text-muted">
                        {product.sales} ventas
                      </small>
                    </div>
                    <span className="fw-semibold text-primary">
                      {product.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0 fw-semibold">Actividad Reciente</h5>
              </div>
              <div className="card-body">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 mb-3"
                  >
                    <div className="mt-2">
                      <div
                        className="rounded-circle bg-primary"
                        style={{ width: "8px", height: "8px" }}
                      />
                    </div>
                    <div>
                      <p className="fw-medium mb-0">{activity.action}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
