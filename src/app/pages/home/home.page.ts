import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Tambahkan ini
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // Definisikan variabel yang error tadi di sini
  featuredTeams: any[] = [
    { name: 'Persija Jakarta', city: 'Jakarta', logo: 'assets/logos/persija.png' },
    { name: 'Persib Bandung', city: 'Bandung', logo: 'assets/logos/persib.png' },
    { name: 'Bali United', city: 'Gianyar', logo: 'assets/logos/bali.png' },
    { name: 'Persebaya', city: 'Surabaya', logo: 'assets/logos/persebaya.png' }
  ];
  // Di dalam class HomePage
statistikLiga = [
  { label: 'Total Gol Tercipta', nilai: '2,840+', icon: 'football', color: 'primary' },
  { label: 'Rata-rata Penonton', nilai: '12.5k', icon: 'people', color: 'success' },
  { label: 'Clean Sheets Terbanyak', nilai: 'Borneo FC', icon: 'shield-checkmark', color: 'secondary' },
  { label: 'Top Skor (5 Musim)', nilai: 'David da Silva', icon: 'flame', color: 'danger' }
];
  

  constructor(
    private ligaService: LigaService,
    private navCtrl: NavController // Inject NavController
  ) { }

ngOnInit() {
    const allTeams = this.ligaService.getAllTeams();
    
    // Filter Tim Unggulan (seperti sebelumnya)
    const topIds = ['persib', 'persija', 'psm', 'bali-united', 'borneo-fc', 'madura-united'];
    this.featuredTeams = allTeams.filter(t => topIds.includes(t.id));

  }

goToTeamList() {
  console.log('Fungsi dipanggil');
  // Gunakan Router standar Angular sebagai alternatif navCtrl
  this.navCtrl.navigateForward('/team-list').catch(err => {
    console.log('Error navigasi, fallback ke window location');
    window.location.href = '/team-list';
  });
  }
}