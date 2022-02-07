import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CourseService } from './courses/course.service';
import { CourseModule } from './courses/course.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CourseModule,
    CoreModule,
    RouterModule.forRoot([
      //Para quando a aplicação estiver em uma rota vazia
      {
        path: '', redirectTo: '/courses', pathMatch: 'full'
      }

    ]),
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
