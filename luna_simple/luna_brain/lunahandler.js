const config =
{
    apiKey: "AIzaSyA0jC3DUFl4jxjth4vwmbKNzYFLSt1YaVA",
    authDomain: "luna-fdb.firebaseapp.com",
    databaseURL: "https://luna-fdb-default-rtdb.firebaseio.com",
    projectId: "luna-fdb",
    storageBucket: "luna-fdb.appspot.com",
    messagingSenderId: "167131896270",
    appId: "1:167131896270:web:0b524202c8afad005c339f",
    measurementId: "G-282S7D224C"
};

firebase.initializeApp(config);
var database = firebase.database();


function handlecurrentcommand(currentcommand) {

    showcommandinui(currentcommand);

    if(/what/.test(currentcommand))
    {
        whatcommands(currentcommand);
    }

    if(/who/.test(currentcommand))
    {
        whocommands(currentcommand);
    }


    // speakout(currentcommand);
}

function whatcommands(currentcommand)
{
    if (/name/.test(currentcommand))
    {
        speakout(" Hello , My name is LUNA !")
    }
    if (/time/.test(currentcommand))
    {
        var nowtime = currtime();
        speakout("The time is " + nowtime);
    }
}

function whocommands(currentcommand)
{
    if(/created/.test(currentcommand))
    {
        speakout("I was Created by Sathish Infiniti !, Do u Wanna Speak With Him ?")
    }
}













/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function speakout(text) {
    
    var utterance = new SpeechSynthesisUtterance(text);
    var voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.filter(function (voice) { return voice.name == 'Google US English'; })[0];
    window.speechSynthesis.speak(utterance);

    var lunaai = document.getElementById("lunaresponse");
    lunaai.innerText = text;

}

function showcommandinui(commandText) {

    var lunaai = document.getElementById("lunaquestion");
    lunaai.innerText = commandText;

}

function currtime() {
    var date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var ctime = hours + ":" + minutes + " " + am_pm;
    console.log(ctime);
    return ctime;
}