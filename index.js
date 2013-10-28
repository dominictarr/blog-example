

var fs = require('fs')
var path = require('path')

var list = module.exports = function (contentDir, cb) {
  var array = []
  //get all directories
  fs.readdir(contentDir, function (err, ls) {
    var n = ls.length
    ls.forEach(function (dir) {
      //check if it's ACTUALLY a directory
      fs.stat(dir, function (err, stat) {
        if(err) next(err)
        if(!stat.isDirectory()) return next()
        //read the post.json file.
        fs.readFile(path.join(contentDir, dir, 'post.json'), 'utf8', function (err, str) {
          if(err) return next(err)
          try {
            var data = JSON.parse(str)
            data.dir = dir
            array.push(data)
          } catch (err) {
            return next(err)
          }
          next()
        })

      })
    })
    function next (err) {
      if(err) n = -1, cb (err)
      if(--n) return
      cb(null, array)
    }
  })
}

if(!module.parent)
  list(__dirname, console.log)
