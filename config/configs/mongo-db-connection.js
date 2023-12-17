const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@made-in-heaven.cavfxih.mongodb.net/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((response) => {
        console.log(`[MongoDB] connected to MongoDB`);
    })
    .catch((error) => {
        console.error("[MongoDB] couldn't connect to MongoDB: ", { error });
    })
