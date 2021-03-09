var APIkey = "9cae5d37"

function getMovies() {

    var title = $("#title-search")
        .val()
        .trim()
        .toLowerCase();

        console.log(title);

    fetch("http://www.omdbapi.com/?apikey=" + APIkey + "&s=" + title)

    .then(function(response) {
        return response.json();
    })
    .then(function(movies) {
        console.log(movies.Search);
        displayMovies(movies);
    })
}

var displayMovies = function(movies) {
    // check to see if search array is empty
    if (movies.Search.length === 0) {
        $("#results-container").text("No Movies");
        return
    }
    else {
    // loop through movie results to display top 10
        for (var i = 0; i < movies.Search.length; i++) {
            $("#results-list").append(
                `<li>${movies.Search[i].Title}</li>`
            )
            console.log(movies.Search[i]);
        }
    }
    




    
}

$("#submit-btn").on("click", function() {
    getMovies();
});