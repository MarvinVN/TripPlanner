import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_URL, SUPABASE_KEY } from './vars';

export function createClient() {

    console.log(process.env.SUPABASE_URL)

    return createBrowserClient(
        SUPABASE_URL!,
        SUPABASE_KEY!
    );
}