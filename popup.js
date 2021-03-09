function sendMessage(message, callback){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, message, callback)
  })
}

sendMessage({mode: "init"}, (textTracks) => {
  if(typeof textTracks === "undefined") return

  const html = textTracks.map(textTrack => {
    const { mode, language, label } = textTrack
    const checked = mode === "showing" ? "checked='checked'" : ""
    return `<p><input type='checkbox' class="item" ${checked} id="${language}">${label}</p>`  
  }).join("\n")

  const langList = document.getElementById("lang_list")
  langList.innerHTML = html
  
  const items = document.getElementsByClassName("item")
  Array.from(items).forEach(item => {
    item.addEventListener("click", function(){
      const mode = item.checked ? "enable" : "disable"
      sendMessage({mode: mode, language: item.id})
    })
  })
})
