console.log('running everyt time background');
let stackList = [];
let StacksToKeep = [
    'PROGRAMMING BASICS - 2021 ',
    'WEB FUNDAMENTALS (2021) ',
    'PYTHON v21.1 ',
    'C# / .NET Core ',
    'MERN ',
    'Java '
]

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({stackList});
    chrome.storage.sync.set({StacksToKeep})
});