var ytAPIkey = "APIkeyHere"
var omdbAPIkey = "APIkeyHere"
var recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));

function getMovieName() {
    // extract movie name from query string
    var queryString = document.location.search;

    // use split to get the movie title from the string
    var movieString = queryString.split("=")[1];
    var movieTitle = movieString.replaceAll("%20", " ");
    displayInfo(movieTitle);
    getTrailer(movieTitle);

    if (!recentlyViewed) {
        recentlyViewed = [];
    }

    recentlyViewed.push(movieTitle);
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    console.log(recentlyViewed);
}

function displayInfo(movieTitle) {
    // fetch function to get the plot from the title
    fetch("http://www.omdbapi.com/?apikey=" + omdbAPIkey + "&t=" + movieTitle + "&type=movie&plot=full")

    .then(function(response) {
        return response.json();
        })
        .then(function(movie) {
            console.log(movie);
            $("#results-container").prepend(
                `<div class="card horizontal">\
                <div class="card-image">\
                    <img src="${movie.Poster}">\
                </div>\
                <div class="card-stacked" id="movie-info">\
                    <div>\
                        <h4>${movie.Title} (${movie.Year})</h4>\
                        <p>IMDB Rating: ${movie.imdbRating}</p>\
                        <p>Director: ${movie.Director}</p>\
                        <p>Cast: ${movie.Actors}</p>\
                        <p>Runtime: ${movie.Runtime}</p>\
                        <h6>Plot Synopsis</h6>\
                        <p>${movie.Plot}</p>\
                    </div>\
                </div>\
            </div>`
                );
        })
}

function getTrailer(movieTitle) {
    // start asynchronous function to get youtube trailer
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: ytAPIkey,
            q: `${movieTitle} trailer`,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
        },
        error: function(response){
            console.log("Request Failed");
        }
    });
}

function embedVideo(data) {
    $("iframe").attr("src", "https://www.youtube.com/embed/" + data.items[0].id.videoId)
}

getMovieName();

