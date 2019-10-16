$(document).ready(function() {
  $("#create").on("click", function(event) {
    event.preventDefault();
    var thought = $("#thought")
      .val()
      .trim();
    var range = $("#range").val();
    var categoryId = $("#selectCategory").val();
    var comment;
    comment = $("#comment")
      .val()
      .trim();
    var userId = JSON.parse(window.localStorage.getItem("id"));
    var newThought = {
      title: thought,
      rating: range,
      CategoryId: categoryId,
      notes: comment,
      UserId: userId,
      //added simple date capture, rendering ugly
      dateTime: Date()
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
  $("#cancel").on("click", function(event) {
    event.preventDefault();
    var userId = JSON.parse(window.localStorage.getItem("id"));
    window.location.href = "/api/search/" + userId;
  });
});
