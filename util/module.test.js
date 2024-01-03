const { treeFunction, setLevelLinesHandler, printPathHandler } = require('./module')
const mock = require('mock-fs')



describe('module test', () => {

    beforeEach(() => {
        mock({
            'path/to/fake/dir': {
                'some-file.txt': 'file content here',
                'empty-dir': {/** empty directory */ }
            },
            'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
            'some/other/path': {/** another empty directory */ }
        });
    })

    afterEach(() => mock.restore())


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
        await printPathHandler('./', 'path/to/some.png', 1, 1)

        expect(console.log).toHaveBeenCalledWith('|_', 'path/to/some.png');

        //depth exists with directory
        await printPathHandler('./', 'path/to/fake/dir', 2, 1)

        expect(console.log).toHaveBeenCalledWith('  |__', 'empty-dir')
    })

    test('treeFunction work', async () => {
        console.log = jest.fn();

        await treeFunction('path/to/fake/dir')

        expect(console.log).toHaveBeenCalledWith('dir');

    })
})