var omdbAPIkey = "9cae5d37"

function getMovieName() {
    // extract movie name from query string
    var queryString = document.location.search;

    // use split to get the movie title from the string
    var movieString = queryString.split("=")[1];
    var movieTitle = movieString.replaceAll("%20", " ");
    getVideo(movieTitle);
}

function getVideo(movieTitle) {

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyCe5XVTMu5oYI0XgZ9-7l2AIFim_OX8tFM',
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
    $("h3").text(data.items[0].snippet.title)
    $(".description").text(data.items[0].snippet.description)
}

// fetch function to get the plot from the title
// fetch("http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + movies.Search[i].Title + "&type=movie&plot")

// .then(function(response) {
//     return response.json();
//     })
//     .then(function(movie) {
//         console.log(movie);
//     })


getMovieName();

