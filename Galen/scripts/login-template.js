// These two values are passed from Galen test
var userLogin = 'yourLogin';
var userPassword = 'yourPassword';

// Here we type user login and password on our login page
driver.findElement(By.cssSelector('input[name="tx_pxaduniqbank_duniqbanklogin[user]"]')).sendKeys(userLogin);
driver.findElement(By.cssSelector('input[name="tx_pxaduniqbank_duniqbanklogin[password]"]')).sendKeys(userPassword);

// Submitting the login page
driver.findElement(By.cssSelector('input[value="Login"]')).click();

// Waiting till user profile page is shown
function pageIsLoaded() {
  return driver.getTitle() == 'Design';
}

waitFor(pageIsLoaded);

function waitFor(func) {
  var timeout = 10;

  while (timeout > 0 && !func()) {
    timeout = timeout - 1;
    Thread.sleep(1000);
  }

  if (!func()) {
    throw new Exception('Wait timeout');
  }
}
