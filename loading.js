var fs = require('fs');
var _search = require('./searching');

var path = './data';

console.log(_search);

function load() {
    // Start listening to STDIN
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Inline function to handle
    // message output
    var showMessage = (err) => {
        console.log("Welcome to the Node Dictionary Reader!");
        console.log("======================================");
        console.log("Enter q to quit.");

        if (err) {
            console.error(err);
        }
    };

    // Display message
    showMessage();

    //Read Directory
    let jsonFiles = [];
    fs.readdir(path, (err, data) => {
        if (err) {
            throw err;
        }

        console.log("Select a dictionary to load:");
        //Check if JSON and display them
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes(".json")) {
                let element = (i + 1) + "." + data[i];
                console.log(element)
                jsonFiles.push(data[i]);
            }
        }

    });

    // Handler for STDIN data
    // event
    var onData = (data) => {
        data = data.trim();

        if (data === 'q') {
            process.exit();
        } else if (data <= jsonFiles.length && data > 0) {

            var path = './data/' + jsonFiles[data - 1];

            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                let wordArr = data.split(' ');

                let wordCount = data.split(' ').length;

                let words = {};

                wordArr.forEach(element => {
                    if (element.charAt(0).match(/^[a-zA-Z]/)) {
                        if (words[element.charAt(0)]) {
                            words[element.charAt(0)] += 1;
                        } else {
                            words[element.charAt(0)] = 1;
                        }
                    }
                });

                //Display Statistics
                console.log("Successfully loaded: ", jsonFiles[data - 1]);
                console.log("Word count: ", wordCount);
                console.log(words);
                console.log("What kind of search?");
                console.log('1: Exact search: ');
                console.log('2: Partial search: ');
                console.log('3: Begins with search: ');
                console.log('4: Ends with search: ');
                startSearch(wordArr);

            });
        }
         else {
            // All other input is invalid
            showMessage(`Invalid: ${ data }`);
        }
    };

    // Set the listener
    process.stdin.on('data', onData);

}

function startSearch(wordArr){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var onData = (data) => {
    data = data.trim();
    dataArray = data.split(' ');
    let num = dataArray[0];
    let str = dataArray[1];

    searchStr(num, str, wordArr);
    // If user input "next"
    // let's go to the next
    // state
    if (data === "q") {
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
    }//else{
    //   startSearch();
    // }

  }
  process.stdin.removeAllListeners('data');
//Setting the listener
  process.stdin.on('data', onData);
}

//Saving to file
// function startSearch(){
//   console.log("Do you want to save results to a file? y filename/n? \'q' quits");
//   process.stdin.resume();
//   process.stdin.setEncoding('utf8');
//   var onData = (data) => {
//     data = data.trim();
//     let dataArray = data.split();
//     let y = dataArray[0];
//     let filename = dataArray[1];
//     if(data === 'y'){
//       fs.writeFile(found.join(), filename, 'utf-8', (err)=>{
//         if(err) throw err;
//         console.log("File saved!");
//       });
//     }
//
//     // If user input "next"
//     // let's go to the next
//     // state
//     if (data === "q") {
//       process.stdin.pause();
//       process.stdin.removeListener('data', onData);
//     }
//
//   }
//   process.stdin.removeAllListeners('data');
// //Setting the listener
//   process.stdin.on('data', onData);
// }

function searchStr(num, str, wordArr=[]){
  switch(num){
    case "1":
      console.log(_search.exactMatch(str, wordArr));
      break;
    case "2":
      console.log(_search.partialMatch(str, wordArr));
      break;
    case "3":
      console.log(_search.beginsWith(str, wordArr));
      break;
    case "4":
      console.log(_search.endsWith(str, wordArr));
      break;
 }
}




//call
load();

module.exports = load;
