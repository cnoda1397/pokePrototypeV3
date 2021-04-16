
window.onload = () => {

    document.addEventListener("DOMContentLoaded", event => {
        const app = firebase.app();
        //console.log(app);
    })
    let msg = '';
    
    var test = getUrlParam("trainer", "fail");
    if (test === "Ash"){
        console.log("URL Success");
    }
    else{
        console.log("URL Failure");
    }
    var query = firebase.database().ref(test).orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = JSON.stringify(childSnapshot.val());
        //console.log(`Key: ${key} || child: ${childData}`);
        msg = (msg + `${key}: ${childData}` + '<br>\n');
        });
        console.log(`msg: ${msg}`);
        document.getElementById("dex").innerHTML = msg;
    });
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    function getUrlParam(parameter, defaultvalue){
        var urlparameter = defaultvalue;
        if(window.location.href.indexOf(parameter) > -1){
            urlparameter = getUrlVars()[parameter];
            }
        return urlparameter;
    }
};
