import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { SUPABASE_URL, SUPABASE_KEY } from './vars'

export const updateSession = async (request: NextRequest) => {
    
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        }
    })

    const supabase = createServerClient(
        SUPABASE_URL!,
        SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                }
            }
        }
    )

    // will refresh session if expired
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // redirect logged-in users away from login and register pages
    if (user) {
        const pathname = request.nextUrl.pathname;
        if (pathname === '/' || pathname === '/register') {
            return NextResponse.redirect(new URL('/trips', request.nextUrl));
        }
    }

    return response;
}