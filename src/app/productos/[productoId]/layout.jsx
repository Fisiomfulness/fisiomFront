import { Suspense } from "react";

const Layout = ({ children }) => {
  return <Suspense fallback={<div>cargando..</div>}>{children}</Suspense>;
};

export default Layout;
