const movie = require("../model/movie")
const axios = require('axios')

const getAllMovies = async(req, res) => {
    const apiKey = '89be58740b5e2ee16ebdcb0390e99d02'
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    let params = {api_key: apiKey, page: 1};
    const allMovies = [];

    while (true) {
        try {
            const response = await axios.get(`${baseUrl}?api_key=${params.api_key}&page=${params.page}`);
            if (response.status === 200) {
                const data = response.data;
                const peliculas = data.results.map((pelicula) => ({
                    original_title: pelicula.original_title,
                    poster_path: pelicula.poster_path,
                }));
                allMovies.push(...peliculas);
                if (data.page < 20 /* total_pages */) {
                    params.page += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        } catch (error) {
            res.status(404).json({ message: 'Error al realizar la solicitud a la API' + error });
            break;
        }
    }
    res.status(200).json(allMovies)
}

const getMovieByName = async(req, res) => {
    const apiKey = '89be58740b5e2ee16ebdcb0390e99d02'
    const baseUrl = 'https://api.themoviedb.org/3/search/movie'
    const movieName = req.params.movieName
    try {
        const response = await axios.get(`${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
        console.log(`${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
        
        if (response.status === 200) {
            const data = response.data
            
            if (data.results.length > 0) {
                const primeraPelicula = data.results[0];
                const peliculaDeseada = {
                    original_title: primeraPelicula.original_title,
                    poster_path: primeraPelicula.poster_path,
                };
                res.status(200).json(peliculaDeseada)
            } else {
                console.log()
                res.status(404).json({ message: 'No se encontraron resultados para la película: ' + movieName})
            }
        } else {
            res.status(404).json({ message: 'Error al realizar la solicitud a la API'});
        }
    } catch (error) {
        res.status(404).json({ message: 'Error en la solicitud: ' + movieName})
    }
}

module.exports = {getAllMovies, getMovieByName}

