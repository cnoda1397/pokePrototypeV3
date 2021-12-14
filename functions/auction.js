const functions = require('firebase-functions');
const fetch = require("node-fetch");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
// admin.initializeApp();
app.get('/:viewer/:amount', function(req, res){

    var bid = req.params.amount;
    var bidder = req.params.viewer;
    var msg = "hello world";
    var dbRef = admin.database().ref(`/_Auction/bid`)
    dbRef.transaction(winningBid => {

        if(bid > (winningBid || 0)){
            dbref = admin.database().ref(`/_Auction/bidder`);
            dbref.transaction(winningBidder =>{
                return bidder
            })
            msg = `you have placed the highest bid with $${bid}`
            return bid;
        }
        else{
            msg = "you did not bid high enough. Please try again."
        }    
    })
    res.send(msg);
})
exports.auction = functions.https.onRequest(app);