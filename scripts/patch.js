(() => {
    const fs = require('fs')
    const path = require('path')
    // Patch the `server`.
    // See: https://github.com/theia-ide/theia/issues/4944
    fs.copyFileSync(
        path.resolve(__dirname, 'GH-4940/backend/server.js'),
        path.resolve(__dirname, '../src-gen/backend/server.js'),
        fs.constants.COPYFILE_FICLONE
    )
    // Patches the `node_modules` and `src-gen` code with the changes from https://github.com/theia-ide/theia/pull/4941
    // Patch the backend `main`.
    fs.copyFileSync(
        path.resolve(__dirname, 'GH-4940/backend/main.js'),
        path.resolve(__dirname, '../src-gen/backend/main.js'),
        fs.constants.COPYFILE_FICLONE
    )
    // Patch Theia `main`.
    fs.copyFileSync(
        path.resolve(__dirname, 'GH-4940/theia-main/main.ts'),
        path.resolve(__dirname, '../node_modules/@theia/core/src/node/main.ts'),
        fs.constants.COPYFILE_FICLONE
    )
    for (const name of ['main.d.ts', 'main.d.ts.map', 'main.js']) {
        fs.copyFileSync(
            path.resolve(__dirname, `GH-4940/theia-main/${name}`),
            path.resolve(__dirname, `../node_modules/@theia/core/lib/node/${name}`),
            fs.constants.COPYFILE_FICLONE
        )
    }
})()