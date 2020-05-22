import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppHomeComponent} from './app-home/app-home.component';


const routes: Routes = [
{path: '',   redirectTo: 'login', pathMatch: 'full' },
{path: 'login', component: LoginComponent},
{path: 'app-home', component: AppHomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
