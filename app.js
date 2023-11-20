//configuring environment variable
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
//importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelise = require('sequelize');
const sequelize = require('./util/database');

const app = express();
//setup port number
const PORT = process.env.PORT || 3000;
//importing models
const User = require('./models/userModel');
const Msg = require('./models/msgModel');
//importing routes
const signUpRoutes = require('./routes/signUpRoutes');
const loginRoutes = require('./routes/loginRoute');
const msgRoutes = require('./routes/msgRoute');
//middleware use by the app
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/signup', signUpRoutes);
app.use('/login', loginRoutes);
app.use('/msg', msgRoutes);
//foriegn key relation 
User.hasMany(Msg);
Msg.belongsTo(User);

//server listing 
(async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, (err) => {
            if (!err) {
                console.log(`server is running on http://localhost:${PORT}`);
            } else {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
