
window.fbAsyncInit = function() {
    FB.init({
      appId      : '{244539339657764}',
      cookie     : true,
      xfbml      : true,
      version    : '{v3.0}'
    });
      concsole.log (fbAsyncInit);
    FB.AppEvents.logPageView();   
      
  };






  
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

