let fs = require('fs');
let path = require('path');


exports.getErrorPage = function(req,res){
    res.writeHead(404, {'Content-Type': 'text/html'});

    let errorHtmlPath = path.join(__dirname,'..','views','404.html');
    
    fs.readFile(errorHtmlPath, function(err,data) {
        if(err) {
            console.log(err)
        } else {
            res.write(data.toString())
        }
        res.end();
    });
}

