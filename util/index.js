const fs = require('fs');
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const treeFunction = require('./module');

const optionList = [
    {
        name: 'path',
        alias: 'p',
        required: true,
        type: String,
        description: 'Folder path. Required.'
    },
    {
        name: 'depth',
        alias: 'd',
        type: Number,
        description: 'Depth of tree. E.g. 3'
    },
]

const usageNotes = [
    {
        header: 'Options',
        optionList: optionList
    }
]

const usage = commandLineUsage(usageNotes)
let options = null;
try {
    options = commandLineArgs(optionList)
} catch (e) {
    console.log(usage);
    return;
}

if (Object.keys(options).length === 0 || options.help || !options.path) {
    console.log(usage)
    return;
}

if (!fs.existsSync(options.path)) {
    console.log(`! Can't find directory !`);
    console.log(usage)
    return;
}

try {
    treeFunction(options.path, options.depth)
} catch (e) {
    console.log(e);
    console.log(usage);
}