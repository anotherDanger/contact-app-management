export const addContact = () => {
    const addContactButton = document.getElementById('addContactButton');
    const contactFormModal = document.getElementById('contactFormModal');
    const closeModalButton = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const contactsList = document.getElementById('contactsList');

    // Event listener untuk membuka form
    addContactButton.addEventListener('click', () => {
        contactFormModal.classList.remove('hidden');
    });

    // Event listener untuk menutup form
    closeModalButton.addEventListener('click', () => {
        contactFormModal.classList.add('hidden');
    });

    // Event listener untuk mengirim form (tambah kontak)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const description = document.getElementById('description').value;

        const data = { title, name, phone, email, address, description };
        const token = localStorage.getItem('auth');

        const sendData = async () => {
            const request = new Request('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            try {
                const response = await fetch(request);

                const responseData = await response.json();

                if (response.ok && responseData && responseData.contact) {
                    const newContact = responseData.contact;

                    const contactCard = document.createElement('div');
                    contactCard.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'w-80', 'm-4');
                    contactCard.innerHTML = `
                        <h3 class="text-3xl font-semibold text-[#493D9E]">${newContact.title}</h3>
                        <p class="text-lg font-semibold text-[#493D9E]">${newContact.name}</p>
                        <p class="text-sm text-gray-600">${newContact.phone}</p>
                        <p class="text-sm text-gray-600">${newContact.email}</p>
                        <p class="text-sm text-gray-600">${newContact.address}</p>
                        <p class="text-sm text-gray-600">${newContact.description}</p>
                    `;

                    contactsList.appendChild(contactCard);

                    contactFormModal.classList.add('hidden');

                    contactForm.reset();
                } else {
                    console.error('Gagal menambahkan kontak atau respons tidak valid', responseData);
                }
            } catch (error) {
                console.error('Terjadi kesalahan saat mengirim data:', error);
            }
        };

        sendData();
    });

    // Fungsi untuk mengambil daftar kontak
    const getContacts = async () => {
        const token = localStorage.getItem('auth');

        const request = new Request('http://localhost:3000/contact', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        try {
            const response = await fetch(request);

            const responseData = await response.json();

            if (response.ok && responseData && responseData.contacts) {
                const contacts = responseData.contacts;

                // Kosongkan list kontak yang lama
                contactsList.innerHTML = '';

                // Tampilkan setiap kontak
                contacts.forEach(contact => {
                    const contactCard = document.createElement('div');
                    contactCard.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'w-80', 'm-4');
                    contactCard.innerHTML = `
                        <h3 class="text-3xl font-semibold text-[#493D9E]">${contact.title}</h3>
                        <p class="text-lg font-semibold text-[#493D9E]">${contact.name}</p>
                        <p class="text-sm text-gray-600">${contact.phone}</p>
                        <p class="text-sm text-gray-600">${contact.email}</p>
                        <p class="text-sm text-gray-600">${contact.address}</p>
                        <p class="text-sm text-gray-600">${contact.description}</p>
                    `;

                    contactsList.appendChild(contactCard);
                });
            } else {
                console.error('Gagal mengambil kontak atau respons tidak valid', responseData);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data kontak:', error);
        }
    };

    // Panggil fungsi getContacts saat halaman dimuat
    window.addEventListener('DOMContentLoaded', getContacts);
};
