//configuring environment variable
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
//importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const app = express();
//setup port number
const PORT = process.env.PORT || 3000;
//importing routes
const signUpRoutes = require('./routes/signUpRoutes');
const loginRoutes = require('./routes/loginRoute');

//middleware use by the app
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/signup', signUpRoutes);
app.use('/login', loginRoutes);
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
