import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { MealComponent } from './meal/meal.component';
import { PaidSignupComponent } from './paid-signup/paid-signup.component';


const routes: Routes = [

    {
      path : 'login',
      component : LoginComponent
    },
    {
      path : 'signup',
      component : SignupComponent

    },
    {
      path : 'home',
      component : HomeComponent

    },
    {
      path : 'index',
      component : IndexComponent

    },
    {
      path : 'meal',
      component : MealComponent

    },
    {
      path : 'signupPaid',
      component : PaidSignupComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }