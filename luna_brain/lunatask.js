function listerncmd()
{
    var commd = lunarecognise();
    handleallcommand(commd);
}


function handleallcommand(commandText)
{

    
    commandText = commandText.toLowerCase();
    if (/hai|hi|hello|what is up/.test(commandText))
    {
        speakout("Hello ! I'm luna , How are You Today ?")
    }
    
    else if(/what/.test(commandText))
    {
        whatcommands(commandText);
    }

    else if(/who/.test(commandText))
    {
        whatcommands(commandText);
    }
    else{
        speakout("i'm yet to learn!")
    }
    showcommandinui(commandText)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var whatcommands = function (command) {

    command = command.toLowerCase();
    let result = /time/.test(command);

    if (result) {
        var nowtime = currtime();
        speakout("The time is " + nowtime);

    }

    if (command == "is your name") {

        commandout = 'Central AI of Raven Systems ! , Name is Luna !'
        speakout(commandout);

    }



}



var whocommands = function (command) {

    command = command.toLowerCase();
    let text = command;
    let result = /infinity|yamuna|satish/.test(command);

    if(result)
    {
        speakout("it's working , detected infinity!");
    }

    else if (command == "is up") {
        speakout("Nothing Much !");

    }


    else if (command == "created you") {
        speakout("I was coded by Infiniti ! but few of my abilities are from open source!");

    }

    else if (command == "are you") {

        commandout = "Hello , I'm Luna ! , Raven Systems Central Controll !";
        speakout(commandout);

    }
    else
    {
        speakout("Not Sure About That!")
    }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showcommandinui(commandText) {

    var lunaai = document.getElementById("lunaquestion");
    lunaai.innerText = commandText;

}

// // using on lunacore line#163
// function nocommandmatch() {

//     var lunaai = document.getElementById("lunaresponse");
//     lunaai.innerText = "Sorry , I don't Know That Yet !";
//     speakout("Sorry , I don't Know That Yet !");

// }



function speakout(text) {

    luna.abort();

    var utterance = new SpeechSynthesisUtterance(text);
    var voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.filter(function (voice) { return voice.name == 'Google US English'; })[0];
    window.speechSynthesis.speak(utterance);

    var lunaai = document.getElementById("lunaresponse");
    lunaai.innerText = text;

    
   
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
