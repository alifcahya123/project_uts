import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LigaService } from 'src/app/services/liga.service';

// Definisikan struktur data komentar agar rapi
interface Komentar {
  nama: string;
  teks: string;
  waktu: string;
}

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
  standalone: false,
})
export class TeamDetailPage implements OnInit {
  team: any;
  activeTab: string = 'info';

  // State untuk Fitur Baru (Mengatasi Syarat Google Play Console)
  isFavorit: boolean = false;
  inputNama: string = '';
  inputKomentar: string = '';
  daftarKomentar: Komentar[] = [];

  @ViewChild('pageTitle', { read: ElementRef }) pageTitle!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService,
  ) {}

  ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.team = this.ligaService.getTeamById(teamId);

      // Ambil data komentar & status favorit khusus untuk tim ini
      this.loadKomentarDanFavorit(teamId);
    }
  }

  ionViewDidEnter() {
    if (this.pageTitle) {
      this.pageTitle.nativeElement.focus();
    }
  }

  // ==================== FITUR BARU INTERAKTIF ====================

  // 1. Memuat status favorit & komentar lama dari penyimpanan lokal ponsel
  loadKomentarDanFavorit(teamId: string) {
    // Cek status favorit
    const favStatus = localStorage.getItem(`fav_${teamId}`);
    this.isFavorit = favStatus === 'true';

    // Cek komentar lama, jika belum ada beri komentar default agar tidak kosong
    const kmtLokal = localStorage.getItem(`komentar_${teamId}`);
    if (kmtLokal) {
      this.daftarKomentar = JSON.parse(kmtLokal);
    } else {
      this.daftarKomentar = [
        {
          nama: 'Supporter Layar Kaca',
          teks: `Semangat bertanding untuk ${this.team?.nama}! 🔥`,
          waktu: '1 jam lalu',
        },
      ];
    }
  }

  // 2. Fungsi Tombol Hati (Favorit)
  toggleFavorit() {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.isFavorit = !this.isFavorit;
      localStorage.setItem(`fav_${teamId}`, String(this.isFavorit));
    }
  }

  // 3. Fungsi Kirim Komentar Fans secara Real-Time
  kirimKomentar() {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (!teamId) return;

    if (this.inputNama.trim() === '' || this.inputKomentar.trim() === '') {
      alert('Nama dan komentar tidak boleh kosong!');
      return;
    }

    const komentarBaru: Komentar = {
      nama: this.inputNama,
      teks: this.inputKomentar,
      waktu: 'Baru saja',
    };

    // Tambahkan ke urutan paling atas list komentar
    this.daftarKomentar.unshift(komentarBaru);

    // Simpan permanen ke localstorage agar tidak hilang saat aplikasi ditutup
    localStorage.setItem(
      `komentar_${teamId}`,
      JSON.stringify(this.daftarKomentar),
    );

    // Reset Form Input
    this.inputNama = '';
    this.inputKomentar = '';
  }
}
