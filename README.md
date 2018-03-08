# RedditProject

Custom Module Requirements

package.json
The module should have a package.json file that is properly filled out.

    It should include but not limited to (name, version, author, contributors, dependencies, etc)

Methods
The module should export a method for searching.

    Given a search criteria it should return an an array that represent the result set.
    (EX: game title, city, character, actor/actress or artist)

The module should export a method for fetching data by id.

    Given an id of some item it should return an object representing the data requested)
    (EX: game title, city, character, actor/actress or artist)

*This custom module can use superagnet/request or similar modules to make the HTTP calls to your API.

*Ideally you should be creating a config.json to hold the main portion of the url and API key (if your API requires one).
CLI Requirements

Create a command line interface similar to the example ones from class.

    The CLI app should display a help menu by typing: node cli.js help
    The CLI should include a search command node cli.js search <item to be search>
    The app should allow a user to select from a search result and then fetch details
    The app should display the details formatted cleanly
    The app should have a cli.js, app.js and package.json

*The CLI portion should not contain the API URL. The CLI should only being using your custom module (above), yargs, inquirer or color/formatting modules.
