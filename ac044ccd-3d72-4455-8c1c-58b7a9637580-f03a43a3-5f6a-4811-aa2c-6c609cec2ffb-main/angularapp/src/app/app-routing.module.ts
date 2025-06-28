import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
 
const routes: Routes = [
  { path:'', redirectTo:'login',pathMatch:'full'},
  { path:'home', component:HomePageComponent},
  { path: 'error', component: ErrorComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent},
  { path: 'admin/view/requests', component: AdminviewappliedrequestComponent},
 
  {
    path: 'adminnav', component: AdminnavComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
 
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
 
  {
    path: 'admin-add-schemes', component: AdminWifiSchemeComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
 
  {
    path: 'admin-view-schemes', component: AdminViewSchemeComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
 
  {
    path: 'user-view-Schemes', component: UserViewSchemeComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'admin-view-requests', component: AdminviewappliedrequestComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin-view-feedbacks', component: AdminviewfeedbackComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path:'useraddrequest/:wifiSchemeId',component:UseraddrequestComponent,
    canActivate:[AuthGuard],
    data:{role: 'USER'}
  },
  {
    path:'user-view-appliedrequest',component:UserviewappliedrequestComponent,
    canActivate:[AuthGuard],
    data:{role: 'USER'}
  },
  {
    path:'usernav',component:UsernavComponent,
    canActivate:[AuthGuard],
    data:{role: 'USER'}
  },
  {
    path:'useraddfeedback/:wifiSchemeId',component:UseraddfeedbackComponent,
    canActivate:[AuthGuard],
    data:{role: 'USER'}
  },
  {
    path:'user-view-feedback',component:UserviewfeedbackComponent,
    canActivate:[AuthGuard],
    data:{role: 'USER'}
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
