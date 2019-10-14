$(document).ready(function () {
  //when page loads we need to show user data 
  //that we have and what he is going to update
  // var data ={
  //   thing : "test",
  //   rate: "1",
  //   category : "restaurant",
  //   comment: " asfasfasf comment",
  //   date : "2019-03-01" 
  // }

  $.get("/api/search/:" + userId + ":" + curentEdit).then(function (data) {
    $("#thought").val(data.thing)
    $("#range").val(data.rate)
    $("#category").val(data.category)
    $("#comment").val(data.comment)
    /// DATE is automaticali created by sequelize, need to transform it and display, 
    // console log format is 2019-01-01
    $("#dateChange").val(data.date)
  })

  $("#update").on("submit", function (event) {
    console.log($("#dateChange").val())
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
    var date = $("#dateChange").val()

    var updateThought = {
      thought: thought,
      range: range,
      category: category,
      comment: comment,
      date: date
    }
    $.put("/api/edit/:" + userId, updateThought).then(function (data) {


      window.location.href = "./display";
    })
  })




});
