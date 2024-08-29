const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://amorales:amoralesc4@cluster0.wgplk.mongodb.net/testproyecto?retryWrites=true&w=majority&appName=Cluster0',{
})
    .then(db => console.log('DB is connectd'))
    .catch(err => console.error(err))