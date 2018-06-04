function genericOnClick(info, tab) {
	paseText(info.selectionText);
}

function pasteOnClick() {
	var text = document.getElementById('text').value;

	if(text) {
		paseText(text);
		document.getElementById('text').value = '';
	}
}

function paseText(text) {
  chrome.storage.sync.get(['kodiIp','kodiPort','kodiUser','kodiPass'], function(items) {
  	if(items.kodiIp && items.kodiPort) {
  		var url = 'http://' + items.kodiIp + ':' + items.kodiPort + '/jsonrpc';
  		var user = items.kodiUser + ':' + items.kodiPass;

  		var data = '{"id": "1",  "jsonrpc": "2.0", "method": "Input.SendText",  "params": {"text": "' + text + '",  "done": false}}';
  		var jax = new XMLHttpRequest();
		
  		jax.open('POST', url);
  		jax.setRequestHeader('Content-Type','application/json');
  		jax.setRequestHeader('Accept','application/json')
  		jax.setRequestHeader('Authorization', 'Basic ' + btoa(user));	
  		jax.send(data);
  		jax.onreadystatechange = function() { 
        if(jax.readyState==4) { 
          if(JSON.parse(jax.responseText).result == 'OK') {
            alert('Text pasted at kodi');
          }else{
            alert('Text was not paste at kodi');
          }
        }
      }
  	}else{
  		alert('Configuration needed');
  	}
  });
}

