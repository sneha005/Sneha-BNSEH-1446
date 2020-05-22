import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('Login App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
    browser.sleep(1000);
  });

  it('should take user to dashboard with correct credentials', () => {
    page.enterUserName("admin");
    page.enterPassword("abcd")
    browser.sleep(1000);
    page.DoLogin();

    expect(browser.getCurrentUrl()).toBe(browser.baseUrl + "app-home");
  });


  it('user should show error message when incorrect credentials are entered', () => {
    page.enterUserName("random");
    page.enterPassword("password");
    browser.sleep(1000);
    page.DoLogin();
    expect(page.errorDisplayElement.getText()).toEqual("Invalid credentials")
  });

  it('should show require error message when username is not present', () => {
    page.enterUserName("");
    page.enterPassword("password");
    browser.sleep(1000);
    page.DoLogin();
    expect(page.userNameRequiredElement.getText()).toEqual("Username is required");
  });

  it('should show require error message when password is not present', () => {
    
    page.enterUserName("random");
    page.enterPassword("");
    browser.sleep(500);
    page.DoLogin();
    
    expect(page.passwordRequiredElement.getText()).toEqual("Password is required");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    browser.sleep(1000);
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
