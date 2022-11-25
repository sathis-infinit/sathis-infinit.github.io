async function lunamain() {
  await lunaspeak(" ");
  var currentcommand = await lunahear();
  // await lunaspeak(currentcommand);
  console.log(currentcommand);
  await lunahandlecommand(currentcommand);

}
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   lunahandlecommand - this is the function which handle the query given by user 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function lunahandlecommand(currentcommand) 
{
  lunaupdatequestion(currentcommand);
  console.log(currentcommand);
  return new Promise( ( resolve, reject ) => 
  {
    console.log("in promise :"+currentcommand)
    commandtext = currentcommand.toLowerCase();
    
    // if ((/what/.test(currentcommand)&/time/.test(currentcommand)))
    if (/what/.test(currentcommand))
    {
      whatcommands(commandtext);
    }
    else if (/who/.test(currentcommand))
    {
      whocommands(commandtext);
    }
    else if(/open/.test(currentcommand))
    {
      opencommands(commandtext)
    }

    resolve(currentcommand);
  }
  );
}







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   lunaspeak - this is the function which speakout given text 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function lunaspeak(message) 
{
  return new Promise( ( resolve, reject ) => 
  {
    var lunasynth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(message);
    var lunavoices = lunasynth.getVoices();
    utterThis.voice = lunavoices.filter(function (voice) { return voice.name == 'Google US English'; })[0];
    lunasynth.speak(utterThis);
    lunaupdateresponse(message);
    utterThis.onend = resolve;
  }
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   lunahear - this function listerns user command and return the spoken text  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function lunahear(dummy) 
{
  document.getElementById("speechon").play();
  // await lunaspeak("yes!");
  console.log("..listerning..")
  return new Promise( ( resolve, reject ) => 
  {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = function (event) 
    {
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;
      console.log(transcript);
      recognition.stop();
      document.getElementById("speechoff").play();
      resolve(transcript);
    }
    
  }
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function lunadecision()
{
var responsecommand = await lunahear();
if(/yes|okay|ok|sure|yes|ya|yeah/.test(responsecommand))
{
  return true;
}
// else if(/no|nope|don't|no thanks|nah|please don't/.test(responsecommand))
// {
//   return false;
// }
else
{
  return false
}


}

















// const btn = document.querySelector('.talk');
// const contect = document.querySelector('.content');

// var spokencmd = '';
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
// const recognition = new SpeechRecognition();


// function runn()
// {
//     recognition.start()
//     var cmdds = recognition.onresult = function(event){
//         test(event);
//     }
//     // var cmdds = recognisecmd();
//     console.log("test"+cmdds);
//     console.log("done");

// }

// function test(event)
// {
// //     recognition.start();
// //     console.log("started..");

// //     recognition.onresult = function (event)
// // {
// //     console.log("2..");
//     const speechresult = event.resultIndex;
//     const currentcommand = event.results[speechresult][0].transcript;
//     contect.textContent=currentcommand;
//     console.log(event);
//     spokencmd = currentcommand;
//     return currentcommand;
// // }

// }
