const fs = require('fs')
const path = require('path')

const setLevelLinesHandler = (counter) => {
    let line = '_'
    let spacer = ''

    for (let i = 1; i < counter; i++) {
        line += '_'
    }
    for (let i = 1; i < counter; i++) {
        spacer += '  '
    }

    return spacer + '|' + line
}

const printPathHandler = (parentFolder, childFolder, depth, counter) => {
    if (depth === 0) {
        return
    }
    const childPath = path.join(parentFolder, childFolder)
    const levelRouteLines = setLevelLinesHandler(counter)
    console.log(levelRouteLines, childFolder)
    if (fs.lstatSync(childPath).isDirectory()) {
        {
            const newParent = fs.readdirSync(childPath)

            newParent?.map(el => {
                printPathHandler(childPath, el, depth - 1, counter + 1)
            })
        }
    }
}

const treeFunction = (folderPath, depth) => {
    const defaultDepth = depth ?? 2
    const folderArray = fs.readdirSync(folderPath)
    const counter = 1

    console.log(path.basename(folderPath))

    folderArray?.map(el => {
        printPathHandler(folderPath, el, defaultDepth, counter)
    })
}

module.exports = treeFunction;