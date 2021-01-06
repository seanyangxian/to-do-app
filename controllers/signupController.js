
let User = require('../models/usersModel');
let top = require('../views/partials/signUpPageTop');
let bottom = require('../views/partials/signUpPageBottom');
let error = require('../views/partials/signUpPageError')

exports.getSignUpPage = function(req,res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(top+bottom);
    res.end();
}

exports.postSignUpPage = function(req,res) {
    let data = [];
    req.on('data',function(chunk){
        data.push(chunk);
    })
    req.on('end',function(){
        let info = Buffer.concat(data).toString();

        let pieces = info.split('&');

        let username = pieces[0].split('=')[1];

        let password = pieces[1].split('=')[1];

        let imageNumber = pieces[2].split('=')[1];

        User.find({username: username, password: password}, function(err, records){
            if(err){console.log(err);}
            else{
                if(records.length == 0){
                    let user = new User({username: username, password: password, imageNumber: imageNumber});
                    user.save(function(err){
                        if(err){console.log(err);}
                        else{
                            console.log('Registeration is successful.');
                            res.writeHead(301, {'Location' : '/'});
                            res.end() 
                        }
                    })
                }else{
                    res.write(top+error+bottom);
                    res.end()
                }
            }
        }) 
    })
}
