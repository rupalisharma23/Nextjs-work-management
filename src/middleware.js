import { NextResponse } from 'next/server'


export function middleware(request) {
  let cookie = request.cookies.get('token')?.value
  const isUserLoggedIn = request.nextUrl.pathname =='/login' || request.nextUrl.pathname =='/signup'

  if (request.nextUrl.pathname=='/api/login' || request.nextUrl.pathname=='/api/users') {
    return NextResponse.next();
  }

  if(isUserLoggedIn){
    if(cookie){
        return NextResponse.redirect(new URL('/addTask', request.url))
    }
  }
  else{
    if(!cookie){
        if (request.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.json('token requied',{status:400})
          }
        return NextResponse.redirect(new URL('/login', request.url))
    }
  }

}
 
export const config = {
    matcher: ['/api/:path*', '/addTask','/','/login','/signup','/showTask'],
  }