import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Pastikan ini ada!
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
  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService,
  ) { }

ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.team = this.ligaService.getTeamById(teamId);
    }
  }
}
