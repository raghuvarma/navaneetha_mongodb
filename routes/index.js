
var mongoose = require('mongoose')
  , uniqueValidator = require('mongoose-unique-validator')
  , bcrypt = require('bcrypt-nodejs');
  
  
/*
 * UserSchema
 *
 */
userSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role:{ type: String, required: true },
    created_at:{ type: Date, default: Date.now }
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

/* ==================================
 * MongoDB connection using Mongoose
 */
 
var db = mongoose.createConnection('mongodb://localhost/navaneetha'),
    User = db.model('users', userSchema);
    

db.on('connected', function () {
    console.log('nananeetha database MongoDB.');
    dbmessage = 'nananeetha mongodb connected.';
});

db.on('error', function () {
    console.error.bind(console, 'Connection error!');
    dbmessage = 'nananeetha MongoDB error!';
});


userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Navaneetha Homeo' });
};

