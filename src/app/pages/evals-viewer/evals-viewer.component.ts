import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EvalsService } from 'src/app/services/evals.service';
@Component({
  selector: 'app-evals-viewer',
  templateUrl: './evals-viewer.component.html',
  styleUrls: ['./evals-viewer.component.scss'],
})
export class EvalsViewerComponent {

  evals: any[] = [];

  constructor(private router: Router, private evalsService: EvalsService) {}

  goToUploader() {
    this.router.navigate(['/uploader']);
  }

  ngOnInit() {
    this.getEvals();
  }

  getEvals() {
    this.evalsService.getEvals().subscribe(
      (data: any) => {
        this.evals = data;
        console.log('Evals fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching evals:', error);
      }
    );
  }


}
