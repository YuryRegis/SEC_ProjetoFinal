const fs = require('fs').promises;


async function listFilesDir(dir, filesList) {
    if(!filesList)
        filesList = [];

    const filesArray = await fs.readdir(dir);
    for(let file in filesArray) {
        const stat = await fs.stat(dir + '/' + filesArray[file]);
        if(stat.isDirectory())
            await listFilesDir(dir + '/' + filesArray[file], filesList);
        else
            filesList.push(dir + '/' + filesArray[file]);
    }
    return filesList;
}


module.exports = listFilesDir