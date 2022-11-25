function writeMessage(message) {
  console.log(message);
  

  // document.getElementById("status").innerHTML = message;

}

function porcupineErrorCallback(error) {
  writeMessage(error);
}

function porcupineKeywordCallback(keyword) {
  const time = new Date();
  const message = `keyword detected at ${time.toLocaleTimeString()}: ${keyword}`
  console.log(message);
  
  lunamain();
  // document.getElementById("result").innerHTML = message;
}

async function startPorcupine(accessKey = 'S2vwjyUTZTYjvnPzyg9RF2SoLmk1tSKuqL5TB2FcvFzu935a2GDc6Q==') {
  writeMessage("Porcupine is loading. Please wait...");
  try {
    let ppnEn = await PorcupineWebEnWorker.PorcupineWorkerFactory.create(
      accessKey,
      [
        {
          builtin: PorcupineWebEnWorker.BuiltInKeyword.Picovoice,
          sensitivity: 0.65,
        },
        {
          custom: "hey Luna",
          sensitivity: 0.7,
          base64:
            "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",
        },
      ],
      porcupineKeywordCallback,
      porcupineErrorCallback
    );

    writeMessage("Porcupine worker ready!");

    writeMessage(
      "WebVoiceProcessor initializing. Microphone permissions requested ..."
    );
    let webVp = await window.WebVoiceProcessor.WebVoiceProcessor.init({
      engines: [ppnEn],
    });
    writeMessage("WebVoiceProcessor ready and listening!");
  } catch (err) {
    porcupineErrorCallback(err);
    return;
  }
}