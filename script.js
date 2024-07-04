document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    if (loginButton) {
        loginButton.addEventListener("click", function() {
            window.location.href = "login.html";
        });
    }

    if (registerButton) {
        registerButton.addEventListener("click", function() {
            window.location.href = "register.html";
        });
    }


    // Panggil fungsi initMap untuk memuat peta
    if (document.getElementById('map')) {
        initMap();
    }

    // Fungsi untuk menampilkan data pasien
    function displayPasienData(containerId) {
        const pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];
        const dataPasienList = document.getElementById(containerId);

        if (pasienData.length === 0) {
            dataPasienList.innerHTML = '<p>Tidak ada data pasien.</p>';
        } else {
            let listHTML = '<ul>';
            pasienData.forEach(pasien => {
                listHTML += `
                    <li>
                        <p><strong>Nama:</strong> ${pasien.nama}</p>
                        <p><strong>Tanggal Lahir:</strong> ${pasien.ttl}</p>
                        <p><strong>Jenis Kelamin:</strong> ${pasien.jk}</p>
                        <p><strong>No KTP:</strong> ${pasien.ktp}</p>
                        <p><strong>Kontak:</strong> ${pasien.kontak}</p>
                        <p><strong>Pembayaran:</strong> ${pasien.pembayaran}</p>
                        ${pasien.pembayaran === 'bpjs' ? `<p><strong>No BPJS:</strong> ${pasien.noBpjs}</p>` : ''}
                        <p><strong>Pelayanan:</strong> ${pasien.pelayanan}</p>
                        <p><strong>Tanggal Berobat:</strong> ${pasien.tanggal}</p>
                        <p><strong>Waktu Berobat:</strong> ${pasien.jam}</p>
                    </li>
                `;
            });
            listHTML += '</ul>';
            dataPasienList.innerHTML = listHTML;
        }
    }

    // Fungsi untuk menampilkan daftar pasien di halaman Data Pasien
    if (document.getElementById('dataPasienList')) {
        displayPasienData('dataPasienList');
    }

    // Fungsi untuk menampilkan bukti pendaftaran di halaman Jadwal Temu
    function generateReceipt(data, index) {
        const receipt = `
            <div class="receipt">
                <img src="images/Logo Klinik.png" alt="Mays LifeCare" class="logo">
                <h2>KLINIK MAYS LIFECARE</h2>
                <h3>Bukti Pendaftaran Online</h3>
                <h3>No Antrian Klinik</h3>
                <h1>${index + 1}</h1>
                <p>Nama: ${data.nama}</p>
                <p>Jenis Kelamin: ${data.jk}</p>
                <p>Pembayaran: ${data.pembayaran}</p>
                <p>Pelayanan: ${data.pelayanan}</p>
                <p>Tanggal Berobat: ${data.tanggal}</p>
                <p>Waktu Berobat: ${data.jam}</p>
            </div>
        `;
        return receipt;
    }

    // Retrieve stored patient data
    const pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];

    // Get the container where receipts will be displayed
    const receiptsContainer = document.getElementById('receipts');

    if (receiptsContainer) {
        // Generate and display receipts
        pasienData.forEach((data, index) => {
            receiptsContainer.innerHTML += generateReceipt(data, index);
        });
    }

    // Menangani pendaftaran pasien baru
    const pendaftaranForm = document.getElementById('pendaftaranForm');
    if (pendaftaranForm) {
        const pembayaranSelect = document.getElementById('pembayaran');
        const bpjsField = document.getElementById('bpjsField');
        const noBpjsInput = document.getElementById('noBpjs');

        pembayaranSelect.addEventListener('change', function() {
            if (pembayaranSelect.value === 'bpjs') {
                bpjsField.style.display = 'block';
                noBpjsInput.setAttribute('required', 'required');
            } else {
                bpjsField.style.display = 'none';
                noBpjsInput.removeAttribute('required');
            }
        });

        pendaftaranForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nama = document.getElementById('nama').value;
            const ttl = document.getElementById('ttl').value;
            const jk = document.getElementById('jk').value;
            const ktp = document.getElementById('ktp').value;
            const kontak = document.getElementById('kontak').value;
            const pembayaran = document.getElementById('pembayaran').value;
            const noBpjs = pembayaran === 'bpjs' ? document.getElementById('noBpjs').value : '';
            const pelayanan = document.getElementById('pelayanan').value;
            const tanggal = document.getElementById('tanggal').value;
            const jam = document.getElementById('jam').value;

            const pasien = {
                nama: nama,
                ttl: ttl,
                jk: jk,
                ktp: ktp,
                kontak: kontak,
                pembayaran: pembayaran,
                noBpjs: noBpjs,
                pelayanan: pelayanan,
                tanggal: tanggal,
                jam: jam
            };

            const pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];
            pasienData.push(pasien);
            localStorage.setItem('pasienData', JSON.stringify(pasienData));

            alert('Pendaftaran berhasil!');
            window.location.href = 'data_pasien.html';
        });
    }
});
