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