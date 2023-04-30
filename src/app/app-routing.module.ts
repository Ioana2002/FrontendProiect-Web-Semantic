import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';

const routes: Routes = [
  {path:'',redirectTo:'general',pathMatch:'full'},
  {path:'general', component: GeneralComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
