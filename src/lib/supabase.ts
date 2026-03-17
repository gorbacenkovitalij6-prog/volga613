import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ominpizuexndqtbuhdos.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taW5waXp1ZXhuZHF0YnVoZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzM3NTksImV4cCI6MjA4OTI0OTc1OX0.6B-5uwZmt5Wi353wKXtyFoZ52qc2AyVnIWd3IkOsHRk';

export const supabase = createClient(supabaseUrl, supabaseKey);
