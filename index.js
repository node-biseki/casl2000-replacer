const fs = require('fs')
const path = require('path')
const EventEmitter = require('events').EventEmitter
const config = require('./config.json')

const emitter = new EventEmitter
emitter.once('mod', modify)

fs.watch(config.dir, { recursive: true }, (type, name) => emitter.emit('mod', name))
console.log('Started')

function modify(filename) {
    const modified = path.join(config.dir, filename)
    console.log(`Modified: ${modified}`)
    try {
        var content = fs.readFileSync(modified, 'utf8')
        fs.writeFileSync(modified, content.replace(/\,\s/g, ','))
    }
    catch(err) {
        console.log(err)
    }
    
    setTimeout(() => emitter.once('mod', modify), 1000)    
}
