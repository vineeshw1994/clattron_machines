const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://localhost:27017/clattron').then(async () => {
  await Admin.create({ username: 'admin', password: 'admin@123' }); // Will hash automatically
  console.log('Admin created');
  process.exit();
});