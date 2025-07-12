// script/modal.js

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('certificateModal');
  const openModalLink = document.getElementById('viewCertificateLink');
  const closeButton = document.querySelector('.close-button');

  // Pastikan elemen ditemukan sebelum menambahkan event listener
  if (openModalLink && modal && closeButton) {
    // Fungsi untuk membuka modal
    openModalLink.onclick = function (event) {
      event.preventDefault(); // Mencegah link melakukan aksi default (misal: navigasi ke URL)
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Mencegah scroll pada body saat modal terbuka
    };

    // Fungsi untuk menutup modal saat tombol close diklik
    closeButton.onclick = function () {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Mengembalikan scroll body
    };

    // Fungsi untuk menutup modal saat user klik di luar area modal
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
  } else {
    console.warn("Salah satu elemen modal tidak ditemukan. Pastikan 'certificateModal', 'viewCertificateLink', dan '.close-button' ada di HTML.");
  }
});
