// @ts-check
(async () => {

    const path = require('path')
    const pkg = require('pkg')
    
    const outPath = path.resolve(__dirname, '..', 'dist')
    await pkg.exec([
        path.resolve(__dirname, '..', 'package.json'),
        '--target',
        target(),
        '--out-path',
        outPath,
    ])
    require('./copy-addons').copyAddons(outPath)

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

})()