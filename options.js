let page = document.getElementById("buttonDiv")
let selected = document.getElementById('selectedStacks')
let stacks = [];


getStacks();
selectedStacks();

function getStacks(){
    chrome.storage.sync.get('string_tracks', (data)=>{
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
        stk = data.StacksToKeep;
        if(stk.includes(btnVal)){
            let stackIndex = stk.indexOf(btnVal)
            stk.splice(stackIndex,1);
            let StacksToKeep = stk
            chrome.storage.sync.set({StacksToKeep})
        } else {
            stk.push(btnVal);
            let StacksToKeep = stk;
            chrome.storage.sync.set({StacksToKeep})
        }
    })
    window.location.reload()
}