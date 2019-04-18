// We solution for collecting the native add-ons programmatically.
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

// @ts-check
const fs = require('fs')
const path = require('path')

function copyAddons(target) {
    // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/build/Release/drivelist.node'), path.join(target, 'drivelist.node'))
    // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/scripts/darwin.sh'), path.join(target, 'drivelist/darwin.sh'))
    // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/scripts/linux.sh'), path.join(target, 'drivelist/linux.sh'))
    // fs.copyFileSync(path.resolve(__dirname, '../node_modules/drivelist/scripts/win32.bat'), path.join(target, 'drivelist/win32.bat'))

    fs.copyFileSync(path.resolve(__dirname, '../node_modules/nsfw/build/Release/nsfw.node'), path.join(target, 'nsfw.node'))
    fs.copyFileSync(path.resolve(__dirname, '../node_modules/find-git-repositories/build/Release/findGitRepos.node'), path.join(target, 'findGitRepos.node'))
    fs.copyFileSync(path.resolve(__dirname, '../node_modules/oniguruma/build/Release/onig_scanner.node'), path.join(target, 'onig_scanner.node'))
}

module.exports = {
    copyAddons
}
