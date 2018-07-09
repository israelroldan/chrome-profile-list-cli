const { Container, commands } = require('switchit');

const HelpCmd = commands.Help;
const console = global.loog;

class Help {
    showHelp (Cli) {
        // Create a mock container named "$" so it is nicely displayed in the help output
        class $ extends Container {}
        $.define({ commands: { 'chrome-profile-list-cli': Cli } });
        // Show the help page
        return new HelpCmd()
            .attach(new $())
            .run(['chrome-profile-list-cli']);
    }
}

module.exports = Help;