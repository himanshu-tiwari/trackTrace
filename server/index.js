const hapi = require('hapi');
const mongoose = require('mongoose');
const User = require('./models/user');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async () => {
    server.route([{
        method: 'GET',
        path: '/',
        handler: (req, res) => `<p>My API</p>`
    }, {
        method: 'GET',
        path: '/users',
        handler: (req, res) => User.find()
    }, {
        method: 'POST',
        path: '/user/create',
        handler: (req, res) => {
            const { name, email, passsword, type } = req.payload;
            const user = new User({
                name,
                email,
                passsword,
                type
            });

            return user.save();
        }
    }]);

    await server.start();
    console.log(`running server at ${ server.info.uri }`);
};

mongoose.connect('mongodb://root:Abcd1234@ds111765.mlab.com:11765/track-trace', { useNewUrlParser : true });
mongoose.connection.once('open', () => {
    console.log('connected to database!');
});

init();