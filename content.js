let stackList = []
let observer = new MutationObserver(mutations => {
    for(let mutation of mutations){
        for(let addedNode of mutation.addedNodes){
            if(addedNode.nodeName == 'LI'){
                thisParrent = addedNode.parentElement;
                let allLiNodes = addedNode.childNodes[0].childNodes;
                if(allLiNodes.length>0){
                    chrome.storage.sync.get('StacksToKeep', (data)=>{
                        if(data.StacksToKeep.includes(allLiNodes[0].innerHTML)){
                        } else {
                            stackList.push(allLiNodes[0].innerHTML)
                            elParent = addedNode.parentNode
                            elParent.removeChild(addedNode)
                            // chrome.storage.sync.set({stackList})
                        }
                    })
                }
            }
            if(addedNode.nodeName == "DIV"){
                if(addedNode.childNodes.length > 0){
                    let aNChild = addedNode.querySelectorAll('li')
                    chrome.storage.sync.get('StacksToKeep', (data)=>{
                        aNChild.forEach(element => {
                            if(element.childNodes.length>1){
                                let minorStack = element.childNodes[0].childNodes[0].innerHTML;
                                if(data.StacksToKeep.includes(minorStack)){
                                } else {
                                    stackList.push(minorStack)
                                    elParent = element.parentNode
                                    elParent.removeChild(element)
                                    // chrome.storage.sync.set({stackList})
                                }
                            }
                        });
                    })
                }
            }
            
        }
    }
    chrome.storage.sync.set({stackList})
})

observer.observe(document, {childList: true, subtree: true});















