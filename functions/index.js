// const lists = require('./lists')
// exports.lists = lists.lists;
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
        //let mon = Math.floor(Math.random() * 151 + 1);
        let shiny = Math.floor(Math.random() * 125 + 1);

        let listRNG = Math.floor(Math.random() * 1000 + 1);
        if (listRNG <= 4272){
            var mon = Math.floor(Math.random() * lists.common.length)
            var pokemon = lists.common[mon];
        }
        else if (listRNG <= 7480){
            var mon = Math.floor(Math.random() * lists.uncommon.length)
            var pokemon = lists.uncommon[mon];
        }
        else if (listRNG <= 8907){
            var mon = Math.floor(Math.random() * lists.rare.length)
            var pokemon = lists.rare[mon];
        }
        else if (listRNG <= 9620){
            var mon = Math.floor(Math.random() * lists.ultra.length)
            var pokemon = lists.ultra[mon];
        }
        else if (listRNG <= 9977){
            var mon = Math.floor(Math.random() * lists.secret.length)
            var pokemon = lists.secret[mon];
        }else if (listRNG <= 9992){
            var mon = Math.floor(Math.random() * lists.legendary.length)
            var pokemon = lists.legendary[mon];
        }
        else{
            var mon = Math.floor(Math.random() * lists.mythical.length)
            var pokemon = lists.mythical[mon];
        }
        let time = new Date;
        
        var id = Object.keys(pokemon)[0];
        var name = pokemon[id];
        if (shiny === 3){
            name = `shiny ${name}`;
        }
        var msg = (`you caught a wild ${name}`);

        //TIME LIMITTING
        // if(time.getMinutes() <= 10){
        //     msg = `you encountered a wild ${name}, but it fled`
        //     res.send(msg);
        // }
        //console.log(`listRNG = ${listRNG}, mon = ${mon}`)
        
        var dbRef = admin.database().ref(`/${trainer}/${id}/${name}`)
        dbRef.transaction(pokemon => {
            return (pokemon || 0) + 1;
        })
        res.send(msg);
        
        //dbref = admin.database().ref(`/${trainer}/${id}/${level}`);
        //dbref.transaction(lvl =>{
        //   if(lvl > level)
        //   return lvl
        //   else return level
        //})
        
        // URL STUFF
        // const monSTR = mon.toString();
        // let dex = `https://pokeapi.co/api/v2/pokemon/${monSTR}`;

        // // with the RNG numbers, get the pokemon name (probably use local JSON file in future)
        // // print out what pokemon was caught
        // // update Firebase - add one to value, or treat it like a 0 and add 1
        // fetch(dex)
        //     .then(res => {return res.json()})
        //     .then(json =>{
        //         name = json.name;
        //         if (shiny === 69){
        //             name = `shiny ${name}`
        //         }
        //         var msg = (`you caught a wild pkm # ${monSTR} ${name}`);
        //         console.log(`ID: ${monSTR} ||| Name: ${name}`);
        //         var dbRef = admin.database().ref(`/${trainer}/${monSTR}/${name}`)
        //         dbRef.transaction(pokemon => {
        //             return (pokemon || 0) + 1;
        //         })
        //         // functions.logger.info("Hello logs!", {structuredData: true});
        //         // response.send(msg);
        //         res.send(msg);

        //     })
    })
// });
exports.encounter = functions.https.onRequest(app);

const lists = {
    common:[{10:"Caterpie"}, {13:"Weedle"}, {16:"Pidgey"}, {19:"Rattata"}, {21:"Spearow"}, {23:"Ekans"},
        {27:"Sandshrew"}, {29:"Nidoran ♀"}, {32:"Nidoran ♂"}, {41:"Zubat"}, {43:"Oddish"}, {46:"Paras"},
        {48:"Venonat"}, {50:"Diglett"}, {54:"Psyduck"}, {56:"Mankey"}, {58:"Growlithe"}, {60:"Poliwag"},
        {69:"Bellsprout"}, {72:"Tentacool"}, {74:"Geodude"}, {77:"Ponyta"}, {84:"Doduo"}, {90:"Shelder"},
        {92:"Gastly"}, {96:"Drowzee"}, {98:"Krabby"}, {100:"Voltorb"}, {102:"Exeggcute"}, {104:"Cubone"},
        {116:"Horsea"}, {118:"Goldeen"}, {120:"Staryu"}],
    uncommon:[{11:"Metapod"}, {14:"Kakuna"}, {18:"Pidgeotto"}, {20:"Raticate"}, {22:"Fearow"}, {24:"Arbok"},
        {28:"Sandslash"}, {30:"Nidorina"}, {33:"Nidorino"}, {35:"Clefairy"}, {37:"Vulpix"}, {39:"Jigglypuff"},
        {42:"Golbat"}, {44:"Gloom"}, {47:"Parasect"}, {49:"Venomoth"}, {51:"Dugtrio"}, {53:"Meowth"}, {64:"Abra"},
        {66:"Machop"}, {75:"Graveler"}, {79:"Slowpoke"}, {81:"Magnemite"}, {85:"Dodrio"}, {86:"Seel"}, {88:"Grimer"},
        {93:"Haunter"}, {103:"Exeggutor"}, {105:"Marowak"}, {109:"Koffing"}, {111:"Rhyhorn"}, {114:"Tangela"},
        {129:"Magikarp"}, {138:"Omanyte"}, {140:"Kabuto"}],
    rare:[{1:"Bulbasaur"}, {4:"Charmander"}, {7:"Squirtle"}, {12:"Butterfree"}, {15:"Beedrill"}, {18:"Pidgeot"},
        {25:"Pikachu"}, {36:"Clefable"}, {38:"Ninetails"}, {40:"wigglytuff"}, {45:"Vileplume"},
        {53:"Persian"}, {55:"Golduck"}, {57:"Primape"}, {59:"Arcanine"}, {61:"Poliwhirl"}, {64:"Kadabra"}, 
        {67:"Machoke"}, {70:"Weepinbell"}, {73:"Tentacruel"}, {78:"Rapidash"}, {80:"Slowbro"}, {82:"Magneton"},
        {87:"Dewgong"}, {89:"Muk"}, {91:"Cloyster"}, {95:"Onix"}, {97:"Hypno"}, {99:"Kingler"}, {101:"Electrode"},
        {106:"Hitmonlee"}, {107:"Hitmonchan"}, {108:"Lickitung"}, {110:"Weezing"}, {112:"Rhydon"}, {113:"Chansey"},
        {117:"Seadra"}, {119:"Seaking"}, {121:"Starmie"}, {124:"Jynx"}, {127:"Pinsir"}, {133:"Eevee"},
        {139:"Omastar"}, {147:"Dratini"}],
    ultra:[{2:"Ivysaur"}, {5:"Charmeleon"}, {8:"Wartortle"}, {26:"Raichu"}, {31:"Nidoqueen"}, {34:"Nidoking"}, {62:"Poliwrath"},
        {65:"Alakazam"}, {68:"Machamp"}, {71:"Victreebell"}, {76:"Golemn"}, {83:"Farfetch'd"}, {94:"Gengar"},
        {115:"Kangaskhan"}, {123:"Scyther"}, {124:"Jynx"}, {125:"Electabuzz"}, {126:"Magmar"}, {128:"Tauros"}, {137:"Porygon"},
        {141:"Kabutops"}, {148:"Dragonair"}],
    secret:[{3:"Venusaur"}, {6:"Charizard"}, {9:"Blastoise"}, {122:"Mr. Mime"}, {130:"Gyarados"}, {131:"Lapras"},
        {132:"Ditto"}, {134:"Vaporeon"}, {135:"Jolteon"}, {136:"Flareon"}, {142:"Aerodactyl"}, {144:"Snorlax"},
        {149:"Dragonite"}],
    legendary:[{144:"Articuno"}, {145:"Zapdos"}, {146:"Moltres"}],
    mythical:[{150:"Mewtwo"}, {151:"Mew"}]
};