// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBSqBogEljeIpFbDY_J-zRWaCiBxsan9s",
  authDomain: "fia-service.firebaseapp.com",
  databaseURL: "https://fia-service.firebaseio.com",
  projectId: "fia-service",
  storageBucket: "fia-service.appspot.com",
  messagingSenderId: "173186090244"
};

var app = firebase.initializeApp(config);
var database = app.database();
var survey = undefined;

var saveData = function() {

  if (survey === undefined)
  {
    survey = database.ref("submissions").push({
      date_now: new Date().toLocaleString(),
    });
  }

  var updateData = {};
  var inputs = $("input").each(function() {
    var $this = $(this);
    var inputName = $this.attr('name');
    var inputVal = $this.val();
    switch ($this.attr('type')) {
      case 'radio':
        if ($this.is(':checked')) {
          updateData[inputName] = inputVal;
        }
      break;
      case 'checkbox':
        if ($this.prop('checked')) {
          if (updateData[inputName]) {
            updateData[inputName] += ", " + inputVal;
          }
          else {
            updateData[inputName] = inputVal;
          }
        }
        break;
      default:
        updateData[inputName] = inputVal;
        break;
    }
  });
  var selects = $("select option:selected").each(function() {
    var $this = $(this);
    var inputVal = $this.val();
    var inputName = $this.parent().attr('name');
    updateData[inputName] = inputVal;
  });

  database.ref("submissions/" + survey.key).update(updateData);
};

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
  saveData();
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
