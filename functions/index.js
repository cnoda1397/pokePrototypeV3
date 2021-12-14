// const lists = require('./lists')
// exports.lists = lists.lists;
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
admin.initializeApp();



// MAIN FUNCTION
// 
app.get('/:viewer', function(req, res){
    // TIME LIMITTING
    // let time = new Date;
    // let rn = time.getMinutes();
    // if(rn >= 20){
    //     rn = 60 - rn;
    //     msg = `The Safari Zone is closed right now. Please come back in ${rn} minutes`
    //     res.send(msg);
    // }
    var trainer = req.params.viewer;
    let list = kanto;
    // GETTING THE GENERATION
    // Get the generation number from the database entry 'Generation' (1 = Kanto, 2 = Jhoto...)
    // Use the number to set list to the list of pokemone from particular region
    var genRef = admin.database().ref('/Admin/Generation');
    genRef.transaction(gen => {
        if (gen === 1){
            list = kanto;
        }
        else{
            list = jhoto;
        }
    })
    // once we have the list, use rng to select a rarity, then to select a mon
    let shiny = Math.floor(Math.random() * 125 + 1);
    // shiny = 3;
    let listRNG = Math.floor(Math.random() * 10000 + 1);
    if (listRNG <= 4272){
        var mon = Math.floor(Math.random() * list.common.length)
        var pokemon = list.common[mon];
    }
    else if (listRNG <= 7480){
        var mon = Math.floor(Math.random() * list.uncommon.length)
        var pokemon = list.uncommon[mon];
    }
    else if (listRNG <= 8907){
        var mon = Math.floor(Math.random() * list.rare.length)
        var pokemon = list.rare[mon];
    }
    else if (listRNG <= 9620){
        var mon = Math.floor(Math.random() * list.ultra.length)
        var pokemon = list.ultra[mon];
    }
    else if (listRNG <= 9977){
        var mon = Math.floor(Math.random() * list.secret.length)
        var pokemon = list.secret[mon];
    }else if (listRNG <= 9992){
        var mon = Math.floor(Math.random() * list.legendary.length)
        var pokemon = list.legendary[mon];
    }
    else{
        var mon = Math.floor(Math.random() * list.mythical.length)
        var pokemon = list.mythical[mon];
    }
    // pokemon = {10:"Caterpie"};
    // if shinyRNG is correct, add 'shiny' to name
    // _ for normal, @ for shiny levels
    var id = Object.keys(pokemon)[0];
    var name = pokemon[id];
    var levelPath = '_Level'
    if (shiny === 3){
        name = `~Shiny ${name}`;
        var levelPath = '~~Level'
    }
    // if (shiny === 3){
    //     var dbRef = admin.database().ref(`/${trainer}/shiny${id}/${name}`)
    // }
    // else{
    //     var dbRef = admin.database().ref(`/${trainer}/${id}/${name}`)
    // }

    var dbRef = admin.database().ref(`/${trainer}/${id}/${name}`)
    dbRef.transaction(pokemon => {
        return (pokemon || 0) + 1;
    })

    let level = Math.floor(Math.random() * 100 + 1);
    dbref = admin.database().ref(`/${trainer}/${id}/${levelPath}`);
    dbref.transaction(lvl =>{
        if((lvl || 0) > level)
        return lvl
        else return level
    })
    name = name.replace("~Shiny", "*Shiny*")
    var msg = (`you caught a level ${level} ${name}`);
    res.send(msg);
})
exports.encounter = functions.https.onRequest(app);
exports.auction = require('./auction').auction;

const kanto = {
    common:[{10:"Caterpie"}, {13:"Weedle"}, {16:"Pidgey"}, {19:"Rattata"}, {21:"Spearow"}, {23:"Ekans"},
        {27:"Sandshrew"}, {29:"Nidoran ♀"}, {32:"Nidoran ♂"}, {41:"Zubat"}, {43:"Oddish"}, {46:"Paras"},
        {48:"Venonat"}, {50:"Diglett"}, {54:"Psyduck"}, {56:"Mankey"}, {58:"Growlithe"}, {60:"Poliwag"},
        {69:"Bellsprout"}, {72:"Tentacool"}, {74:"Geodude"}, {77:"Ponyta"}, {84:"Doduo"}, {90:"Shellder"},
        {92:"Gastly"}, {96:"Drowzee"}, {98:"Krabby"}, {100:"Voltorb"}, {102:"Exeggcute"}, {104:"Cubone"},
        {116:"Horsea"}, {118:"Goldeen"}, {120:"Staryu"}],
    uncommon:[{11:"Metapod"}, {14:"Kakuna"}, {17:"Pidgeotto"}, {20:"Raticate"}, {22:"Fearow"}, {24:"Arbok"},
        {28:"Sandslash"}, {30:"Nidorina"}, {33:"Nidorino"}, {35:"Clefairy"}, {37:"Vulpix"}, {39:"Jigglypuff"},
        {42:"Golbat"}, {44:"Gloom"}, {47:"Parasect"}, {49:"Venomoth"}, {51:"Dugtrio"}, {52:"Meowth"}, {63:"Abra"},
        {66:"Machop"}, {75:"Graveler"}, {79:"Slowpoke"}, {81:"Magnemite"}, {85:"Dodrio"}, {86:"Seel"}, {88:"Grimer"},
        {93:"Haunter"}, {103:"Exeggutor"}, {105:"Marowak"}, {109:"Koffing"}, {111:"Rhyhorn"}, {114:"Tangela"},
        {129:"Magikarp"}, {138:"Omanyte"}, {140:"Kabuto"}],
    rare:[{1:"Bulbasaur"}, {4:"Charmander"}, {7:"Squirtle"}, {12:"Butterfree"}, {15:"Beedrill"}, {18:"Pidgeot"},
        {25:"Pikachu"}, {36:"Clefable"}, {38:"Ninetails"}, {40:"Wigglytuff"}, {45:"Vileplume"},
        {53:"Persian"}, {55:"Golduck"}, {57:"Primape"}, {59:"Arcanine"}, {61:"Poliwhirl"}, {64:"Kadabra"}, 
        {67:"Machoke"}, {70:"Weepinbell"}, {73:"Tentacruel"}, {78:"Rapidash"}, {80:"Slowbro"}, {82:"Magneton"},
        {87:"Dewgong"}, {89:"Muk"}, {91:"Cloyster"}, {95:"Onix"}, {97:"Hypno"}, {99:"Kingler"}, {101:"Electrode"},
        {106:"Hitmonlee"}, {107:"Hitmonchan"}, {108:"Lickitung"}, {110:"Weezing"}, {112:"Rhydon"}, {113:"Chansey"},
        {117:"Seadra"}, {119:"Seaking"}, {121:"Starmie"}, {124:"Jynx"}, {127:"Pinsir"}, {133:"Eevee"},
        {139:"Omastar"}, {147:"Dratini"}],
    ultra:[{2:"Ivysaur"}, {5:"Charmeleon"}, {8:"Wartortle"}, {26:"Raichu"}, {31:"Nidoqueen"}, {34:"Nidoking"}, {62:"Poliwrath"},
        {65:"Alakazam"}, {68:"Machamp"}, {71:"Victreebell"}, {76:"Golem"}, {83:"Farfetch'd"}, {94:"Gengar"},
        {115:"Kangaskhan"}, {123:"Scyther"}, {124:"Jynx"}, {125:"Electabuzz"}, {126:"Magmar"}, {128:"Tauros"}, {137:"Porygon"},
        {141:"Kabutops"}, {148:"Dragonair"}],
    secret:[{3:"Venusaur"}, {6:"Charizard"}, {9:"Blastoise"}, {122:"Mr. Mime"}, {130:"Gyarados"}, {131:"Lapras"},
        {132:"Ditto"}, {134:"Vaporeon"}, {135:"Jolteon"}, {136:"Flareon"}, {142:"Aerodactyl"}, {143:"Snorlax"},
        {149:"Dragonite"}],
    legendary:[{144:"Articuno"}, {145:"Zapdos"}, {146:"Moltres"}],
    mythical:[{150:"Mewtwo"}, {151:"Mew"}]
};
const jhoto = {
    common:[{161:"Sentret"}, {163:"Hoothoot"}, {165:"Ledyba"}, {167:"Spinarak"}, {177:"Natu"}, {187:"Hoppip"}, {190:"Aipom"},
        {191:"Sunkern"}, {204:"Pineco"}, {206:"Dunsparce"}, {209:"Snubbull"}, {218:"Slugma"}, {220:"Swinub"}, {223:"Remoraid"},
        {228:"Houndour"}],
    uncommon:[{162:"Furret"}, {164:"Noctowl"}, {166:"Ledian"}, {168:"Ariados"}, {170:"Chinchou"}, {179:"Mareep"}, {188:"Skiploom"},
        {193:"Yanma"}, {194:"Wooper"}, {198:"Murkrow"}, {203:"Girafarig"}, {211:"Quilfish"}, {213:"Shuckle"}, {215:"Sneasel"},
        {216:"Teddiursa"}, {222:"Corsola"}, {231:"Phanpy"}, {234:"Stantler"}],
    rare:[{152:"Chikorita"}, {155:"Cindaquil"}, {158:"Totodile"}, {169:"Crobat"}, {171:"Lanturn"}, {172:"Pichu"}, {173:"Cleffa"},
        {174:"Igglybuff"}, {175:"Togepi"}, {178:"Xatu"}, {180:"Flaffy"}, {182:"Bellossom"}, {183:"Marill"}, {185:"Sudowoodo"},
        {189:"Jumpluff"}, {192:"Sunflora"}, {195:"Quagsire"}, {200:"Misdreavus"}, {202:"Wobbuffet"}, {205:"Forretress"},
        {207:"Gligar"}, {210:"Granbull"}, {214:"Heracross"}, {219:"Magcargo"}, {221:"Piloswine"}, {224:"Octillery"},
        {226:"Mantine"}, {229:"Houndoom"}, {232:"Donphan"}, {236:"Tyrogue"}, {238:"Smoochum"}, {239:"Elekid"}, {240:"Magby"},
       {246:"Larvitar"}],
    ultra:[{153:"Bayleef"}, {156:"Quilava"}, {159:"Croconaw"}, {176:"Togetic"}, {181:"Ampharos"}, {184:"Azumarill"},
        {199:"Slowking"}, {201:"Unown"}, {217:"Ursaring"}, {227:"Skarmory"}, {230:"Kingdra"}, {233:"Porygon2"},
        {235:"Smeargle"}, {237:"Hitmontop"}, {241:"Miltank"}, {242:"Blissey"}, {247:"Pupitar"}],
    secret:[{153:"Meganium"}, {156:"Typhlosion"}, {160:"Feraligatr"}, {186:"Politoed"}, {196:"Espeon"}, {197:"Umbreon"},
        {208:"Steelix"}, {212:"Scizor"}, {225:"Delibird"}, {248:"Tyranitar"}],
    legendary:[{243:"Raikou"}, {244:"Entei"}, {245:"Suicune"}, {249:"Lugia"}, {250:"Ho-Oh"}],
    mythical:[{251:"Celebi"}]
};