/* eslint-disable no-unused-vars */
$(document).ready(function() {
  $("#submit").on("click", function(event) {
    event.preventDefault();
    var userQuery = $("#query")
      .val()
      .trim();
    var category = $("#selectCategory").val();
    var startDate = $("#dateStart").val();
    var endDate = $("#dateFinish").val();
    var userId = JSON.parse(window.localStorage.getItem("id"));
    var newQuery = userId;
    // check for the presence of these parameters
    if (userQuery) {
      newQuery += "&userQuery=" + userQuery;
    }
    if (category) {
      newQuery += "&category=" + category;
    }
    if (startDate) {
      newQuery += "&startDate=" + startDate;
    }
    if (endDate) {
      newQuery += "&endDate=" + endDate;
    }
    // console.log(newQuery);
    $.get("/search/" + newQuery).then(function(data) {
      //   console.log(data);
    });
  });

  //when user click on any created row it will send him to edit page
  $(document).on("click", ".edit", function() {
    window.location.href = "/display/" + userId;
  });
});
