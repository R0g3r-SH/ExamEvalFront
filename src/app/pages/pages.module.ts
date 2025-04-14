import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvalsViewerComponent } from './evals-viewer/evals-viewer.component';
import { EvalsUploaderComponent } from './evals-uploader/evals-uploader.component';
//import mat icon forms ,a nd button modules
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
//mat progress bar
import { MatProgressBarModule } from '@angular/material/progress-bar';
//mat Select Module
import {FormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    EvalsViewerComponent,
    EvalsUploaderComponent 
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,

    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressBarModule,
    FormsModule,
    MatSnackBarModule

  ]
})
export class PagesModule { }
