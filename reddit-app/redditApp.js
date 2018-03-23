const
    redditAPI = require('reddit'),
    inquirer = require('inquirer')
    Table = require('cli-table');


//Select a subreddit from returned data
const selectionPrompt = (results) => {
    return inquirer.prompt([{
        type: 'list',
        name: 'results',
        message: 'Select a Sub-Reddit to see the top threads at the moment: ',
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
    let table = new Table({ head: ["", "Title", "Upvotes"] });
    redditAPI.idSearch(id)
        .then(idResult => {
            for(let index in idResult.data.children){

                table.push({"": [idResult.data.children[index].data.title, idResult.data.children[index].data.ups]})
            }

            console.log(table.toString())
        })
        .catch(err => console.log(err))
}

//Initial start
const interestSearch = (interest, count = 20) => {
    let subReddits = []
    redditAPI.search(interest, count)
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
