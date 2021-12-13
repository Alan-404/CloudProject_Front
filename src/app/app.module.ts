import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLandingComponent } from './Components/Auth/auth-landing/auth-landing.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Components/Home/home/home.component';
import { HeaderComponent } from './Components/Home/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { MainPageComponent } from './Components/Home/main-page/main-page.component';
import { MyInfoComponent } from './Components/Home/my-info/my-info.component';
import { CoursesComponent } from './Components/Home/courses/courses.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CourseComponent } from './Components/Home/course/course.component';
import { ContentCourseComponent } from './Components/Home/content-course/content-course.component';
import { AddStudentComponent } from './Components/Home/add-student/add-student.component';
import { AdminComponent } from './Components/Home/admin/admin.component';
import { AccessDeniedComponent } from './Components/Error/access-denied/access-denied.component';
import { NotFoundComponent } from './Components/Error/not-found/not-found.component';
import { DashboardComponent } from './Components/Home/dashboard/dashboard.component';
import { ListStudentsComponent } from './Components/Home/list-students/list-students.component';
import { AddCourseComponent } from './Components/Home/add-course/add-course.component';
import { ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './Components/Home/scheduler/scheduler.component';
import { AddTeacherComponent } from './Components/Home/add-teacher/add-teacher.component';
import { AddSubjectComponent } from './Components/Home/add-subject/add-subject.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ListTeachersComponent } from './Components/Home/list-teachers/list-teachers.component';
import { ListSubjectsComponent } from './Components/Home/list-subjects/list-subjects.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './Components/Effect/spinner/spinner.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EditProfileComponent } from './Components/Home/edit-profile/edit-profile.component';
import { EditStudentComponent } from './Components/Home/edit-student/edit-student.component';
import { EditTeacherComponent } from './Components/Home/edit-teacher/edit-teacher.component';
import { ListGroupsComponent } from './Components/Home/list-groups/list-groups.component';
import { ListUsersComponent } from './Components/Home/list-users/list-users.component';
import { EditSubjectComponent } from './Components/Home/edit-subject/edit-subject.component';
import { ShowScoreComponent } from './Components/Home/show-score/show-score.component';
import { ScoreStudentComponent } from './Components/Home/score-student/score-student.component';
import { AddExamComponent } from './Components/Home/add-exam/add-exam.component';
import { ShowExamsComponent } from './Components/Home/show-exams/show-exams.component';
import { ExamsComponent } from './Components/Home/exams/exams.component';

const firebaseConfig = {
  apiKey: "AIzaSyAYN3obXuGsdyGJhbjcJSYD2RZ0sG2Xs_M",
  authDomain: "cloudproject-dc48c.firebaseapp.com",
  projectId: "cloudproject-dc48c",
  storageBucket: "cloudproject-dc48c.appspot.com",
  messagingSenderId: "540464327898",
  appId: "1:540464327898:web:684df7b3d0ba75fb3749e3",
  measurementId: "G-GSZZ51N0ZQ"
};

const appRoutes: Routes = [
  {path: 'auth', component: AuthLandingComponent,
   children: [{path: 'login', component: LoginComponent}, {path: 'register', component: RegisterComponent}]
  },
  {path: '', redirectTo: 'home/dashboard', pathMatch:'full'},
  {path: 'home', component: HomeComponent,children:[
    {path: 'myInfo',component: MyInfoComponent},
    {path: 'myCourses', component: CoursesComponent},
    {path: 'course', component: CourseComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path:'scheduler', component:SchedulerComponent},
    {path:'edit_profile', component:EditProfileComponent},
    {path:'score', component:ScoreStudentComponent},
    {path:'exam', component:ExamsComponent},
    {path: 'admin', component: AdminComponent, children: [
      {path: 'mainPage', component: MainPageComponent},
      {path: 'insertStudent', component: AddStudentComponent},
      {path: 'list-students', component: ListStudentsComponent},
      {path: 'add-course', component: AddCourseComponent},
      {path: 'add-teacher', component: AddTeacherComponent},
      {path: 'add-subject', component: AddSubjectComponent},
      {path: 'list-teachers', component: ListTeachersComponent},
      {path: 'list-subjects', component: ListSubjectsComponent},
      {path: 'list-users', component: ListUsersComponent},
      {path: 'list-groups', component: ListGroupsComponent},
      {path: 'edit-student', component: EditStudentComponent},
      {path: 'edit-teacher', component: EditTeacherComponent},
      {path: 'edit-subject', component: EditSubjectComponent},
      {path: 'show-score', component: ShowScoreComponent},
      {path: 'add-exam', component: AddExamComponent},
      {path: 'show-exams', component: ShowExamsComponent}
    ]}
  ]},
  
  {path:'access-denied', component: AccessDeniedComponent},
  {path: 'not-found', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthLandingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    MainPageComponent,
    MyInfoComponent,
    CoursesComponent,
    CourseComponent,
    ContentCourseComponent,
    AddStudentComponent,
    AdminComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    DashboardComponent,
    ListStudentsComponent,
    AddCourseComponent,
    SchedulerComponent,
    AddTeacherComponent,
    AddSubjectComponent,
    ListTeachersComponent,
    ListSubjectsComponent,
    SpinnerComponent,
    EditProfileComponent,
    EditStudentComponent,
    EditTeacherComponent,
    ListGroupsComponent,
    ListUsersComponent,
    EditSubjectComponent,
    ShowScoreComponent,
    ScoreStudentComponent,
    AddExamComponent,
    ShowExamsComponent,
    ExamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    ScheduleModule,
    CKEditorModule,
    FlatpickrModule.forRoot(),
    NgbModalModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forRoot(appRoutes), BrowserAnimationsModule, MatIconModule, MatButtonModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
