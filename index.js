const {Command} = require('switchit');
const ChromeProfileList = require('chrome-profile-list');
const File = require('phylo');

const console = global.loog;

const Help = require('./help');

class ChromeProfileListCli extends Command {
    beforeExecute (params) {
        if (params.canary) {
            params.chrome = false;
            params.chromium = false;
        }
        if (params.chromium) {
            params.chrome = false;
            params.canary = false;
        }
        if ((+params.chrome + +params.chromium + +params.canary) === 0) {
            params.chrome = true;
        }
    }

    execute (params) {
        if (params.help) {
            return new Help().showHelp(ChromeProfileListCli);
        }

        if (params.version) {
            return this.showVersion();
        }

        if (params.chrome) {
            console.json(ChromeProfileList(ChromeProfileList.variations.CHROME));
        } else if (params.chromium) {
            console.json(ChromeProfileList(ChromeProfileList.variations.CHROMIUM));
        } else if (params.canary) {
            console.json(ChromeProfileList(ChromeProfileList.variations.CANARY));
        }
    }

    showVersion () {
        const pkg = File.from(__dirname).upToFile('package.json').load();
        console.info(`${pkg.name} v${pkg.version}`).log();
    }
}

ChromeProfileListCli.define({
    help: {
        '': 'Command line interface for chrome-profile-list',
        help: 'Show help page',
        version: 'Show version'
    },
    switches: '[chrome:boolean=true] [chromium:boolean=false] [canary:boolean=false] [h#help:boolean=false] [v#version:boolean=false]'
});

module.exports = ChromeProfileListCli;