var omdbAPIkey = "9cae5d37"
var recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));

$(document).ready(function() {
    if (!recentlyViewed) {
        recentlyViewed = [];
    }
    console.log(recentlyViewed);
    for (var i = 0; i < recentlyViewed.length; i++) {
        $("#search-history").append(
            `<li><a href = "./imdb.html?movie=${recentlyViewed[i]}">${recentlyViewed[i]}</a></li>`
        );
    }
})

function getMovies(e) {
    e.preventDefault();
    $("#results-container").text("");

    var title = $("#title-search")
        .val()
        .trim()
        .toLowerCase();

    fetch("http://www.omdbapi.com/?apikey=" + omdbAPIkey + "&s=" + title)

    .then(function(response) {
        return response.json();
    })
    .then(function(movies) {
        displayMovies(movies);
    })
}

var displayMovies = function(movies) {
    // loop through movie results to display top 10
    for (var i = 0; i < movies.Search.length; i++) {

        // fetch function to get the plot from the title
        fetch("http://www.omdbapi.com/?apikey=" + omdbAPIkey + "&t=" + movies.Search[i].Title + "&type=movie&plot")

        .then(function(response) {
            // Check if the response is good
            if (response.ok) {
                response.json()
                .then(function(movie) {
                    if (movie.Response === "False") {
                        i++;
                    }
                    else {
                        // display movies
                        $("#results-container").append(
                            `<a href = "./imdb.html?movie=${movie.Title}"\
                                <div class="card horizontal">\
                                    <div class="card-image">\
                                        <img class="search-poster" src="${movie.Poster}">\
                                    </div>\
                                    <div class="card-stacked">\
                                        <div class="card-content">\
                                            <h5>${movie.Title} (${movie.Year})</h5>\
                                            <p>${movie.Plot}</p>\
                                        </div>\
                                    </div>\
                                </div>\
                            </a>`
                        )
                    }
                })
            }
            else {
                console.log("Error");
            }
        });
    }
}

$("#submit-btn").on("click", function(e) {
    getMovies(e);
});

$("#reset-btn").on("click", function() {
    $("#results-container").text("");
})

$("#clear-history").on("click", function() {
    localStorage.clear();
    location.reload();
})
