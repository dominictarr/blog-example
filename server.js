
var http = require('http')
var path = require('path')
var fs   = require('fs')
var list = require('./')

http.createServer(function (req, res) {
  if('/' === req.url)
    list(__dirname, function (err, list) {
      res.end(list.map(function (e) {
        return '<a href=/'+e.dir+'>'+e.title + ' -- ' + e.author + '</a>' + e.date + '<br>'
      }).join('\n'))
    })
  else if('/favicon.ico' !== req.url){
    console.log(path.join(__dirname, req.url, 'post.md'))
    fs.createReadStream(path.join(__dirname, req.url, 'post.md')).pipe(res)
  }
}).listen(3000)
