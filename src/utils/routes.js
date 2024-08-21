// * Don't delete
export const signRoutes = ['/login', '/registro'];

// ? Solo para probar de que tipo de ruta se trata esta casi todo en publico
// ! Ir asignando cada una a su respectivo rol y luego borrar este
const testRoutes = [
  '/edit_profile',
  '/mis_mensajes',
  '/calendario',
  '/carrito',
  '/comunidad',
  '/pacientes',
  '/comunidad/mensajes',
  '/dashboard',
  '/dashboard-blog',
  '/only_dev',
  '/mis_productos',
];

export const publicRoutes = [
  '/',
  '/about',
  '/blog',
  '/productos',
  '/not-found',
  '/_not-found',
  '/trabajo',
  '/servicios',
  '/password_olvidada',
  ...testRoutes,
];

// ! To fill
export const userRoutes = ['/mis_compras', '/pregunta_experto', '/carrito'];

export const professionalRoutes = [
  '/blog/crear',
  '/blog/mis-blogs',
  '/pregunta_experto',
];

// ! To fill
export const adminRoutes = [
  '/dashboard/admin/profile',
  '/dashboard/admin/change-password',
];

// ? Example
export const superAdminRoutes = [
  ...adminRoutes,
  '/dashboard/super-admin/admins',
  '/dashboard/super-admin/add-admin',
];
