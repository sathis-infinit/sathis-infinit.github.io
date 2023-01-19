async function whatcommands(commandText)
{
    if((/your/.commandText)&(/name/.commandText))
    {
        lunaspeak("Hi!,My name is lUNA!");
    }
    else if (/time/.test(commandText))
    {
      lunaspeak("The Time is : "+getcurrenttime());
    }
    else
    {
        await lunaspeak("Not sure ! , can i google it ?")
        if(await lunadecision())
        {
            await lunaspeak("showing google search for "+commandText)
            // window.open('http://google.com/search?q='+commandText);
            results = searchWikipedia(commandText)
            await lunaspeak(results);
            console.log(results);
            // window.open('https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=&srlimit=20&srsearch='+commandText);
            
            
        }
    }

    
    
}


async function whocommands(commandText)
{
    if((/are/.test(commandText))&(/you/.test(commandText)))
    {
        lunaspeak("Hello , i'm luna! , Thanks for asking!");
    }

    if((/created|made/.test(commandText))&(/you/.test(commandText)))
    {
        lunaspeak("I was Created by infinit !");

    }
    
    
}


async function opencommands(commandText)
{

    if((/twitter|bird/.test(commandText)))
    {
        await lunaspeak("Opening Twitter!");
        window.open('http://twitter.com/');
    }
    else if((/facebook|fb/.test(commandText)))
    {
        await lunaspeak("Opening Facebook!");
        window.open('http://facebook.com/');
    }
    else if((/github|git/.test(commandText)))
    {
        await lunaspeak("Opening github!");
        window.open('http://github.com/');
    }
    else if((/insta|instagram/.test(commandText)))
    {
        await lunaspeak("Opening instagram!");
        window.open('http://instagram.com/');
    }

    else
    {
        var arr = commandText.split(/\s+/);
        commandText = arr[1];
        await lunaspeak("Opening "+commandText)
        window.open('http://'+commandText+'.com/');

    }
    
    
    
}

