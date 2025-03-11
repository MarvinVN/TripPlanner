import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SUPABASE_URL, SUPABASE_KEY } from './vars';

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        SUPABASE_URL!,
        SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => 
                            cookieStore.set(name, value, options)
                        );
                    } catch {}
                }
            }
        }
    );    
}