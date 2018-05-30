// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBSqBogEljeIpFbDY_J-zRWaCiBxsan9s",
  authDomain: "fia-service.firebaseapp.com",
  databaseURL: "https://fia-service.firebaseio.com",
  projectId: "fia-service",
  storageBucket: "fia-service.appspot.com",
  messagingSenderId: "173186090244"
};
firebase.initializeApp(config);

var formSubmission = function( event ) {
  event.preventDefault();
};

var hideAllForms = function() {
  var forms = $("form");
    for (var f = 0; f < forms.length; f++)
    {
      var $form = $(forms[f]);
      if (!$form.hasClass("d-none")) {
        $form.addClass("d-none");
      }
    }
};

var formNext = function(nextSection) {
  hideAllForms();
  var nextForm = $("#" + nextSection);
  nextForm.removeClass("d-none");
  if (nextForm.length) {
    nextForm[0].scrollIntoView();
  }
};

$(document).ready(function() {
  $("form").each(function(){
      $(this).on('submit', formSubmission);
  });
});
