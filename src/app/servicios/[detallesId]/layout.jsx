import ServicioAsideBar from "@/components/Servicios/ServicioAsideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-around p-2">
      <div>
        <ServicioAsideBar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
