const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
    app.get('/:viewer', function(req, res){
        var trainer = req.params.viewer;
        // res.send(trainer);
        //res.send(req.params);
        var name = 'MissingNo';
        let mon = Math.floor(Math.random() * 151 + 1);
        let shiny = Math.floor(Math.random() * 8192 + 1);
        // let mon = 6;
        // let shiny = 69;

        // URL STUFF
        const monSTR = mon.toString();
        let dex = `https://pokeapi.co/api/v2/pokemon/${monSTR}`;

        // with the RNG numbers, get the pokemon name (probably use local JSON file in future)
        // print out what pokemon was caught
        // update Firebase - add one to value, or treat it like a 0 and add 1
        fetch(dex)
            .then(res => {return res.json()})
            .then(json =>{
                name = json.name;
                if (shiny === 69){
                    name = `shiny ${name}`
                }
                var msg = (`you caught a wild pkm # ${monSTR} ${name}`);
                console.log(`ID: ${monSTR} ||| Name: ${name}`);
                var dbRef = admin.database().ref(`/${trainer}/${monSTR}/${name}`)
                dbRef.transaction(pokemon => {
                    return (pokemon || 0) + 1;
                })
                // functions.logger.info("Hello logs!", {structuredData: true});
                // response.send(msg);
                res.send(msg);

            })
    })
// });
exports.encounter = functions.https.onRequest(app);

