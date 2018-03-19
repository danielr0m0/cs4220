const 
    config = require('./config'),
    superagent = require('superagent')

    // need help look at https://developers.themoviedb.org/3/search/search-tv-shows
    // look at the tabs on left for search tb search people and search movies
    const _fetch = (command) =>{
        return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
    }
//i dont know it works yet havent tested it out
exports.getTvSearch = (query) => {
    if(query != null){
        return _fetch(`/search/tv?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}

exports.getMovieSearch = (query) => {
    if(query != null){
        return _fetch(`/search/movie?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}

exports.getPeopleSearch = (query) => {
    if(query != null){
        return _fetch(`/search/person?api_key=${config.apiKey}&query=${query}`)
    }else
        return -1
}
