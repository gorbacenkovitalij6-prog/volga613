const url = 'https://ominpizuexndqtbuhdos.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taW5waXp1ZXhuZHF0YnVoZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzM3NTksImV4cCI6MjA4OTI0OTc1OX0.6B-5uwZmt5Wi353wKXtyFoZ52qc2AyVnIWd3IkOsHRk';

async function createBucket() {
    try {
        const res = await fetch(`${url}/storage/v1/bucket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: key,
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                id: 'reviews_photos',
                name: 'reviews_photos',
                public: true
            })
        });
        const data = await res.json();
        console.log("Create Bucket Response:", res.status, data);
    } catch(e) {
        console.error("Error creating bucket:", e);
    }
}

createBucket();
