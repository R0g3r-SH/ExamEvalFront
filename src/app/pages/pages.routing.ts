import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvalsUploaderComponent } from './evals-uploader/evals-uploader.component';
import { EvalsViewerComponent } from './evals-viewer/evals-viewer.component';

export const routes: Routes = [
  {
    path: 'uploader',
    component: EvalsUploaderComponent,
    data: {
      title: 'Evals Uploader',
      breadcrumb: 'Evals Uploader',
    },
  },

  {
    path: 'viewer',
    component: EvalsViewerComponent,
    data: {
      title: 'Evals Viewer',
      breadcrumb: 'Evals Viewer',
    },
  },

  {
    path: '',
    redirectTo: 'viewer',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'viewer',
  },
];
