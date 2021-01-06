let mongooose = require('mongoose');

let Scheme = mongooose.Schema;

let itemsSchema = new Scheme( {
 item : String,
 addedBy: String
});

module.exports = mongooose.model('items', itemsSchema);