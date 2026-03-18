const url = 'https://ominpizuexndqtbuhdos.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taW5waXp1ZXhuZHF0YnVoZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzM3NTksImV4cCI6MjA4OTI0OTc1OX0.6B-5uwZmt5Wi353wKXtyFoZ52qc2AyVnIWd3IkOsHRk';

async function listBuckets() {
    try {
        const res = await fetch(`${url}/storage/v1/bucket`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` }
        });
        const data = await res.json();
        console.log("Buckets response:", res.status);
        console.log(JSON.stringify(data, null, 2));
    } catch(e) {
        console.error(e);
    }
}

listBuckets();
