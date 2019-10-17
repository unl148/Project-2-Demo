$(document).ready(function() {
  //
  //    Creating a new User
  //
  $("#signUp").on("click", function(event) {
    event.preventDefault();
    if (!$("#userName").val()) {
      return alert("enter user name");
    }
    userName = $("#userName")
      .val()
      .trim();
    var newUser = {
      userName: userName
    };
    $.post("/api/users", newUser).then(function(data) {
      if (data === "duplicate") {
        return alert(
          "This user name is already exists, please try another user name!"
        );
      } else if (data === "DB Error") {
        return alert("Sorry, we have problems, try again later");
      }
      localStorage.clear();
      localStorage.setItem("id", data.id);
      localStorage.setItem("token", data.token);
      $.ajax({
        type: "GET",
        url: "/first",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + data.token);
        }
      })
        .done(function(response) {
          console.log(response); //Response ok. process reuslt
        })
        .fail(function(err) {
          console.log(err); //Error during request
        });
    });
  });

  $("#logIn").on("click", function(event) {
    event.preventDefault();
    if (!$("#userName").val()) {
      return alert("enter user name");
    } else {
      userName = $("#userName")
        .val()
        .trim();
      $.get("/api/users/" + userName).then(function(data) {
        console.log(data);
        if (data === "not found") {
          return alert("This user name is not found!");
        } else if (data === "DB Error") {
          return alert("Sorry, we have problems, try again later");
        } else {
          localStorage.clear();
          localStorage.setItem("id", data.id);
          localStorage.setItem("userName", userName);
          window.location.href = "/first/" + data.id;
        }
      });
    }
  });
});
