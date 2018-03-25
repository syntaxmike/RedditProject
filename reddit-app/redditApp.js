const
    redditAPI = require('reddit'),
    inquirer = require('inquirer')
    Table = require('cli-table2');


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
    },{
        type: 'list',
        name: 'toshow',
        message: 'Select which threads to display: ',
        choices: ["top", "hot"],
        validate: (answers) => {
    
            if(answers){
                return true
            }
    
            else{
                return 'Something went wrong'
            }
                
        }
    }
    ])
    .then((answers) => {
        displayItem(answers.results, answers.toshow)
    })
}

//Displays sub-reddit's top threads at the moment
const displayItem = (id, show) =>{

    //if top is selected show this, else show hot threads
    let table = new Table({ head: ["Author", "Thread Info"]})
    redditAPI.idSearch(id, show)
        .then(idResult => {
            
            for(let index in idResult.data.children){

                table.push({[idResult.data.children[index].data.author]: 

                    ["Title: " + idResult.data.children[index].data.title.slice(0, 250) + "..."
                    +"\nUpvotes: " +
                    idResult.data.children[index].data.ups
                    +"\n# of Comments: " +
                    idResult.data.children[index].data.num_comments 
                    +"\nUrl to comments: reddit.com" + 
                    idResult.data.children[index].data.permalink]})
            }

            console.log(table.toString())
        })
        .catch(err => console.log(err))
}

//Initial name start
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

//Initial topic start
const topic = (interest) => {
    let subReddits = []
    redditAPI.byTopic(interest)
    .then(results => {
        for(let index in results){
            subReddits.push(results[index])
        }
         selectionPrompt(subReddits)
    })
    .catch(err => console.log(err))
}

//Initial start for popular search
const popular = () => {
    let subReddits = []
    redditAPI.popular()
    .then(results => {
        for(let index in results.data.children){
            subReddits.push(results.data.children[index].data)
        }
        selectionPrompt(subReddits)
    })
    .catch(err => console.log(err))
}


module.exports = {
    interestSearch, 
    popular,
    topic
}
