var books = require('./books.json');
var jsonfile = require('jsonfile');
exports.getBookList = function () {
    return books;
};

exports.getBookById = function (id) {
    return books[parseInt(id)];
};
exports.addBook =function(title,author){
   // console.log("i m in add book");
   // console.log(title);
   // console.log(author);
    //console.log(books);
    var id = books.length+1;
   // console.log(id);
    var newbook = {id:id,title:title,author:author};
    books.push(newbook);
    //console.log(books);
    jsonfile.writeFile('./books.json',books);

};

