

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

  var lunaai = document.getElementById("lunatext");
  lunaai.innerText = result;
  // lunahandle(result);
  recognition.stop();
  return result;

};

} 
