const
     config = require('./config'),
     superagent = require('superagent')

//Fetch search
const _fetchSearch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.search = (query, count) => {
    return _fetchSearch(`subreddits/search.json?limit=${count}&q=${query}`)
}

exports.popular = () => {
	 return _fetchSearch(`subreddits/popular.json`)

}

exports.idSearch = (id,choice) => {
    return _fetchSearch(`${id}/${choice}/.json?count=20`)
}

exports.byTopic = (query) => {
    return _fetchSearch(`api/subreddits_by_topic.json?query=${query}`)
}
