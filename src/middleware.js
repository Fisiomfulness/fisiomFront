import { NextResponse } from 'next/server';
import { serverSideVerify } from './services/auth';
import { isDynamicIdPath } from './utils/helpers';
import roles from './utils/roles';
import {
  signRoutes,
  adminRoutes,
  professionalRoutes,
  publicRoutes,
  userRoutes,
  superAdminRoutes,
} from './utils/routes';

const roleRoutes = {
  [roles.USER]: userRoutes,
  [roles.PROFESSIONAL]: professionalRoutes,
  [roles.ADMIN]: adminRoutes,
  [roles.SUPER_ADMIN]: superAdminRoutes,
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const token = request.cookies?.get('accessToken')?.value;

  // ? If is a public route (or blog public detail), don't do the protected logic
  if (publicRoutes.includes(pathname) || isDynamicIdPath(pathname, '/blog')) {
    return NextResponse.next();
  }

  try {
    const user = await serverSideVerify(token);

    // ? Valid token... redirects to homepage in /login /registro
    if (signRoutes.includes(pathname)) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    url.pathname = '/not-found';

    // * If the role has access to the route, let him continue
    if (roleRoutes[user.role].includes(pathname)) {
      return NextResponse.next();
    }

    // ? Don't has access to this route, redirect to not-found
    return NextResponse.redirect(url);
  } catch (error) {
    if (signRoutes.includes(pathname)) return NextResponse.next(); // * Avoid redirect loop
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

// * Exclude all static files
export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|.*\\..*|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
};
