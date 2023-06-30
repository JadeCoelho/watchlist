import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalFormComponent } from './modal-form/modal-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', component: ModalFormComponent },
  { path: 'form/:id', component: ModalFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
