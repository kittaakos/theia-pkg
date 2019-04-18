// @ts-check

(async () => {

    const rimraf = require('rimraf')
    const fs = require('fs')
    const path = require('path')
    const pkg = require('pkg')
    const Renamer = require('renamer')
    const CliApp = require('renamer/lib/cli-app')

    const outPath = path.resolve(__dirname, '..', 'dist')
    rimraf(outPath, (error => {
        if (error) {
            console.error(`An unexpected error occurred when cleaning the output folder ${outPath}`)
            console.error(error)
            process.exit(1)
        }
    }))

    const renamer = new Renamer()
    const renamerCli = new CliApp()
    const writeOutput = renamerCli.writeOutput.bind(renamerCli)
    renamer.on('replace-result', result => {
        writeOutput(false, undefined, result)
    })
    try {
        // Trick `pkg`.
        // Based on https://github.com/zeit/pkg/issues/329#issuecomment-398151429
        renamer.rename({
            find: '.node',
            replace: '.foolpkg',
            files: ['**/*.node'],
        })
        await pkg.exec([
            path.resolve(__dirname, '..', 'package.json'),
            '--target',
            target(),
            '--out-path',
            outPath,
        ])
    } finally {
        // Revert rename.
        renamer.rename({
            find: '.foolpkg',
            replace: '.node',
            files: ['**/*.foolpkg'],
        })
    }

    function target() {
        return `${nodeRange()}-${platform()}-${arch()}`
    }

    function arch() {
        return process.arch
    }

    function platform() {
        const { platform } = process
        switch (platform) {
            case 'win32': return 'win'
            case 'darwin': return 'macos'
            case 'linux': return 'linux'
            default: {
                console.error(`Unsupported platform: ${platform}.`)
                process.exit(1)
            }
        }
    }

    function nodeRange() {
        if (10 !== parseInt(process.versions.node.split('.')[0], 10)) {
            console.error(`Only Node.js 10.x is supported. Was ${process.versions.node}.`)
            process.exit(1)
        }
        return 'node10'
    }

    // We need a solution for collecting the native add-ons programmatically.
    // See: https://spectrum.chat/zeit/pkg/how-to-collect-native-add-ons-programmatically~d47fd465-32c5-4d34-abf4-0fa5505e1cbe
    // Currently, it is just a hard-coded list based on the current Theia dependencies.
    /*
    > Warning Cannot include file %1 into executable.
      The file must be distributed with executable as %2.
      node_modules/drivelist/build/Release/drivelist.node
      path-to-executable/drivelist.node
    > Warning Cannot include file %1 into executable.
      The file must be distributed with executable as %2.
      node_modules/drivelist/scripts/darwin.sh
      path-to-executable/drivelist/darwin.sh
    > Warning Cannot include file %1 into executable.
      The file must be distributed with executable as %2.
      node_modules/drivelist/scripts/linux.sh
      path-to-executable/drivelist/linux.sh
    > Warning Cannot include file %1 into executable.
      The file must be distributed with executable as %2.
      node_modules/drivelist/scripts/win32.bat
      path-to-executable/drivelist/win32.bat
    > Warning Cannot include addon %1 into executable.
      The addon must be distributed with executable as %2.
      $ROOT/theia-pkg/node_modules/nsfw/build/Release/nsfw.node
      path-to-executable/nsfw.node
    > Warning Cannot include addon %1 into executable.
      The addon must be distributed with executable as %2.
      $ROOT/theia-pkg/node_modules/find-git-repositories/build/Release/findGitRepos.node
      path-to-executable/findGitRepos.node
    > Warning Cannot include addon %1 into executable.
      The addon must be distributed with executable as %2.
      $ROOT/theia-pkg/node_modules/oniguruma/build/Release/onig_scanner.node
      path-to-executable/onig_scanner.node
    */
    function copyAddons(target) {
        // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/build/Release/drivelist.node'), path.join(target, 'drivelist.node'))
        // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/scripts/darwin.sh'), path.join(target, 'drivelist/darwin.sh'))
        // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/scripts/linux.sh'), path.join(target, 'drivelist/linux.sh'))
        // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/scripts/win32.bat'), path.join(target, 'drivelist/win32.bat'))

        fs.copyFileSync(path.resolve(__dirname, '../node_modules/nsfw/build/Release/nsfw.node'), path.join(target, 'nsfw.node'))
        fs.copyFileSync(path.resolve(__dirname, '../node_modules/find-git-repositories/build/Release/findGitRepos.node'), path.join(target, 'findGitRepos.node'))
        fs.copyFileSync(path.resolve(__dirname, '../node_modules/oniguruma/build/Release/onig_scanner.node'), path.join(target, 'onig_scanner.node'))
    }


})()