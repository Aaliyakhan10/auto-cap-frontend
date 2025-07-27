// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhwvkbjaollnvppmplfo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZod3ZrYmphb2xsbnZwcG1wbGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDcwNzgsImV4cCI6MjA2OTE4MzA3OH0.jzTfONIaYAPEaX5N_M0iZ3yDDy2Cyq_lkRXeczF1xho'; // Get this from your Supabase dashboard (Project > API > anon key)

export const supabase = createClient(supabaseUrl, supabaseKey);
