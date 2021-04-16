
window.onload = () => {
    var name = 'MissingNo';
    var test;
    document.addEventListener("DOMContentLoaded", event => {
        const app = firebase.app();
        //console.log(app);
    })
    // MATH STUFF
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
            document.getElementById("test").innerHTML = msg;
            console.log(`ID: ${monSTR} ||| Name: ${name}`);
            var dbRef = firebase.database().ref(`/Ash/${monSTR}/${name}`)
            dbRef.transaction(pokemon => {
                return (pokemon || 0) + 1;
            })
        })
    
    // CONSOLE DEBUGGING STUFF
    //console.log("Outside", name);
    // let dbRefObject2 = firebase.database().ref('/Ash');
    // dbRefObject2.once('value', function(snapshot){
    //     console.log(JSON.stringify(snapshot.toJSON()))        
    // })
    
    // let trial = Pokemon('151', 'Mew', 1);
    // console.log(JSON.stringify(trial));

    // function Pokemon(id, name, caught){
    //     var obj = {};
    //     var pair = {};
    //     obj[name] = caught;
    //     pair[id] = obj;
    //     let val = {[id]:{[name]:caught}}
    //     return val;
    // }
};


// {
//   "database": {
//     "rules": "database.rules.json"
//   },
//   "hosting": {
//     "public": "public",
//     "ignore": [
//       "firebase.json",
//       "**/.*",
//       "**/node_modules/**"
//     ],
//     "rewrites": [
//       {
//         "source": "**",
//         "destination": "/index.html"
//       }
//     ]
//   },
//   "storage": {
//     "rules": "storage.rules"
//   },
//   "emulators": {
//     "database": {
//       "port": 9000
//     },
//     "hosting": {
//       "port": 5000
//     },
//     "ui": {
//       "enabled": true
//     }
//   }
// }