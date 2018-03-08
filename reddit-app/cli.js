const
    app = require('./redditApp'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Search for Sub-Reddit names that match your interest',
        builder: (yargs) => {
            return yargs.option('interest', {
                alias: 'i',
                describe: 'An interest of yours'
            })
        },
        handler: (argv) => { app.interestSearch(argv.interest) }
    })
    .help('help')
    .argv