import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex vh-100 bg-body-tertiary">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">
        <Header />

        <main className="flex-grow-1 p-3 p-md-4 main-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
