$(document).ready(function() {
  console.log("from quote.js");
  $.get("http://quotes.rest/qod.json").then(function(data) {
    console.log(data);
    if (data.success.total > 0) {
      $("#quoteText").text(data.contents.quotes[0].quote);
      $("#quoteAuthor").text(data.contents.quotes[0].author);
      $("#quoteTitle").text(data.contents.quotes[0].title);
    }
    console.log("after get");
  });
});
