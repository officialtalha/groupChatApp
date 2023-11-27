//configuring environment variable
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

//importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelise = require('sequelize');
const sequelize = require('./util/database');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');

const app = express();

//setup port number
const PORT = process.env.PORT || 3000;

//importing models
const User = require('./models/userModel');
const Msg = require('./models/msgModel');
const Grp = require('./models/groupModel');
const usersGroups = require('./models/usersGroupsModel');
const Admin = require('./models/adminModel');

//importing routes
const signUpRoutes = require('./routes/signUpRoutes');
const loginRoutes = require('./routes/loginRoute');
const msgRoutes = require('./routes/msgRoute');
const msgListRoute = require('./routes/msgListRoute');
const deleteChatRoute = require('./routes/deleteChatRoute');
const getAllUsersRoute = require('./routes/getAllUsersRoute');
const groupRoute = require('./routes/groupRoute');
const usersGroupsRoute = require('./routes/usersGroupsRoute');
const adminRoute = require('./routes/adminRoute');
const deletegroupRoute = require('./routes/deletegroupRoute');

//middleware use by the app
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(helmet());
app.use('/signup', signUpRoutes);
app.use('/login', loginRoutes);
app.use('/msg', msgRoutes);
app.use('/msglist', msgListRoute);
app.use('/dltchat', deleteChatRoute);
app.use('/getallusers', getAllUsersRoute);
app.use('/group', groupRoute);
app.use('/usersgroups', usersGroupsRoute);
app.use('/admin', adminRoute);
app.use('/deletegroup', deletegroupRoute);

//foriegn key relation 

//user-message has one to many relationship
User.hasMany(Msg, { foreignKey: 'senderId' });
User.hasMany(Msg, { foreignKey: 'receiverId' });

//user-group has many to many relationship for members of the group 
User.belongsToMany(Grp, { through: usersGroups });
Grp.belongsToMany(User, { through: usersGroups });

//group-message has one to many relationship
Grp.hasMany(Msg, { foreignKey: 'groupId' });

//group-user has one to many relationship for admin of the group 
User.belongsToMany(Grp, {
    through: Admin,
    foreignKey: 'adminId'
});
Grp.belongsToMany(User, {
    through: Admin,
    foreignKey: 'groupId'
});

//server listing 
(async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, (err) => {
            if (!err) {
                logger.info(`server is running on http://localhost:${PORT}`);
            } else {
                logger.error(err);
            }
        });
    } catch (err) {
        logger.error(err);
    }
})();
