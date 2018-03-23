const
    app = require('./redditApp'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Search for Sub-Reddits',
        builder: (yargs) => {
            return yargs.option('topic', {
                alias: 't',
                describe: 'Search By Topic'
            })
        },
        handler: (argv) => { app.interestSearch(argv.topic) }
    })
    .help('help')
    .argv