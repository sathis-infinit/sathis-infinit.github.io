function getcurrenttime() {
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

function lunaupdatequestion(commandText) {

    var lunaai = document.getElementById("lunaquestion");
    lunaai.innerText = commandText;

}

function lunaupdateresponse(commandText) {

    var lunaai = document.getElementById("lunaresponse");
    lunaai.innerText = commandText;

}

// async function searchWikipedia(searchQuery) {
//     const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
//     const response = await fetch(endpoint);
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     const json = await response.json();
//     return json;
//   }