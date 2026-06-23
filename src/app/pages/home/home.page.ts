import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  featuredTeams: any[] = [];

  // TAMBAHKAN VARIABEL BARU UNTUK FILTER GOOGLE PLAY
  displayedFeaturedTeams: any[] = [];
  homeFilter: string = 'all';

  statistikLiga = [
    {
      label: 'Total Gol Tercipta',
      nilai: '2,840+',
      icon: 'football',
      color: 'primary',
    },
    {
      label: 'Rata-rata Penonton',
      nilai: '12.5k',
      icon: 'people',
      color: 'success',
    },
    {
      label: 'Clean Sheets Terbanyak',
      nilai: 'Borneo FC',
      icon: 'shield-checkmark',
      color: 'secondary',
    },
    {
      label: 'Top Skor (5 Musim)',
      nilai: 'David da Silva',
      icon: 'flame',
      color: 'danger',
    },
  ];

  constructor(
    private ligaService: LigaService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadTeamsData();
  }

  // Gunakan lifecycle hook Ionic agar daftar favorit langsung ter-update otomatis saat user kembali dari halaman detail
  ionViewWillEnter() {
    this.filterHomeTeams();
  }

  loadTeamsData() {
    const allTeams = this.ligaService.getAllTeams();
    const topIds = [
      'persib',
      'persija',
      'psm',
      'bali-united',
      'borneo-fc',
      'madura-united',
    ];
    this.featuredTeams = allTeams.filter((t) => topIds.includes(t.id));

    // Set data awal yang ditampilkan
    this.displayedFeaturedTeams = [...this.featuredTeams];
  }

  // LOGIKA UTAMA FITUR FILTER INTERAKTIF
  filterHomeTeams() {
    // Jika data tim belum termuat, muat dulu
    if (this.featuredTeams.length === 0) {
      this.loadTeamsData();
    }

    if (this.homeFilter === 'all') {
      // Tampilkan semua klub unggulan seperti biasa
      this.displayedFeaturedTeams = [...this.featuredTeams];
    } else if (this.homeFilter === 'fav') {
      // Saring hanya klub yang ID-nya ditandai true di localStorage
      this.displayedFeaturedTeams = this.featuredTeams.filter((team) => {
        const isFav = localStorage.getItem(`fav_${team.id}`);
        return isFav === 'true';
      });
    }
  }

  goToTeamList() {
    console.log('Fungsi dipanggil');
    this.navCtrl.navigateForward('/team-list').catch((err) => {
      console.log('Error navigasi, fallback ke window location');
      window.location.href = '/team-list';
    });
  }
}
