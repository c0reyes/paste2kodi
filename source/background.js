var contexts = ["page","selection","link","editable","image","video",
                "audio"];

for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  if(context == "selection") {
    var title = "Paste on kodi";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  }
}
