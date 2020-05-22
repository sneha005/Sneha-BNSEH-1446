import { browser, by, element, protractor } from 'protractor';

export class LoginPage {
   userName = element(by.css("input[formControlName=username]"));
   password = element(by.css("input[formControlName=password]"));
   submitButton = element(by.buttonText("Login"));
   errorDisplayElement = element(by.cssContainingText(".is-invalid", "Invalid credentials"))
   userNameRequiredElement = element(by.cssContainingText(".field-required", "Username is required"))
   passwordRequiredElement = element(by.cssContainingText(".field-required", "Password is required"))
   loginForm = element(by.id('loginForm'));
   EC = protractor.ExpectedConditions;
    
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

//   navigateToLocation(url){
//     browser.get();
//   }

  enterUserName(userName){
    this.userName.sendKeys(userName);
  }

  enterPassword(password){
    this.password.sendKeys(password);
  }

  DoLogin(){
    this.loginForm.submit();
  }

}
