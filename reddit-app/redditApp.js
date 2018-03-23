const
    redditAPI = require('reddit'),
    inquirer = require('inquirer')


//Selection an interest from returned data
const selectionPrompt = (results) => {
    return inquirer.prompt([{
        type: 'list',
        name: 'results',
        message: 'Select a Sub-Reddit to see the Top threads at the moment: ',
        pageSize: results.length,
        choices: results.map(subs => `${subs.display_name_prefixed}`),
        validate: (answers) => {
    
            if(answers.length == 1){
                return true
            }
    
            else{
                return 'Something went wrong'
            }
                
        }
    }])
    .then((answers) => {
        displayItem(answers.results)
    })
}

//Displays sub-reddit's top threads at the moment
const displayItem = (id) =>{
    redditAPI.idSearch(id)
        .then(idResult => {
            for(let index in idResult.data.children){
                console.log(JSON.stringify("Title: " + idResult.data.children[index].data.title + 
                " | Up-votes: " +  idResult.data.children[index].data.ups  
                //" | Url: " + idResult.data.children[index].data.url 
                , null, 4))
            }
        })
        .catch(err => console.log(err))
}

//Initial start
const interestSearch = (interest) => {
    let subReddits = []
    redditAPI.search(interest)
        .then(results => {
            for(let index in results.data.children){
                subReddits.push(results.data.children[index].data)
            }
            selectionPrompt(subReddits)
        })
        .catch(err => console.log(err))
}


module.exports = {
    interestSearch
}
