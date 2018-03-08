const
    redditAPI = require('reddit'),
    inquirer = require('inquirer')

const interestSearch = (interest) => {
    redditAPI.search(interest)
        .then(result => {

            for(let index in result){
                console.log(result[index].path)
            }
        })
        .catch(err => console.log(err))
}

module.exports = {
    interestSearch
}
