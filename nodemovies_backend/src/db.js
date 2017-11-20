const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DB {

	constructor() {
		this.url = 'mongodb://localhost:27017/nodemovies';
	}

	connect() {
		MongoClient.connect(this.url, function(err, db) {
  			assert.equal(null, err);
  			console.log("Connected successfully to server");
    		db.close();
  	});
	}

	findDocuments () {
		let a;
		const finder = function(db, callback) {
			const collection = db.collection('movies');
			collection.find({}).toArray(function(err, docs) {
		   		assert.equal(err, null);
		   		a = docs;
		   		callback(docs);
	   		});
		  }
  		return new Promise((res)=> {
  			MongoClient.connect(this.url, function(err, db) {
  			assert.equal(null, err);
  			console.log("Connected successfully to server");
  			finder(db, function (data) {
  				res(data)
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

// Use connect method to connect to the server
/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
  	updateDocument(db, function () {
    	db.close();
  	});
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('movies');
  // Insert some documents
  collection.insertOne(
    {
    	consto: 'uve',
    	luso: 'geysha',
    	winner: 'geysha'
    }
  , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 1 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('movies');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('movies');
  // Update document where a is 2, set b equal to 1
  collection.updateOne(
  	{
    	consto: 'deadpool',
    }
    , { $set: { consto : 'yoyo' } }, function(err, result) {
    assert.equal(err, null);
    console.log("Updated the document");
    callback(result);
  });  
}*/