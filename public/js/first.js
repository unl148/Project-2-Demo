$(document).ready(function() {
  $("#create").on("submit", function(event) {
    event.preventDefault();
    var thought = $("#thought")
      .val()
      .trim();
    var range = $("#range").val();
    var category = $("#selectCategory").val();
    var comment;
    if ($("#comment").val()) {
      comment = $("#comment")
        .val()
        .trim();
    } else {
      comment = "No comment left";
    }

    var newThought = {
      thought: thought,
      range: range,
      category: category,
      comment: comment
    };
    // console.log(newThought);
    // eslint-disable-next-line no-unused-vars
    $.post("/api/newthought/" + userId, newThought).then(function(data) {
      window.location.href = "/search";
    });
  });
});
