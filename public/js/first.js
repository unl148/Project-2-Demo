$(document).ready(function() {
  console.log("Hello from first.js");
  $("#create").on("submit", function(event) {
    event.preventDefault();
    var thought = $("#thought")
      .val()
      .trim();
    var range = $("#range").val();
    var categoryId = $("#selectCategory").val();
    var comment;

    //Do we need this check?
    // if ($("#comment").val()) {
    comment = $("#comment")
      .val()
      .trim();
    // } else {
    //   comment = "No comment left";
    // }

    var userId = JSON.parse(window.localStorage.getItem("id"));
    var newThought = {
      title: thought,
      rating: range,
      CategoryId: categoryId,
      notes: comment,
      UserId: userId
    };
    console.log(newThought);
    // eslint-disable-next-line no-unused-vars
    $.post("/api/newthought/", newThought).then(function(data) {
      if (data === "DB Error") {
        return alert("Sorry, we have problems, try again later");
      }
      window.location.href = "/api/search/" + userId;
    });
  });
});
