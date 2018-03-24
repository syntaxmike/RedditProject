const
    app = require('./redditApp'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
     .command({
        command: 'search <query> <num>',
        desc: 'Search for Sub-Reddits',
        handler: (argv) => { app.interestSearch(argv.query, argv.num) }
    })
    .showHelpOnFail(true)
    .demandCommand(1, '')
    .help('help')
    .argv
