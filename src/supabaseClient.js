// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =`${import.meta.env.VITE_SUPABASE_URL}`;
const supabaseKey = `${import.meta.env.VITE_SUPABASE_API_KEY}`; // Get this from your Supabase dashboard (Project > API > anon key)

export const supabase = createClient(supabaseUrl, supabaseKey);
