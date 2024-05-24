import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SubmissionFormsComponent } from './submission-forms/submission-forms.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { employeeDetailsReducer } from './store/reducer/details.reducer';
import { LoginEffects } from './store/effects/login.effect';

import { storageSyncMetaReducer } from 'ngrx-store-persist';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    SubmissionFormsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularToastifyModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        userDetails: employeeDetailsReducer,
      },
      { metaReducers: [storageSyncMetaReducer] }
    ),
    EffectsModule.forRoot([LoginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
