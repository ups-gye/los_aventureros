const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test-db-app')
    .then(db => console.log('DB is connectd'))
    .catch(err => console.error(err))