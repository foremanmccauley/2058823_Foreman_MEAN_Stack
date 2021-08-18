import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: "signup", component: SignupComponent},
  { path: "login", component: LoginComponent},
  { path: "portfolio", component: PortfolioComponent},
  {path: "portfolio/:username",component: PortfolioComponent},

  { path:"", redirectTo:"signup", pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
