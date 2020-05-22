import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { Observable } from 'rxjs';

describe('LoginComponent', () => {
    let loginAppComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;

    let authenticationService: AuthenticationService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                FormBuilder,
                AuthenticationService
                //{provide: Router, useValue: mockRouter}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        loginAppComponent = fixture.componentInstance;
        // tslint:disable-next-line: deprecation
        router = TestBed.get(Router);
        authenticationService = fixture.debugElement.injector.get(AuthenticationService);
        fixture.detectChanges();
    });



    it('should create the app', () => {
        expect(loginAppComponent).toBeTruthy();
    });

    it('should initialize form with empty values when login page is rendered', () => {
        expect(loginAppComponent.loginForm.value).toEqual({ username: '', password: '' });
    });

    it('should set isSubmitted property to false on component init', () => {
        expect(loginAppComponent.submitted).toBe(false);
    });
    it('should set validCredentials property to true on component init', () => {
        expect(loginAppComponent.validCredentials).toBe(true);
    });

    it('should validate form if username and password are present when form is submitted', () => {
        loginAppComponent.loginForm.setValue({ username: 'admin', password: 'abcd' });
        loginAppComponent.login();
        expect(loginAppComponent.loginForm.valid).toBeTruthy();
    });

    it('should not call authenticate User service if username or password is not entered', () => {
        loginAppComponent.loginForm.setValue({ username: '', password: '' });
        spyOn(authenticationService, 'authenticateUser').and.returnValue(of(true));
        const navigateSpy = spyOn(loginAppComponent['router'], 'navigate');
        loginAppComponent.login();
        expect(loginAppComponent.loginForm.valid).not.toBeTruthy();
        expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should stay on login page when invalid credentials are entered', () => {
        loginAppComponent.loginForm.setValue({ username: 'random', password: 'abcd' });
        spyOn(authenticationService, 'authenticateUser').and.returnValue(of(false));
        const navigateSpy = spyOn(loginAppComponent['router'], 'navigate');
        loginAppComponent.login();
        expect(loginAppComponent['router'].navigate).toHaveBeenCalledWith(['login']);
    });

    it('should successfully redirect to dashboard when valid credentials are entered', () => {
        loginAppComponent.loginForm.setValue({ username: 'admin', password: 'abcd' });
        spyOn(authenticationService, 'authenticateUser').and.returnValue(of(true));
        const navigateSpy = spyOn(loginAppComponent['router'], 'navigate');
        loginAppComponent.login();

        expect(navigateSpy).toHaveBeenCalled();
        expect(loginAppComponent['router'].navigate).toHaveBeenCalledWith(['app-home']);
    });
});
