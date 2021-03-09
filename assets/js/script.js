var APIkey = "9cae5d37"

function getMovies() {

    var title = $("#title-search")
        .val()
        .trim()
        .toLowerCase();

    fetch("http://www.omdbapi.com/?apikey=" + APIkey + "&s=" + title)

    .then(function(response) {
        return response.json();
    })
    .then(function(movies) {
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

        // fetch function to get the plot from the title
        fetch("http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + movies.Search[i].Title + "&type=movie&plot")

        .then(function(response) {
            if (response.ok) {
                
            }
            return response.json();
            })
            .then(function(movie) {
                console.log(movie);

                // display movies
                $("#results-container").append(
                    `<div class="card horizontal">\
                        <div class="card-image">\
                            <img class="search-poster" src="${movie.Poster}">\
                        </div>\
                        <div class="card-stacked">\
                            <div class="card-content">\
                                <h5>${movie.Title}</h5>\
                                <p>${movie.Year}</p>\
                                <p>${movie.Plot}</p>\
                            </div>\
                        </div>\
                    </div>`
                )
            })
        }
    }
    
}

$("#submit-btn").on("click", function() {
    getMovies();
});