
let User = require('../models/usersModel');
let Item = require('../models/itemsModel');
let top = require('../views/partials/pageListTop');
let myListTop = require('../views/partials/pageMyListTop');
let bottom = require('../views/partials/pageListBottom');

exports.getListPage = function(req,res) {


    res.writeHead(200,{'Content-Type': 'text/html'} )
    /*
    create a ul 
    <ul>
        <li>Sleeping</li>
        <li>Playing</li>
        .......
    </ul>
    */
   // send => top + ul + bottom
    Item.find(function(err, records) {
        if(err) {console.log(err);}
        else {
            // console.log(records);
            let ul = '<ul>';

            for(let i =0 ; i< records.length; i++) {
                let item = records[i].item;
                let li = `<li>${item}</li>`;
                ul = ul + li;
            }

            ul = ul + '</ul>';
            res.write(top + ul + bottom);
            res.end();
        }
    });        
}

exports.getMyListPage = function(req,res) {

    res.writeHead(200,{'Content-Type': 'text/html'} )
    /*
    create a ul 
    <ul>
        <li>Sleeping</li>
        <li>Playing</li>
        .......
    </ul>
    */
        // send => top + ul + bottom
    let addedBy = req.session.get('username');
    Item.find({addedBy: addedBy},function(err, records) {
        if(err) {console.log(err);}
        else {
            // console.log(records);
            let ul = '<ul>';

            for(let i =0 ; i< records.length; i++) {
                let item = records[i].item;
                let li = `<li>${item}</li>`;
                ul = ul + li;
            }
            
            ul = ul + '</ul></div>';
            let img = "<div><img src='https://randomuser.me/api/portraits/men/"+req.session.get('imageNumber')+".jpg'>";
            res.write(myListTop + img + ul + bottom);
            res.end();
        }
    });        
}


exports.postItemPage = function(req,res) {
    let data = [];
        req.on('data', function(chunk) {
            data.push(chunk);
        })
        req.on('end', function() {
            let str = Buffer.concat(data).toString();
            // str = item=sleep
            let info = str.split('=')[1];
            let addedBy = req.session.get('username')
            let _item = new Item({item: info, addedBy: addedBy});

            _item.save(function(err) {
                if(err) {console.log(err)}
                else {
                    res.writeHead(301, {'Location' : '/list/all'});
                    res.end();
                }
            })
        })
}


exports.postMyItemPage = function(req,res) {
    let data = [];
        req.on('data', function(chunk) {
            data.push(chunk);
        })
        req.on('end', function() {
            let str = Buffer.concat(data).toString();
            // str = item=sleep
            let info = str.split('=')[1];
            let addedBy = req.session.get('username')
            let _item = new Item({item: info, addedBy: addedBy});

            _item.save(function(err) {
                if(err) {console.log(err)}
                else {
                    res.writeHead(301, {'Location' : '/list/mine'});
                    res.end();
                }
            })
        })
}