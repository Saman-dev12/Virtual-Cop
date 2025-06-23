import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const address = request.cookies.get('address')?.value;

  if (request.nextUrl.pathname === '/' && address) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if(!address && request.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
