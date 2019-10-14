$(document).ready(function() {
  $.get("/api/search/:" + userId + ":" + curentEdit).then(function(data) {
    $("#thought").text(data.thing);
    $("#range").val(data.rate);
    $("#category").text(data.category);
    $("#comment").text(data.comment);
    /// DATE is automaticali created by sequelize, need to transform it and display
    $("#date").text(data.date);
  });

  $("#delete").on("click", function() {
    // eslint-disable-next-line no-unused-vars
    $.delete("/api/delete/:" + userId, curentEdit).then(function(data) {
      alert("This record succsessfully deleted");
      window.location.href = "./search";
    });
  });
});
