import { createClient } from '@supabase/supabase-js';

// 🚨 Substitua pelos dados reais do seu projeto Supabase
const supabaseUrl = 'https://vhwfgronjhvsjaugzryv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2Zncm9uamh2c2phdWd6cnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNzE5MjksImV4cCI6MjA2Nzg0NzkyOX0.aiZpQmnPfxuvW2HCIMJ9AfGumYabK7TpgYo1D6ct754';

export const supabase = createClient(supabaseUrl, supabaseKey);