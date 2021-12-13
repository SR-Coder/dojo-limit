let observer = new MutationObserver((mutations) => {
  // grab StacksToKeep object at the beginning of the function to reduce calls to chrome.storage

  chrome.storage.sync.get("StacksToKeep", (data) => {
    let StacksToKeep = data.StacksToKeep;
    for (let mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.className == "modal-content") console.log(true);
          // elements with a nodeName beginning with LI are major tracks
          if (node.nodeName == "LI") {
            // grab all the LI nodes
            let allLiNodes = node.childNodes[0].childNodes;
            if (allLiNodes.length > 0) {
              let currStack = allLiNodes[0].innerHTML.toUpperCase();

              // if the StacksToKeep object does not have the key of the currStack string, then
              // remove the node from the DOM
              if (!StacksToKeep.hasOwnProperty(currStack)) {
                let nodeParent = node.parentNode;
                nodeParent.removeChild(node);
              }
            }
          }

          // elements with a nodeName beginning with DIV are minor tracks
          if (node.nodeName == "DIV") {
            console.log(node.className)
            if (node.className.includes("modal")) continue;
            // grab all the LI nodes
            let aNChild = node.querySelectorAll("li");

            // access StacksToKeep object from chrome storage
            aNChild.forEach((element) => {
              if (element.childNodes.length > 0) {
                let currStack = element.childNodes[0].childNodes[0].innerHTML;

                // early exit in the case the stack is undefined
                // this is purely to avoid error messages in the console
                if (currStack == undefined) return;

                // if the StacksToKeep object does not have the key of the currStack string, then
                // remove the node from the DOM
                if (!StacksToKeep.hasOwnProperty(currStack.toUpperCase())) {
                  let nodeParent = element.parentNode;

                  // exit early is the parent comes back is null
                  // this is purely to avoid error messages in the console
                  if (nodeParent == null) return;
                  nodeParent.removeChild(element);
                }
              }
            });
          }
        }
      }
    }
  });
});

observer.observe(document, { childList: true, subtree: true });

// for reference sake, below is a copy of the original observer code
// can be deleted once reference is no longer required

// let observer = new MutationObserver(mutations => {
//   for(let mutation of mutations){
//       for(let addedNode of mutation.addedNodes){
//           if(addedNode.nodeName == 'LI'){
//               thisParrent = addedNode.parentElement;
//               let allLiNodes = addedNode.childNodes[0].childNodes;
//               if(allLiNodes.length>0){
//                   chrome.storage.sync.get('StacksToKeep', (data)=>{
//                       if(data.StacksToKeep.includes(allLiNodes[0].innerHTML)){
//                       } else {
//                           elParent = addedNode.parentNode
//                           elParent.removeChild(addedNode)
//                       }
//                   })
//               }
//           }
//           if(addedNode.nodeName == "DIV"){
//               if(addedNode.childNodes.length > 0){
//                   let aNChild = addedNode.querySelectorAll('li')
//                   chrome.storage.sync.get('StacksToKeep', (data)=>{
//                       aNChild.forEach(element => {
//                           if(element.childNodes.length>1){
//                               let minorStack = element.childNodes[0].childNodes[0].innerHTML;
//                               if(data.StacksToKeep.includes(minorStack)){
//                               } else {
//                                   elParent = element.parentNode
//                                   elParent.removeChild(element)
//                               }
//                           }
//                       });
//                   })
//               }
//           }

//       }
//   }
// })
