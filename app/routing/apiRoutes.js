// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friendsData");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    console.log(req.body);
    console.log(friendsData);

   	let curUserData = req.body
   	var totalDiffArr = [];
   	var sum = [];
for (var i = 0; i < friendsData.length; i++) {
	var friendsScores = friendsData[i].scores;

   	for (var j = 0; j < friendsScores.length; j++) {
   		var subDiff = Math.abs(parseInt(friendsScores[j]) - parseInt(curUserData.scores[j]));
   		totalDiffArr.push(subDiff);
   		// console.log(sum);
   		// console.log(totalDiffArr);
   	}

   	console.log(totalDiffArr);
   	var totalDiff = totalDiffArr.reduce((a, b) => a + b, 0);
   	friendsData[i].totalDiff = totalDiff;
   	console.log(friendsData[i]);
};
     });

};

