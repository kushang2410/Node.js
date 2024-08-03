const User = require('../models/user.schema');

const createAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const adminUser = new User({
                username: 'admin',
                password: 'admin1234',
                role: 'admin'
            });
            await adminUser.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (err) {
        console.error('Error creating admin user', err);
    }
};

module.exports = createAdminUser;
