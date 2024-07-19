import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import { SiMicrodotblog } from 'react-icons/si';

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Nombre', uid: 'name', sortable: true },
  { name: 'Edad', uid: 'birthDate', sortable: true },
  { name: 'Rol', uid: 'role', sortable: true },
  { name: 'Celular', uid: 'phone' },
  { name: 'Confirmación', uid: 'status', sortable: true },
  { name: 'Opciones', uid: 'actions' },
];

export const productColumns = [
  { name: 'Nombre', uid: 'name', sortable: true },
  { name: 'Precio', uid: 'price', sortable: true },
  { name: 'Stock', uid: 'stock', sortable: true },
  { name: 'Categoría', uid: 'category', sortable: true },
  { name: 'Opciones', uid: 'actions' },
];

export const professionalColumns = [
  { name: 'Nombre', uid: 'name', sortable: true },
  { name: 'Edad', uid: 'birthDate', sortable: true },
  { name: 'Confirmado', uid: 'confirmEmail', sortable: true },
  { name: 'Teléfono', uid: 'phone', sortable: true },
  { name: 'Matrícula', uid: 'license' },
  { name: 'Género', uid: 'gender', sortable: true },
  { name: 'Opciones', uid: 'actions' },
];
export const dashboardDropdown = [
  {
    name: 'Administrar usuarios',
    icon: React.createElement(FaUsers),
    tab: 0,
  },
  {
    name: 'Administrar productos',
    icon: React.createElement(FaShoppingCart),
    tab: 1,
  },
  {
    name: 'Administrar servicios',
    icon: React.createElement(MdMedicalServices),
    tab: 2,
  },
  {
    name: 'Administrar profesionales',
    icon: React.createElement(FaUserDoctor),
    tab: 3,
  },
  {
    name: 'Administrar blogs',
    icon: React.createElement(SiMicrodotblog),
    tab: 4,
  },

];

const statusOptions = [
  { name: 'Administrador', uid: 'admin' },
  { name: 'Usuario', uid: 'user' },
  { name: 'Profesional', uid: 'profesional' },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { columns, statusOptions };
