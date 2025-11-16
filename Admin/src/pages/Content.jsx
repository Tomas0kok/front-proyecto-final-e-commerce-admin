import { useState } from "react";
import { Plus, FileText, Video, Download, MoreVertical } from "lucide-react";
import { Dropdown, Nav, Tab } from "react-bootstrap";

// Datos simulados
const mockBlogPosts = [
  {
    id: 1,
    title: "10 Formas de Reducir tu Huella de Carbono",
    date: "2024-01-15",
    views: 1234,
    status: "published",
  },
  {
    id: 2,
    title: "Guía Completa de Compostaje en Casa",
    date: "2024-01-10",
    views: 892,
    status: "published",
  },
  {
    id: 3,
    title: "El Impacto del Plástico en los Océanos",
    date: "2024-01-05",
    views: 2156,
    status: "published",
  },
];

const mockGuides = [
  {
    id: 1,
    title: "Guía de Reciclaje para Principiantes",
    downloads: 567,
    format: "PDF",
  },
  {
    id: 2,
    title: "Manual de Compostaje Urbano",
    downloads: 423,
    format: "PDF",
  },
  {
    id: 3,
    title: "100 Tips para una Vida Sostenible",
    downloads: 891,
    format: "PDF",
  },
];

const mockVideos = [
  {
    id: 1,
    title: "Introducción al Reciclaje",
    duration: "12:34",
    views: 3456,
  },
  {
    id: 2,
    title: "Cómo Hacer Compost en Casa",
    duration: "18:22",
    views: 2789,
  },
  {
    id: 3,
    title: "Reducir, Reusar, Reciclar",
    duration: "15:45",
    views: 4123,
  },
];

const Content = () => {
  const [activeTab, setActiveTab] = useState("blog");

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Contenido Gratuito</h1>
          <p className="text-muted mb-0">
            Gestiona blog, guías y videos educativos
          </p>
        </div>
      </div>

      {/* Tabs principales */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-4 eco-tabs">
          <Nav.Item>
            <Nav.Link eventKey="blog">
              <FileText size={16} className="me-2" />
              Blog
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="guides">
              <Download size={16} className="me-2" />
              Guías
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="videos">
              <Video size={16} className="me-2" />
              Videos
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* BLOG TAB */}
          <Tab.Pane eventKey="blog">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary d-flex align-items-center">
                <Plus size={16} className="me-2" />
                Nueva Publicación
              </button>
            </div>

            {mockBlogPosts.map((post) => (
              <div
                key={post.id}
                className="card mb-3 border-0 shadow-sm hover-shadow-sm"
              >
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <h5 className="mb-0 me-3">{post.title}</h5>
                      <span
                        className={`badge ${
                          post.status === "published"
                            ? "bg-success-subtle text-success"
                            : "bg-secondary"
                        }`}
                      >
                        {post.status === "published" ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                    <div className="text-muted small">
                      {new Date(post.date).toLocaleDateString("es-ES")} •{" "}
                      {post.views} vistas
                    </div>
                  </div>

                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      className="border-0 p-1"
                      id={`dropdown-${post.id}`}
                    >
                      <MoreVertical size={18} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Editar</Dropdown.Item>
                      <Dropdown.Item>Ver</Dropdown.Item>
                      <Dropdown.Item className="text-danger">
                        Eliminar
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </Tab.Pane>

          {/* GUIDES TAB */}
          <Tab.Pane eventKey="guides">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary d-flex align-items-center">
                <Plus size={16} className="me-2" />
                Nueva Guía
              </button>
            </div>

            <div className="row g-3">
              {mockGuides.map((guide) => (
                <div className="col-md-4" key={guide.id}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center bg-light rounded mb-3 p-3">
                        <Download size={28} className="text-primary" />
                      </div>
                      <h6 className="fw-semibold">{guide.title}</h6>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span className="badge bg-outline-secondary border text-secondary">
                          {guide.format}
                        </span>
                        <span className="text-muted small">
                          {guide.downloads} descargas
                        </span>
                      </div>
                      <button className="btn btn-outline-secondary btn-sm w-100">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>

          {/* VIDEOS TAB */}
          <Tab.Pane eventKey="videos">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary d-flex align-items-center">
                <Plus size={16} className="me-2" />
                Nuevo Video
              </button>
            </div>

            <div className="row g-3">
              {mockVideos.map((video) => (
                <div className="col-md-4" key={video.id}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center">
                      <Video size={32} className="text-secondary" />
                    </div>
                    <div className="card-body">
                      <h6 className="fw-semibold mb-2">{video.title}</h6>
                      <div className="d-flex justify-content-between text-muted small mb-3">
                        <span>{video.duration}</span>
                        <span>{video.views} vistas</span>
                      </div>
                      <button className="btn btn-outline-secondary btn-sm w-100">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Content;
