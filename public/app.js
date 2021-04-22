import Lists from './lists'
window.onload = () => {
    var name = 'MissingNo';
    var test;
    document.addEventListener("DOMContentLoaded", event => {
        const app = firebase.app();
        //console.log(app);
    })
    // MATH STUFF
    //let mon = Math.floor(Math.random() * 151 + 1);
    let shiny = Math.floor(Math.random() * 8192 + 1);
    let listRNG = Math.floor(Math.random() * 1000 + 1);
    if (listRNG <= 4272){
        var mon = Math.floor(Math.random() * Lists.common.length)
        var pokemon = Lists.common[mon];
    }
    else if (listRNG <= 7480){
        var mon = Math.floor(Math.random() * Lists.uncommon.length)
        var pokemon = Lists.uncommon[mon];
    }
    else if (listRNG <= 8907){
        var mon = Math.floor(Math.random() * Lists.rare.length)
        var pokemon = Lists.rare[mon];
    }
    else if (listRNG <= 9620){
        var mon = Math.floor(Math.random() * Lists.ultra.length)
        var pokemon = Lists.ultra[mon];
    }
    else if (listRNG <= 9977){
        var mon = Math.floor(Math.random() * Lists.secret.length)
        var pokemon = Lists.secret[mon];
    }else if (listRNG <= 9992){
        var mon = Math.floor(Math.random() * Lists.legendary.length)
        var pokemon = Lists.legendary[mon];
    }
    else{
        var mon = Math.floor(Math.random() * Lists.mythical.length)
        var pokemon = Lists.mythical[mon];
    }
    var id = Object.keys(pokemon)[0];
    var name = pokemon[id];
    if (shiny === 69){
        name = `shiny ${name}`;
    }
    var msg = (`you caught a wild ${name}`);
    document.getElementById("test").innerHTML = msg;
    var dbRef = firebase.database().ref(`/Ash/${id}/${name}`)
    dbRef.transaction(pokemon => {
        return (pokemon || 0) + 1;
    })

    // let mon = 6;
    // let shiny = 69;

    // URL STUFF
    //const monSTR = mon.toString();
    //let dex = `https://pokeapi.co/api/v2/pokemon/${monSTR}`;

    // with the RNG numbers, get the pokemon name (probably use local JSON file in future)
    // print out what pokemon was caught
    // update Firebase - add one to value, or treat it like a 0 and add 1
    // fetch(dex)
    //     .then(res => {return res.json()})
    //     .then(json =>{
    //         name = json.name;
    //         if (shiny === 69){
    //             name = `shiny ${name}`
    //         }
    //         var msg = (`you caught a wild pkm # ${monSTR} ${name}`);
    //         document.getElementById("test").innerHTML = msg;
    //         console.log(`ID: ${monSTR} ||| Name: ${name}`);
    //         var dbRef = firebase.database().ref(`/Ash/${monSTR}/${name}`)
    //         dbRef.transaction(pokemon => {
    //             return (pokemon || 0) + 1;
    //         })
    //     })
    
};

