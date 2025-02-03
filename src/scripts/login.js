export const login = () => {
    document.getElementById('btnRegister').addEventListener('click', async () => {
        const username = document.getElementById('usernameField').value;
        const password = document.getElementById('passwordField').value;

        const data = { username, password };

        const request = new Request('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        try {
            const response = await fetch(request);
            if (response.ok) {
                const result = await response.json();
                const token = result.token;
                console.log(token);
                if (token) {
                    console.log('Token dari server:', token);
                    localStorage.setItem('auth', token);
                    console.log('Token setelah disimpan di localStorage:', localStorage.getItem('auth'));
                    
                    setTimeout(() => {
                        redirectToProtectedPage();
                    }, 100);
                } else {
                    console.log('Token tidak ditemukan dalam respons');
                }
            } else {
                if (response.status === 400) {
                    document.getElementById('message').innerText = 'Username sudah terdaftar!';
                }
                console.log('Pendaftaran gagal');
            }
        } catch (err) {
            console.log('Terjadi kesalahan:', err);
        }
    });
};

const redirectToProtectedPage = async () => {
    const token = localStorage.getItem('auth');
    console.log('Token di localStorage sebelum akses halaman terproteksi:', token);

    if (!token) {
        console.log('Token tidak ditemukan, tidak bisa mengakses halaman terproteksi');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/protected', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            console.log('Akses berhasil ke halaman terproteksi');
            window.location.href = 'home.html';  // Redirect ke halaman terproteksi
        } else {
            console.log('Tidak dapat mengakses data terproteksi');
        }
    } catch (err) {
        console.log('Terjadi kesalahan saat mengambil data terproteksi:', err);
    }
};
