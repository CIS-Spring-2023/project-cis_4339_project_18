// My APIs for registering and authenticating a user

var User = require('/path/to/user/model');

app.post('/register', function(req, res) {
  var new_user = new User({
    username: req.body.username
  });

  new_user.password = new_user.generateHash(req.body.password);
  new_user.save();
});

app.post('/login', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {

    if (!user.validPassword(req.body.password)) {
      //password did not match
    } else {
      // password matched. proceed forward
    }
  });
});