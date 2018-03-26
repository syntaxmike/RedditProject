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
        type: 'input',
        name: 'toshow',
        message: 'Enter which threads to display hot or top: ',
        validate: (answers) => {
    
            if(answers.toLowerCase() == "hot" || answers.toLowerCase() == "top"){
                return true
            }
    
            else{
                return 'Please enter hot or top'
            }
                
        }
    }
    ])
    .then((answers) => {
        displayItem(answers.results, answers.toshow.toLowerCase())
    })
}

//Displays sub-reddit's top threads at the moment
const displayItem = (id, threadType) =>{

    let table = new Table({ head: [`${id}`]})

    //if top is selected show this, else show hot threads
    redditAPI.idSearch(id, threadType)
        .then(idResult => {
            
            for(let index in idResult.data.children){
                let title,
                    author = idResult.data.children[index].data.author,
                    size = idResult.data.children[index].data.title.length,
                    up = idResult.data.children[index].data.ups,
                    numComments = idResult.data.children[index].data.num_comments,
                    link = idResult.data.children[index].data.permalink

                if(size > 220){
                    title = idResult.data.children[index].data.title.slice(0, 220) + "..."
                }else{
                    title = idResult.data.children[index].data.title
                }


                table.push(
                    ["Title: " + title
                    +"\nAuthor: " + author
                    +"\nUpvotes: " + up
                    +"\n# of Comments: " + numComments
                    +"\nUrl to comments: www.reddit.com" +  link])
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
