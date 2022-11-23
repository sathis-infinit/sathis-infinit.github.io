

function lunarecognise()
{

console.log("...Recognising...")

const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.start();
recognition.onresult = function (event) {
  let result = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    result += event.results[i][0].transcript;
  }

  var lunaa = document.getElementById("lunatest");
  lunaa.innerText = result;
  
  recognition.stop();
  return result;

};

} 
