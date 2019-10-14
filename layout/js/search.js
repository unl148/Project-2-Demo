/* eslint-disable no-unused-vars */
//this var in global scope used to keep reference to id
//with id we can find what we are editing in edit html.
var curentEdit;
$(document).ready(function() {
  // console.log(userName)
  // console.log(userid)

  $.get("/api/search/:" + userId).then(function(data) {
    for (var i = 0; i < data.length; i++) {
      //building table
      var tableBodyRow = $("<tr>").attr("class", "edit");
      var number = $("<td>").text(data[i].id);
      var thing = $("<td>").text(data[i].thing);
      var rate = $("<td>").text(data[i].rate);
      var date = $("<td>").text(data[i].date);
      var category = $("<td>").text(data[i].category);
      tableBodyRow.append(number, thing, rate, date, category);
      $("#tableBody").append(tableBodyRow);
    }
  });

  $("#submit").on("click", function(event) {
    event.preventDefault();
    var userQuery = $("#query")
      .val()
      .trim();
    var category = $("#selectCategory").val();
    var startDate = $("#dateStart").val();
    var endDate = $("#dateFinish").val();
    // console.log(userQuery,category,startDate,endDate)
    $.get(
      "/api/search/:" +
        userId +
        ":" +
        userQuery +
        "?:" +
        category +
        "?:" +
        startDate +
        "?:" +
        endDate +
        "?"
    ).then(function(data) {
      // console.log(data)
      $("#tableBody").empty();
      for (var i = 0; i < data.length; i++) {
        //building table
        var tableBodyRow = $("<tr>").attr({
          class: "edit",
          "data-id": data[i].id
        });
        var number = $("<td>").text(data[i].id);
        var thing = $("<td>").text(data[i].thing);
        var rate = $("<td>").text(data[i].rate);
        var date = $("<td>").text(data[i].date);
        var category = $("<td>").text(data[i].category);
        tableBodyRow.append(number, thing, rate, date, category);
        $("#tableBody").append(tableBodyRow);
      }
      // location.reload();
    });
  });

  //when user click on any created row it will send him to edit page
  $(document).on("click", "edit", function() {
    //
    curentEdit = $(this).data("id");
    window.location.href = "./display";
  });
});
