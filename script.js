const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".input-box");

const getMovieInfo = async (movie) => {

try {

    //fetching data from API

    const apiKey = `5c5d1a75`;

    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok) {
        throw new error("unable to fetch movie data")
    }

    const data = await response.json();
    // console.log(data)


    showMovieData(data);
} catch(error) {
    showErrorMsg("No Movie Found")
}
}

//showing data 

const showMovieData = (data) => {

    //creating Elements in JS & getting data from API

    movieContainer.innerHTML = ""

    movieContainer.classList.remove("noBG")

    const {Title, imdbRating, Actors, Genre, Released, Runtime, Plot, Poster} = data;


    const movieElement = document.createElement('div');

    movieElement.classList.add("movie-info");

    movieElement.innerHTML = `<h2>${Title}</h2> <p><strong>Rating: &#11088 </strong> ${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add("movie-genre");
    

    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
    })

    movieElement.appendChild(movieGenreElement);


    movieElement.innerHTML += ` <p><strong>Released</strong> ${Released}</p>
                                <p><strong>Duration: </strong> ${Runtime}</p>
                                <p><strong>Cast: </strong> ${Actors}</p>
                                <p><strong>Plot: </strong> ${Plot}</p>`;

    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement)
                                
    movieContainer.appendChild(movieElement);

}


const showErrorMsg = (msg) => {
    movieContainer.innerHTML = `<h2>${msg}</h2>`;
    movieContainer.classList.add("noBG")
}

//catching error

const handleFormListner = (e) => {

    e.preventDefault();
    // console.log(inputBox.value);
    const movieName = inputBox.value.trim();
    if(movieName !== "") {
        showErrorMsg("Fetching Movie Information")
        getMovieInfo(movieName)
    } else {
        showErrorMsg("Enter movie name to get movie information")
    }

}

searchForm.addEventListener("submit", handleFormListner)