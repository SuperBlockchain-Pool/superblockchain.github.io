
/* this checks the localStorage if it already has the variable saved */
function checkAcceptCookies() {
  if(localStorage.acceptCookies == 'true'){
    gdpr.style.display = 'none';
  }
}

/* here we store the variable that has been
accepted the use of cookies so we will not show
the message again */
function acceptCookies() {
  localStorage.acceptCookies = 'true';
  gdpr.style.display = 'none';
}

/* send the user to the privacy policy page */
function privacyPolicy() {
  window.location.href = 'privacy-policy.html';
  return false;
}

/* this runs when the web is loaded */
$(document).ready(function () {
  checkAcceptCookies();
});