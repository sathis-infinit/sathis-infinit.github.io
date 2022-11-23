

async function lunarecognise() {
  try 
  {

    console.log("...Recognising...")
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    await recognition.start();
    recognition.onresult = function (event) {
      let result = '';
      for (let i = event.resultIndex; i < event.results.length; i++) 
      {
        result += event.results[i][0].transcript;
      }

      // recognition.stop();
      console.log(result);
      return result;

    }

    }
    catch (error) {
      // If any of the awaited promises was rejected, this catch block
      // would catch the rejection reason
      return null;
  }


};
 
