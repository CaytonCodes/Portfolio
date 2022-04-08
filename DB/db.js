const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/appDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB');
});

const projectSchema = new Schema({
  projectName: String,
  projectDescription: String,
  projectImage: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {
  Project,
};