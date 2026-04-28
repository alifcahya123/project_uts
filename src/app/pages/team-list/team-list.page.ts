import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Import ini
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.page.html',
  styleUrls: ['./team-list.page.scss'],
  standalone: false // Sesuai permintaan menggunakan NgModule
})
export class TeamListPage implements OnInit {
  allTeams: any[] = [];
  filteredTeams: any[] = [];

  constructor(
    private ligaService: LigaService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.allTeams = this.ligaService.getAllTeams();
    this.filteredTeams = [...this.allTeams]; // Inisialisasi data tampilan
  }

  // Fungsi pencarian tim
  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredTeams = this.allTeams.filter(team => 
      team.nama.toLowerCase().includes(query) || 
      team.kota.toLowerCase().includes(query)
    );
  }
}