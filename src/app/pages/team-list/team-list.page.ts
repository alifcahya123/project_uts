import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
  standalone: false,
})
export class TeamListPage implements OnInit {
  allTeams: any[] = [];
  filteredTeams: any[] = []; // Menampung hasil pencarian keyword

  // TAMBAHKAN VARIABEL BARU UNTUK STATE FILTER GOOGLE PLAY
  finalFilteredTeams: any[] = [];
  listFilter: string = 'all';
  currentSearchQuery: string = '';

  constructor(
    private ligaService: LigaService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.allTeams = this.ligaService.getAllTeams();
    this.filteredTeams = [...this.allTeams];
    this.applyListFilter(); // Jalankan penyaringan awal
  }

  // Gunakan lifecycle hook Ionic agar daftar tim favorit langsung sinkron ter-update saat user kembali dari halaman detail klub
  ionViewWillEnter() {
    this.applyListFilter();
  }

  // 1. Modifikasi Fungsi pencarian tim agar menyimpan kata kunci
  handleSearch(event: any) {
    this.currentSearchQuery = event.target.value
      ? event.target.value.toLowerCase()
      : '';

    // Lakukan pemfilteran teks berdasarkan allTeams
    this.filteredTeams = this.allTeams.filter(
      (team) =>
        (team.nama &&
          team.nama.toLowerCase().includes(this.currentSearchQuery)) ||
        (team.kota &&
          team.kota.toLowerCase().includes(this.currentSearchQuery)) ||
        (team.name &&
          team.name.toLowerCase().includes(this.currentSearchQuery)) || // Jaga-jaga jika ada properti .name
        (team.city &&
          team.city.toLowerCase().includes(this.currentSearchQuery)), // Jaga-jaga jika ada properti .city
    );

    // Gabungkan hasil pencarian teks dengan filter tab favorit
    this.applyListFilter();
  }

  // 2. LOGIKA UTAMA: Menggabungkan Pencarian Teks dan Filter Tombol Favorit
  applyListFilter() {
    // Jika user memilih tab "Semua Tim"
    if (this.listFilter === 'all') {
      this.finalFilteredTeams = [...this.filteredTeams];
    }
    // Jika user memilih tab "Favorit Saya"
    else if (this.listFilter === 'fav') {
      this.finalFilteredTeams = this.filteredTeams.filter((team) => {
        // Cek apakah ID tim ini berstatus 'true' di memori lokal ponsel
        const isFav = localStorage.getItem(`fav_${team.id}`);
        return isFav === 'true';
      });
    }
  }
}
