const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DB {

	constructor() {
		this.url = 'mongodb://localhost:27017/nodemovies';
	}

	findDocuments () {
		const finder = function(db, callback) {
			const collection = db.collection('movies');
			collection.find({}).toArray(function(err, docs) {
		   		assert.equal(err, null);
		   		callback(docs);
	   		});
		  };
  		return new Promise((res) => {
  			MongoClient.connect(this.url, function(err, db) {
  			assert.equal(null, err);
  			console.log("Connected successfully to server");
  			finder(db, function (data) {
  				res(data);
    			db.close();
  			})
  		});
  	});
	}

  insertDocument (userData) {
    MongoClient.connect(this.url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const collection = db.collection('movies');
        collection.insertOne(userData, function(error, result) {
          assert.equal(err, null);
          console.log("Inserted 1 documents into the collection");
          db.close();
        });
    });
  }

}

module.exports = new DB();
