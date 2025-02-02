export const register = () => {
    document.getElementById('btnRegister').addEventListener('click', async () => {
    const username = document.getElementById('usernameField').value;
    const password = document.getElementById('passwordField').value;

    const data = { username, password };

    
        console.log(password);
        const request = new Request('http://localhost:3000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        try {
            const response = await fetch(request);

            if (response.ok) {
                const result = await response.json();
                const token = result.token;
                if (token) {
                    localStorage.setItem('auth', token);
                    redirectToProtectedPage();
                } else {
                    console.log('Token tidak ditemukan dalam respons');
                }
            } else {
                if(response.status === 400)
                {
                   document.getElementById('message').innerText = 'Username already taken!';
                }
                console.log('Pendaftaran gagal');
            }
        } catch (err) {
            console.log('Terjadi kesalahan:', err);
        }
    });
};

const redirectToProtectedPage = async () => {
    try {
        const token = localStorage.getItem('auth');
        if (!token) {
            console.log('Token tidak ditemukan, tidak bisa mengakses halaman terproteksi');
            return;
        }

        const response = await fetch('http://localhost:3000/protected', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            window.location.href = response.url;
        } else {
            console.log('Tidak dapat mengakses data terproteksi');
        }
    } catch (err) {
        console.log('Terjadi kesalahan saat mengambil data terproteksi:', err);
    }
};
