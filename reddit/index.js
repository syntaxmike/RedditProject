const
     config = require('./config'),
     superagent = require('superagent')

//Fetch search
const _fetchSearch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.search = (query) => {
    return _fetchSearch(`subreddits/search.json?limit=20&q=${query}`)
}

exports.idSearch = (id) => {
    return _fetchSearch(`r/${id}/top/.json?count=20`)
}
