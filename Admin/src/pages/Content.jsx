import { useState, useEffect } from "react";
import { Plus, FileText, Video, Download, MoreVertical } from "lucide-react";
import { Dropdown, Nav, Tab } from "react-bootstrap";

import { getBlogPosts, getGuides, getVideos } from "../services/contentService";

const Content = () => {
  const [activeTab, setActiveTab] = useState("blog");

  const [blogPosts, setBlogPosts] = useState([]);
  const [guides, setGuides] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingGuides, setLoadingGuides] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [errorBlog, setErrorBlog] = useState(null);
  const [errorGuides, setErrorGuides] = useState(null);
  const [errorVideos, setErrorVideos] = useState(null);

  /* =========================
   *  Cargar BLOG
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchBlog() {
      try {
        setLoadingBlog(true);
        setErrorBlog(null);
        const data = await getBlogPosts();
        if (isMounted) {
          setBlogPosts(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setErrorBlog("No se pudieron cargar las publicaciones del blog.");
        }
      } finally {
        if (isMounted) {
          setLoadingBlog(false);
        }
      }
    }

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
   *  Cargar GUIDES
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchGuides() {
      try {
        setLoadingGuides(true);
        setErrorGuides(null);
        const data = await getGuides();
        if (isMounted) {
          setGuides(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setErrorGuides("No se pudieron cargar las guías.");
        }
      } finally {
        if (isMounted) {
          setLoadingGuides(false);
        }
      }
    }

    fetchGuides();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
   *  Cargar VIDEOS
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchVideos() {
      try {
        setLoadingVideos(true);
        setErrorVideos(null);
        const data = await getVideos();
        if (isMounted) {
          setVideos(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setErrorVideos("No se pudieron cargar los videos.");
        }
      } finally {
        if (isMounted) {
          setLoadingVideos(false);
        }
      }
    }

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

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
                <span className="d-none d-sm-inline">Nueva Publicación</span>
              </button>
            </div>

            {errorBlog && (
              <div className="alert alert-danger" role="alert">
                {errorBlog}
              </div>
            )}

            {loadingBlog && blogPosts.length === 0 ? (
              <p className="text-muted">Cargando publicaciones...</p>
            ) : blogPosts.length === 0 ? (
              <p className="text-muted">
                No hay publicaciones de blog disponibles.
              </p>
            ) : (
              blogPosts.map((post) => (
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
                          {post.status === "published"
                            ? "Publicado"
                            : "Borrador"}
                        </span>
                      </div>
                      <div className="text-muted small">
                        {post.date
                          ? new Date(post.date).toLocaleDateString("es-ES")
                          : "-"}{" "}
                        • {post.views} vistas
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
              ))
            )}
          </Tab.Pane>

          {/* GUIDES TAB */}
          <Tab.Pane eventKey="guides">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary d-flex align-items-center">
                <Plus size={16} className="me-2" />
                <span className="d-none d-sm-inline">Nueva Guía</span>
              </button>
            </div>

            {errorGuides && (
              <div className="alert alert-danger" role="alert">
                {errorGuides}
              </div>
            )}

            <div className="row g-3">
              {loadingGuides && guides.length === 0 ? (
                <div className="col-12">
                  <p className="text-muted mb-0">Cargando guías...</p>
                </div>
              ) : guides.length === 0 ? (
                <div className="col-12">
                  <p className="text-muted mb-0">No hay guías disponibles.</p>
                </div>
              ) : (
                guides.map((guide) => (
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
                ))
              )}
            </div>
          </Tab.Pane>

          {/* VIDEOS TAB */}
          <Tab.Pane eventKey="videos">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary d-flex align-items-center">
                <Plus size={16} className="me-2" />
                <span className="d-none d-sm-inline">Nuevo Video</span>
              </button>
            </div>

            {errorVideos && (
              <div className="alert alert-danger" role="alert">
                {errorVideos}
              </div>
            )}

            <div className="row g-3">
              {loadingVideos && videos.length === 0 ? (
                <div className="col-12">
                  <p className="text-muted mb-0">Cargando videos...</p>
                </div>
              ) : videos.length === 0 ? (
                <div className="col-12">
                  <p className="text-muted mb-0">No hay videos disponibles.</p>
                </div>
              ) : (
                videos.map((video) => (
                  <div className="col-md-4" key={video.id}>
                    <div className="card border-0 shadow-sm h-100">
                      <div className="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center">
                        <Video size={32} className="text-secondary" />
                      </div>
                      <div className="card-body">
                        <h6 className="fw-semibold mb-2">{video.title}</h6>
                        <div className="d-flex justify-content-between text-muted small mb-3">
                          <span>{video.duration || "-"}</span>
                          <span>{video.views} vistas</span>
                        </div>
                        <button className="btn btn-outline-secondary btn-sm w-100">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Content;
