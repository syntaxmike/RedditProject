const
    redditAPI = require('reddit'),
    inquirer = require('inquirer')

const selectionPrompt = (results) => {
    return inquirer.prompt([{
        type: 'list',
        name: 'results',
        message: 'Select a Sub-Reddit to learn more about: ',
        pageSize: results.length,
        choices: results.map(names => `${names.name}`),
        validate: (answers) => {
    
            if(answers.length == 1){
                return true
            }
    
            else{
                return 'Something went wrong'
            }
                
        }
    }])
    .then((answer) => {
        displayItem(answer.results)
    })
}

const displayItem = (id) =>{
    redditAPI.idSearch(id)
        .then(idResult => {
            for(let index in idResult.data.children){
                console.log(idResult.data.children[index].data.title)
            }
        })
        .catch(err => console.log(err))
}

const interestSearch = (interest) => {
    redditAPI.search(interest)
        .then(results => {
            selectionPrompt(results)
        })
        .catch(err => console.log(err))
}


module.exports = {
    interestSearch
}
