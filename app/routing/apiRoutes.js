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
        var subDiffArr = [];
        var totalDiffArr = [];
        

	function getFriendMatch()	{
        for (var i = 0; i < friendsData.length; i++) {
            var friendsScores = friendsData[i].scores;

            for (var j = 0; j < friendsScores.length; j++) {
                var subDiff = Math.abs(parseInt(friendsScores[j]) - parseInt(curUserData.scores[j]));
                subDiffArr.push(subDiff);
               
            }

            console.log(subDiffArr);
            var totalDiff = subDiffArr.reduce((a, b) => a + b, 0);
            subDiffArr = [];
            friendsData[i].totalDiff = totalDiff;
            totalDiffArr.push(totalDiff);
            console.log(friendsData[i]);
        };
        displayFriendMatch();

};
        Array.min = function( array ){
    		return Math.min.apply( Math, array );
		};

		
function displayFriendMatch() {
		for (var k = 0; k < friendsData.length; k++) {
			var minimum = Array.min(totalDiffArr);
			console.log(minimum);
			if (parseInt(minimum) == parseInt(friendsData[k].totalDiff)) {
				res.json(friendsData[k]);
				friendsData.push(curUserData);
			}

		}

deleteDiffData()
}

function deleteDiffData() {

	for (var l = 0; l < friendsData.length; l++) {
		delete friendsData[l].totalDiff;
			subDiffArr = [];
			totalDiffArr = [];
	}
	
}

getFriendMatch();


    });

};