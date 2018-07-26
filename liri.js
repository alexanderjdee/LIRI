require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);
var params = {screen_name: "AlexDee01569408"};

var command = process.argv[2];
var input = "";

function formatInputs(){
    if (process.argv.length > 4) {
        for (i = 3; i < process.argv.length; i++) {
            input += process.argv[i];
            if (i != process.argv.length - 1) {
                if (command === "movie-this") {
                    input += "+";
                }
                else {
                    input += " ";
                }
            }
        }
    }
    else {
        input = process.argv[3];
    }
    
    if(command === "do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error, data){
            if(error){
                return console.log(error);
            }
    
            var dataArray = data.split(",");
    
            command = dataArray[0];
            input = dataArray[1];
            runCommand();
        });
    }
    else{
        runCommand();
    }
}


function runCommand(){
    console.log("");

    switch (command) {
        case "my-tweets":   
            client.get("statuses/user_timeline", params, function(error, tweets, response){
                if(!error){
                    console.log("My tweets:");
                    console.log("---------------");
                    for(i=0; i<tweets.length; i++){
                        if(i===19){
                            break;
                        }
                        console.log(tweets[i].text);
                    }
                    console.log("---------------");
                }
            });
            break;

        case "spotify-this-song":
            if (typeof input === "undefined") {
                input = "The Sign Ace of Base";
            }
    
            spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("---------------");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("---------------");
            });
    
            break;
    
        case "movie-this":
            if (typeof input === "undefined") {
                input = "Mr.+Nobody";
            }
    
            var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + keys.ombd.api_key;
    
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var movie = JSON.parse(body);

                    console.log("Movie Title: " + movie.Title);
                    console.log("---------------");
                    console.log("Year: " + movie.Year);
                    console.log("IMDB: " + movie.imdbRating);
                    console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
                    console.log("Country: " + movie.Country);
                    console.log("Language: " + movie.Language);
                    console.log("Plot: " + movie.Plot);
                    console.log("Actors: " + movie.Actors);
                    console.log("---------------");
                }
            });
    
            break;
    
        default:
            console.log("Error: Please enter a valid command");
    
            break;
    }
}

formatInputs();
