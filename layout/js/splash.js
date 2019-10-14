//this variables are in global scope and can be accessed from other files
// if HTML has this script listed, we gonna assign them here,
// and use them for our routes everywhere
var userName;
var userId;

$(document).ready(function () {
  $("#signUp").on("click", function (event) {
    event.preventDefault();
    if (!$("#userName").val()) {
      return alert("enter user name")
    } else {
    userName = $("#userName")
      .val()
      .trim();
    if (!userName) {
      return;
    }
    var newUser = {
      userName: userName
    };
    $.post("/api/users", newUser).then(function (data) {
        // error or user id expected
      userId = data
      window.location.href = "./first";
    });
  }
  });

  $("#logIn").on("click", function (event) {
    event.preventDefault();
    if (!$("#userName").val()) {
      return alert("enter user name")
    } else {
    var userName = $("#userName")
      .val()
      .trim();
    if (!userName) {
      return;
    }
    var newUser = {
      userName: userName
    };
    $.post("/api/login", newUser).then(function (data) {
      if (data === "error") {
       return alert ("We have not found User with this name, please try again!")
      }
      else {
        userId = data
        window.location.href = "./first";
      }
    });
  }
  });
});
