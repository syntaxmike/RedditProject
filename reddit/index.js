const
     config = require('./config'),
     superagent = require('superagent')

//Fetch initial search
const _fetchSearch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

//Fetch by ID
const _fetchById = (command) => {
    return superagent.get(`${config.idUrl}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.search = (query) => {
    return _fetchSearch(`subreddits_by_topic.json?query=${query}`)
}

exports.idSearch = (id) => {
    return _fetchById(`${id}/top/.json?count=20`)
}
