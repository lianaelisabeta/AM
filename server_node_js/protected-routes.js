var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    books   = require('./booksLibrary');
var app = module.exports = express.Router();

// Validate access_token
var jwtCheck = jwt({
  secret: config.secret,
  audience: config.audience,
  issuer: config.issuer
});

// Check for scope
function requireScope(scope) {
  return function (req, res, next) {
    var has_scopes = req.user.scope === scope;
    if (!has_scopes) { 
        res.sendStatus(401); 
        return;
    }
    next();
  };
}
app.use('/books',jwtCheck,requireScope('full_access'));
app.get('/books',function (req,res) {
    res.status(200).send(books.getBookList());
});
app.post('/books',function (req,res) {
    console.log(req.body);
    if(!req.body.title || !req.body.author ){
        res.status(500).send();
    }
    else{
        books.addBook(req.body.title,req.body.author);
        res.status(201).send();
    }
});

