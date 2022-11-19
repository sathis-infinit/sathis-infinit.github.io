"use strict";

// first we make sure luna started succesfully
if (luna) {

  var voices = window.speechSynthesis.getVoices();

  // define the functions our commands will run.
  // define our commands.
  // * The key is the phrase you want your users to say.
  // * The value is the action to do.
  //   You can pass a function, a function name (as a string), or write your function as part of the commands object.

  var commands =
  {

    // 'hello (there)': hello,
    'command *command': lunacommands,
    // '*command':repetecommand,
    // 'let\'s get started': getStarted,
    'what *command': whatcommands,
    'who *command': whocommands,
    'call *command': calltask,
    'turn on *device': deviceon,
    'turn off *device': deviceoff,
    // 'command *command': updatecommand,

  };

  // OPTIONAL: activate debug mode for detailed logging in the console
  luna.debug();

  // Add voice commands to respond to
  luna.addCommands(commands);

  // OPTIONAL: Set a language for speech recognition (defaults to English)
  // For a full list of language codes, see the documentation:
  // https://github.com/sa-this/luna/blob/master/docs/FAQ.md#what-languages-are-supported
  luna.setLanguage('en');

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  // luna.start();
  
  // luna.start({ autoRestart: true, continuous: false });
  //The above moved to wakeword line #16
}


else {
  $(document).ready(function () {
    $('#unsupported').fadeIn('fast');
  });
}


