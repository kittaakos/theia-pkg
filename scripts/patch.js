// Patches the `node_modules` and `src-gen` code with the changes from https://github.com/theia-ide/theia/pull/4941
(() => {
    const fs = require('fs');
    const path = require('path');
    const force = fs.constants.COPYFILE_FICLONE;
    fs.copyFileSync(
        path.resolve(__dirname, 'GH-4940/theia-main/main.ts'),
        path.resolve(__dirname, '../node_modules/@theia/core/src/node/main.ts'),
        force
    );
    fs.copyFileSync(
        path.resolve(__dirname, 'GH-4940/app-main/main.js'),
        path.resolve(__dirname, '../src-gen/backend/main.js'),
        force
    );
    for (const name of ['main.d.ts', 'main.d.ts.map', 'main.js']) {
        fs.copyFileSync(
            path.resolve(__dirname, `GH-4940/theia-main/${name}`),
            path.resolve(__dirname, `../node_modules/@theia/core/lib/node/${name}`),
            force
        );
    }
})();