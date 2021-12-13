
let stackList = [];
// let StacksToKeep = [
//     'PROGRAMMING BASICS - 2021 ',
//     'WEB FUNDAMENTALS (2021) ',
//     'PYTHON v21.1 ',
//     'C# / .NET Core ',
//     'MERN ',
//     'JAVA '
// ]

let StacksToKeep = {
    'PROGRAMMING BASICS - 2021 ': true,
    'WEB FUNDAMENTALS (2021) ': true,
    'PYTHON V21.1 ': true,
    'C# / .NET CORE ': true,
    'MERN ': true,
    'JAVA ': true,
    'CAREER SERVICES ': true,
    'LAMP ': true,
    "HOW TO CREATE A COURSE ": true,
    "PRE-BOOTCAMP ONLINE ": true
}

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({stackList});
    chrome.storage.sync.set({StacksToKeep})
});