let express = require('express')
let app = express()
let reloadMagic = require('./reload-magic.js')

reloadMagic(app)

app.use('/', express.static('build'));

// Your endpoints go after this line

// But before this line

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })