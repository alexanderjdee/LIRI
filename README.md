# LIRI

This is a command line node app that takes in parameters and returns data.

Before trying to use the app, be sure to run npm install to grab all dependencies.

The commands are the following:

- my-tweets: This returns the last 20 tweets on my personal twitter account. Example: node liri.js my-tweets

- spotify-this-song <song artist(optional)>: This returns information on this song from the Spotify API. Sometimes only including the song name doesn't return the correct song, so including the artist name next to it is more likely to get an accurate response. Example: node liri.js spotify-this-song The Sign Ace of Base

- movie-this: This returns information on this movie from the OMDB API. Example: node liri.js movie-this Mr. Nobody

- do-what-it-says: Runs whatever command and input is listed in the random.txt file. Example: node liri.js do-what-it-says
