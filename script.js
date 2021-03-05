var APIkey = "9cae5d37"

function getMovies() {

    var movie = $("#title-search")
        .val()
        .trim()
        .toLowerCase();

        console.log(movie);

    fetch("http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + movie)

    .then(function(response) {
        return response.json();
    })
    .then(function(title) {
        console.log(title);
    })
}

$("#submit-btn").on("click", function() {
    getMovies();
});