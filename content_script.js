chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    const { mode, language } = message 
    switch(mode){
      case "init":
        init(sendResponse)
        break
      case "enable":
        toggle(language, "showing")
        break
      case "disable":
        toggle(language, "disabled")
        break
    }
  }
);

function textTracks(){
  return Array.from(document.getElementsByTagName('video')[0].textTracks)
}

function init(sendResponse){
  const array = textTracks().map(textTrack => {
    const { language, label, mode } = textTrack 
    return { language, label, mode }
  })
  sendResponse(array)
}

function toggle(language, mode){
  const textTrack = textTracks().find( textTrack => textTrack.language === language)
  textTrack.mode = mode
}