
setTimeout(() => {

    getElements()

}, 500);

function getElements() {   
    let trackTitles = document.getElementsByClassName('track_title');
    let all_tracks =[...trackTitles];
    let string_tracks = [];

    all_tracks.forEach(element => {
        let title = element.innerHTML.toString()
        let parent = element.parentElement
        let grandparent = parent.parentElement
        let greatGP = grandparent.parentElement
        
        string_tracks.push([title,grandparent.getAttribute('data-track-id') ])

        chrome.storage.sync.get('StacksToKeep', (data)=>{
            if(data.StacksToKeep.includes(title)){
            } else {
                greatGP.removeChild(grandparent)
            }
        })
    });
    chrome.storage.sync.set({string_tracks});
}
















