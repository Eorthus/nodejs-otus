const { treeFunction, setLevelLinesHandler, printPathHandler } = require('./module')

describe('module test', () => {
    test('functions exists', async () => {
        expect(typeof treeFunction === 'function').toBe(true)

        expect(typeof setLevelLinesHandler === 'function').toBe(true)

        expect(typeof printPathHandler === 'function').toBe(true)
    })

    test('setLevelLinesHandler work', async () => {
        //root symbols
        const rootLevelResponse = await setLevelLinesHandler(1)

        expect(rootLevelResponse).toBe('|_')

        //levels symbols
        const secondLevelResponse = await setLevelLinesHandler(2)

        expect(secondLevelResponse).toBe('  |__')
    })

    test('printPathHandler work', async () => {
        console.log = jest.fn();

        //no depth
        await printPathHandler('', '', 0, 1)

        expect(console.log).toHaveBeenCalledTimes(0);

        //depth exists with file
        await printPathHandler('./', '.gitignore', 1, 1)

        expect(console.log).toHaveBeenCalledWith('|_', '.gitignore');

        //depth exists with directory
        await printPathHandler('./', 'coverage', 2, 1)

        expect(console.log).toHaveBeenCalledWith('  |__', 'clover.xml')
    })

    test('treeFunction work', async () => {
        console.log = jest.fn();

        await treeFunction('./')

        expect(console.log).toHaveBeenCalledWith('.');

    })
})