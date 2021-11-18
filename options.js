let page = document.getElementById("buttonDiv")
let selected = document.getElementById('selectedStacks')
console.log(page);
let stacks = [];


getStacks();
selectedStacks();

function getStacks(){
    chrome.storage.sync.get('string_tracks', (data)=>{
        // console.log(data.string_tracks)
        stacks = (data.string_tracks)
        stacks.forEach(element => {
            let button = document.createElement("button");
            button.classList.add("m-2", "btn-dark","p-2" );
            button.innerText = element[0];
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        });
    })
}

function selectedStacks(){
    chrome.storage.sync.get('StacksToKeep', (data)=>{
        console.log(data.StacksToKeep);
        data.StacksToKeep.forEach(element => {
            let list = document.createElement('li')
            list.innerText = element
            list.classList.add("m-2", "bg-primary", "p-2", "text-light", "border", "rounded-pill")
            list.addEventListener("click", handleButtonClick)
            selected.appendChild(list)
        })
    })
}

function handleButtonClick(elem){
    btnVal = elem.srcElement.innerText;
    btnVal = btnVal+" ";
    chrome.storage.sync.get( data =>{
        console.log(data.StacksToKeep);
        stk = data.StacksToKeep;
        if(stk.includes(btnVal)){
            console.log("we did it");
            let stackIndex = stk.indexOf(btnVal)
            console.log(stk);
            stk.splice(stackIndex,1);
            console.log(stk);
            let StacksToKeep = stk
            chrome.storage.sync.set({StacksToKeep})
        } else {
            console.log(stk);
            stk.push(btnVal);
            console.log(stk);
            let StacksToKeep = stk;
            chrome.storage.sync.set({StacksToKeep})
        }
    })
    window.location.reload()
}