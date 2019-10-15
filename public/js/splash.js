//this variables are in global scope and can be accessed from other files
// if HTML has this script listed, we gonna assign them here,
// and use them for our routes everywhere
$(document).ready(function() {
  $("#signUp").on("click", function(event) {
    event.preventDefault();
    if (!$("#userName").val()) {
      return alert("enter user name");
    } else {
      userName = $("#userName")
        .val()
        .trim();
      var newUser = {
        userName: userName
      };
      $.post("/api/users", newUser).then(function(data) {
        // error or user id expected
        // console.log(data);
        if (data === "duplicate") {
          return alert(
            "This user name is already exists, please try another user name!"
          );
        } else if (data === "DB Error") {
          return alert("Sorry, we have problems, try again later");
        } else {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("id", data.id);
          localStorage.setItem("userName", data.userName);
          window.location.href = "/first/" + data.id;
        }
      });
    }
  });

  $("#logIn").on("click", function(event) {
    event.preventDefault();
    if (!$("#userName").val()) {
      return alert("enter user name");
    } else {
      var userName = $("#userName")
        .val()
        .trim();
      var newUser = {
        userName: userName
      };
      $.post("/api/login", newUser).then(function(data) {
        if (data === "error") {
          return alert(
            "We have not found User with this name, please try again!"
          );
        } else {
          userId = data;
          window.location.href = "/first";
        }
      });
    }
  });
});
