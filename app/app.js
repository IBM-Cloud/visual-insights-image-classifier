const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(express.static('public'))
/*
* Default route for the web app
*/
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))