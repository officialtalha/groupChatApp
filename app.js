//importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//importing routes
const signUpRoutes = require('./routes/signUpRoutes');

//middleware use by the app
app.use(cors());
app.use('/signup', signUpRoutes);

//server listing 
(async () => {
    try {
        await sequelize.sync();
        app.listen(3000, (err) => {
            if (!err) {
                console.log(`server is running on http://localhost:3000`);
            } else {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
