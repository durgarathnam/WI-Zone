import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { AuthService } from './services/auth.service';
import { FeedbackService } from './services/feedback.service';
import { WifiSchemeRequestService } from './services/wifi-scheme-request.service';
import { WifiSchemeService } from './services/wifi-scheme.service';
import { UserInterceptor } from './helpers/user.interceptor'





@NgModule({
  declarations: [
    AppComponent,
    AdminviewappliedrequestComponent,
    AdminviewfeedbackComponent,
    AdminViewSchemeComponent,
    AdminWifiSchemeComponent,
    UsernavComponent,
    UseraddfeedbackComponent,
    UseraddrequestComponent,
    UserviewfeedbackComponent,
    DashboardComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ErrorComponent,
    UserViewSchemeComponent,
    AdminviewappliedrequestComponent,
    UserviewappliedrequestComponent,
    AdminnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService,FeedbackService,WifiSchemeRequestService,WifiSchemeService,
  {provide:HTTP_INTERCEPTORS,useClass: UserInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
