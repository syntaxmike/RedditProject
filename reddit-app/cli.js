const
    app = require('./redditApp'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
      .command({
        command: 'search',
        desc: 'Search for Sub-Reddits',
        builder: (yargs) => {
            return yargs.option('name', {
                alias: 'n',
                describe: 'Search By Sub-Reddit name'
            }).option('count', {
                alias: 'c',
                describe: 'Number of Sub-Reddits to display in search'
            })
        },
        handler: (argv) => { app.interestSearch(argv.name, argv.count) }
    })
    .help('help')
    .argv
