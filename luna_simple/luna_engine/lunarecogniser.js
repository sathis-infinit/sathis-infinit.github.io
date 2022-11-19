
function flunasimple()
{

console.log("listern ..")

const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.start();
recognition.onresult = function (event) {
  let result = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    result += event.results[i][0].transcript;
  }
  console.log(result);
  handlecurrentcommand(result);
};
} 

flunasimple();