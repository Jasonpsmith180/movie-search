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
        // console.log(search);
        displayMovies(movies);
    })
}

var displayMovies = function(movies) {
    // check to see if search array is empty
    if (movies.length === 0) {
        $("#results-container").text("No Movies");
        return
    }

    console.log(movies.Search[0]);

    // loop through movie results to display top 10
    // for (var i = 0; i < movies.length; i++) {
    //     var movieEl = document.createElement("div")
    //     movieEl.addClass()
    // }


    
}

$("#submit-btn").on("click", function() {
    getMovies();
});