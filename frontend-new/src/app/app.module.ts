import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModePageComponent } from './mode-page/mode-page.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { PerformancePageComponent } from './performance-page/performance-page.component';
import { ChartModule } from 'primeng/chart';
import { NavbarComponent } from './navbar/navbar.component';
import { StudyComponent } from './modes/study/study.component';
import { LearnComponent } from './modes/learn/learn.component';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateComponent } from './modes/study/translate/translate.component';
import { SummaryComponent } from './modes/study/summary/summary.component';
import { QuestionsComponent } from './modes/study/questions/questions.component';
import { DropdownModule } from 'primeng/dropdown';
import { VideoComponent } from './modes/learn/video/video.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LightboxModule } from 'primeng/lightbox';
import { AllVideosComponent } from './modes/all-videos/all-videos.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginNewComponent } from './login-new/login-new.component';
import { RegisterNewComponent } from './register-new/register-new.component';
import { ModeNewComponent } from './mode-new/mode-new.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ModePageComponent,
    PerformancePageComponent,
    NavbarComponent,
    StudyComponent,
    LearnComponent,
    TranslateComponent,
    SummaryComponent,
    QuestionsComponent,
    VideoComponent,
    AllVideosComponent,
    LoginNewComponent,
    RegisterNewComponent,
    ModeNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    MenuModule,
    ChartModule,
    CardModule,
    FileUploadModule,
    DropdownModule,
    ProgressSpinnerModule,
    LightboxModule,
    MatInputModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
