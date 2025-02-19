const archiver = require('archiver')
const fs = require('fs')

function zipar(folderName, name) {
    console.log('Zipando arquivos...');
    const path = `${folderName}.zip`
    const fileZip = archiver('zip')
    const fileFs = fs.createWriteStream(path)

    fileFs.on('close', () => {
        const zipFileInfo = {
            name,
            path,
            type: 'zip'
        }
        console.log('oi', zipFileInfo)
    })

    fileZip.pipe(fileFs)

    fileZip.directory(folderName, false).finalize()
}

function zipar2(folderName, filename) {
    const path = `${folderName}.zip`
    const fileFs = fs.createWriteStream(path)

    const zipArchive = archiver('zip')

    zipArchive.pipe(fileFs)
    zipArchive.directory(folderName, false)
    zipArchive.finalize()

    const fileInfo = {
        name: filename,
        path,
        type: 'zip'
    }
}

zipar2('tmp', 'teste')