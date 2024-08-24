
const siswa = [
  { no: 1, nama: "Luciana Muzzayamah", posisi: "Korwil", asalSekolah: "SMKN 1 Kedawung", asalDaerah: "Kab.Cirebon", status: "Hadir" },
  { no: 2, nama: "Danda Cantika", posisi: "Korda Kota Cirebom", asalSekolah: "SMK Kartika XI", asalDaerah: "Kota Cirebon", status: "Hadir" },
  { no: 3, nama: "Nazilatu Mahmudah", posisi: "korda Kab.Cirebon", asalSekolah: "MAN 2 Cirebon", asalDaerah: "Kab.Cirebon", status: "Hadir" },
  { no: 4, nama: "Ario Zulkaesi Nubli", posisi: "Wakorda Kab.Kuningan", asalSekolah: "SMKN Pertiwi Kuningan", asalDaerah: "Kab.Kuningan", status: "Hadir" },
  { no: 5, nama: "Nadya Gkhalbya", posisi: "Wakorda Kab.Cirebon", asalSekolah: "MAN 3 Cirebon", asalDaerah: "Kab.Cirebon", status: "Hadir" },
  { no: 6, nama: "Ralf Jibril Anthonijsz", posisi: "Media Center(Pusat)", asalSekolah: "SMK INFORMATIKA AL IRSYAD AL ISLAMIYYAH", asalDaerah: "Kab.Cirebon", status: "Hadir" },
  { no: 7, nama: "Aulia Laila Sya'ban ", posisi: "Kaman Media Center", asalSekolah: "MAN 1 Kota Cirebon", asalDaerah: "Kota Cirebon", status: "Hadir" },
  { no: 8, nama: "Rifda Fajriah", posisi: "Kaman Sosial Center", asalSekolah: "MAN 2 Kota Cirebon", asalDaerah: "Kota Cirebon", status: "Hadir" },
  { no: 9, nama: "Elga Frasiska", posisi: "Program Learning Center", asalSekolah: "SMK Pertiwi Kuningan", asalDaerah: "Kab.Kuningan", status: "Hadir" },
  { no: 10, nama: "Kayla Meisya Aulia", posisi: "Program Sosial Center", asalSekolah: "SMAN 3 Kota Cirebon", asalDaerah: "Kota Cirebon", status: "Hadir" },
  { no: 11, nama: "Nadia Rafahiyatul Aisy", posisi: "Program Sosial Center", asalSekolah: "SMKN 1 Cilimus Kuningan", asalDaerah: "Kab.Kuningan", status: "Hadir" },
  { no: 12, nama: "Azzusa Celia Putri", posisi: "Program Sosial Center", asalSekolah: "SMA ISLAM AL AZHAR 5 Cirebon", asalDaerah: "Kota Cirebon", status: "Hadir" },
  { no: 13, nama: "Naysella Adzahra", posisi: "Desaign Media Center", asalSekolah: "MAN 1 Kota Cirebon", asalDaerah: "Kota Cirebon", status: "Hadir" },
  

];

function isiTabelAbsensi() {
  const absensiTable = document.getElementById('absensiTable');
  absensiTable.innerHTML = ''; 

  siswa.forEach((siswa, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${siswa.no}</td>
      <td>${siswa.nama}</td>
      <td>${siswa.posisi}</td>
      <td>${siswa.asalSekolah}</td>
      <td>${siswa.asalDaerah}</td>
      <td><button class="btn ${siswa.status === 'Hadir' ? 'btn-present' : 'btn-absent'}" onclick="toggleStatus(${index})">${siswa.status}</button></td>
    `;
    absensiTable.appendChild(row);
  });
}


function toggleStatus(index) {
  siswa[index].status = siswa[index].status === 'Hadir' ? 'Tidak Hadir' : 'Hadir';
  isiTabelAbsensi();
}

function saveAbsensi() {
  showPage('riwayat');
}


function saveRiwayat(event) {
  event.preventDefault(); 

  const tanggal = document.getElementById('tanggal').value;
  const absensiList = siswa.map(s => `${s.nama}: ${s.status}`).join(', ');

  const riwayatItem = {
    tanggal: tanggal,
    absensi: absensiList
  };

  
  let riwayat = JSON.parse(localStorage.getItem('riwayatAbsensi')) || [];
  
  
  riwayat.push(riwayatItem);

  
  localStorage.setItem('riwayatAbsensi', JSON.stringify(riwayat));

  
  displayRiwayat(riwayat);

  
  document.getElementById('riwayatForm').reset();

  
  alert('Riwayat absensi berhasil disimpan!');
}


function displayRiwayat(riwayat) {
  const riwayatList = document.getElementById('riwayatList');
  riwayatList.innerHTML = ''; 

  riwayat.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<strong>Tanggal: ${item.tanggal}</strong><br>${item.absensi}`;
    riwayatList.appendChild(li);
  });
}


function loadRiwayatFromLocalStorage() {
  const riwayat = JSON.parse(localStorage.getItem('riwayatAbsensi')) || [];
  displayRiwayat(riwayat);
}


function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let riwayatContent = document.getElementById('riwayatList').innerText;

 
  doc.text(riwayatContent, 10, 10);

  
  doc.save('riwayat_absensi.pdf');
}


function exportToDevice() {
  const riwayat = JSON.parse(localStorage.getItem('riwayatAbsensi')) || [];
  
 
  let textData = "Riwayat Absensi:\n";
  riwayat.forEach(item => {
    textData += `Tanggal: ${item.tanggal}\nAbsensi: ${item.absensi}\n\n`;
  });

  
  const blob = new Blob([textData], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'riwayat_absensi.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  
  pages.forEach(page => {
    page.style.display = 'none'; 
  });

  document.getElementById(pageId + 'Page').style.display = 'block'; 
}


window.onload = function() {
  showPage('home'); 
  isiTabelAbsensi();
  loadRiwayatFromLocalStorage();
};

function clearRiwayat() {
  if (confirm("Apakah Anda yakin ingin menghapus semua riwayat?")) {
    
    localStorage.removeItem('riwayat');
    
    
    document.getElementById('riwayatList').innerHTML = '';
    
    alert("Riwayat berhasil dihapus.");
  }
}
