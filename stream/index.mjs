import {
    createReadStream,
    createWriteStream,
} from 'node:fs';

const data = []

//------------------------------------------------------------------------------------

const sortingHandler = () => {
    const dirtyArray = data?.map(el => el.replaceAll('\r', ' ').replaceAll('\n', ' ').replaceAll(' ', ',')).join('').split(',').filter(el => el)
    const sortingArray = dirtyArray?.flat().reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {})
    return `[${Object.values(sortingArray)}]`
}

const endHandler = async () => {
    try {
        const writeableStream = createWriteStream("output.txt", { highWaterMark: 1 });

        writeableStream.write(sortingHandler())

        writeableStream.end()

    } catch (err) {
        throw new Error(err)
    }
}

//-------------------------------------------------------------------------------------

try {
    const readableStream = createReadStream("input.txt", { highWaterMark: 1 });

    for await (const chunk of readableStream) {
        data.push(chunk.toString())
    }
} catch (err) {
    throw new Error(err)
} finally {
    endHandler()
}