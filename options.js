let page = document.getElementById("buttonDiv")
let selected = document.getElementById('selectedStacks')
let stacks = [];


getStacks();
selectedStacks();


function getStacks(){
    chrome.storage.sync.get( (data)=>{
        stacks = (data.stackList)
        console.log(stacks);
        stacks.forEach(element => {
            if(element !== null){
                let button = document.createElement("button");
                button.classList.add("m-2", "btn-dark","p-2" );
                button.innerText = element;
                button.addEventListener("click", handleButtonClick);
                setTimeout(() => {
                    page.appendChild(button);
                }, 100);
            }
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
    console.log(btnVal);
    chrome.storage.sync.get(['StacksToKeep', 'stackList'], data =>{
        stk = data.StacksToKeep;
        stklst = data.stackList
        console.log('this is the data', data);
        if(stk.includes(btnVal)){
            let stackIndex = stk.indexOf(btnVal)
            stk.splice(stackIndex,1);
            let StacksToKeep = stk
            console.log('stackstokeep ---> ', StacksToKeep);
            stackList = data.stackList
            stackList.push(btnVal)
            chrome.storage.sync.set({StacksToKeep})
        } else {
            stk.push(btnVal);
            let StacksToKeep = stk;
            console.log('else ---> ', StacksToKeep);
            chrome.storage.sync.set({StacksToKeep})
        }
        // chrome.storage.sync.set({stackList})
    })


    window.location.reload()
}