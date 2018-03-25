const
    app = require('./redditApp'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Search for Sub-Reddit',
        builder: (yargs) => {
            return yargs.option('name', {
                alias: 'n',
                describe: 'Search by Sub-Reddit name'
            })
            .option('count', {
                alias: 'c',
                describe: 'Number of Sub-Reddits to display in search'
            })
            .option('topic', {
                alias: 't',
                describe: 'Search for Sub-Reddits topic'
            })
            
        },
        handler: (argv) => { 
            if(argv.topic){
                app.topic(argv.topic)
            }else{
                app.interestSearch(argv.name, argv.count) 
            }}
    })
     .command({
        command: 'popular',
        desc: 'Search for Popular Sub-Reddits',
        handler: (argv) => { app.popular() }
    })
    .demandCommand()
    .help('help')
    .argv
