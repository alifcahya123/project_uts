import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; // Tambahkan ElementRef & ViewChild
import { ActivatedRoute } from '@angular/router';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
  standalone: false,
})
export class TeamDetailPage implements OnInit {
  team: any;
  activeTab: string = 'info';

  // Tambahkan ViewChild untuk menangkap elemen judul di HTML
  @ViewChild('pageTitle', { read: ElementRef }) pageTitle!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService,
  ) {}

  ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.team = this.ligaService.getTeamById(teamId);
    }
  }

  // Gunakan lifecycle hook Ionic untuk memindahkan fokus
  ionViewDidEnter() {
    if (this.pageTitle) {
      // Fokuskan ke judul halaman agar browser melepas fokus dari halaman Home
      this.pageTitle.nativeElement.focus();
    }
  }
}
