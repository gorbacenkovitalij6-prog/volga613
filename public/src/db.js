import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://snshiiktbtqhoixxunpi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuc2hpaWt0YnRxaG9peHh1bnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwOTQwNTUsImV4cCI6MjA4NzY3MDA1NX0.NRLgGfAwncm3Ajre_PKBLNeHJKntCxf6VoFhcXGzgEI';

export const supabase = createClient(supabaseUrl, supabaseKey);
