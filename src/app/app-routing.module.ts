import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes as pagesRoutes } from './pages/pages.routing';
const routes: Routes = [
  {
    path: '',
    children: pagesRoutes,
  },

  // Redirect to the first page
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
