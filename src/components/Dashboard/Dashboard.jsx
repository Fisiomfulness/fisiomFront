'use client';

import React from 'react';
import UsersView from './UsersView/UsersView';
import ProductsView from './ProductsView/ProductsView';
import ProfessionalsView from './ProfessionalsView/ProfessionalsView';
import DropdownDashboard from './DropdownDashboard/DropdownDashboard';

export default function Dashboard() {
  //! ---------- HOOKS ----------
  const [tab, setTab] = React.useState(3);
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
        return <ProfessionalsView />;
      case 4:
        return <div>Administrar blogs</div>;
    }
  };
  return (
    <section className="relative w-full flex flex-col items-center justify-center mt-16 mb-5 ">
      <DropdownDashboard />
      {switchTables(tab)}
    </section>
  );
}
