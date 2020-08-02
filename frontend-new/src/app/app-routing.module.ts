import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ModePageComponent} from './mode-page/mode-page.component';
import {PerformancePageComponent} from './performance-page/performance-page.component';
import {AuthGuard} from './guards/auth.guard';
import {LearnComponent} from './modes/learn/learn.component';
import {StudyComponent} from './modes/study/study.component';
import {TranslateComponent} from './modes/study/translate/translate.component';
import {SummaryComponent} from './modes/study/summary/summary.component';
import {QuestionsComponent} from './modes/study/questions/questions.component';
import {VideoComponent} from './modes/learn/video/video.component';
import {AllVideosComponent} from "./modes/all-videos/all-videos.component";


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'mode',
    component: ModePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'performance',
    component: PerformancePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'study',
    component: StudyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'learn',
    component: LearnComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allvideos',
    component: AllVideosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'translate',
    component: TranslateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'summarize',
    component: SummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
