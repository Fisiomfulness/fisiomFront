"use client";

import React from "react";
import UsersView from "./UsersView/UsersView";
import ProductsView from "./ProductsView/ProductsView";
import ProfessionalsView from "./ProfessionalsView/ProfessionalsView";
import DropdownDashboard from "./DropdownDashboard/DropdownDashboard";
import RatingView from "./RatingView/RatingView";
import BlogView from "./BlogView/BlogView";

export default function Dashboard() {
  //! ---------- HOOKS ----------
  const [tab, setTab] = React.useState(0);
  //TODO Hacer el switch de las tablas CON useContext
  const switchTables = () => {
    switch (tab) {
      case 0:
        return <UsersView />;
      case 1:
        return <ProductsView />;
      case 2:
        return <div>Administrar servicios</div>;
      case 3:
        return <BlogView />;
      case 4:
        return <RatingView />;
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center mt-16 mb-5 ">
      <DropdownDashboard setTab={setTab} tab={tab} />
      {switchTables(tab)}
    </section>
  );
}
