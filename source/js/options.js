function save_options() {
  var ip = document.getElementById('ip').value;
  var port = document.getElementById('port').value;
  var user = document.getElementById('user').value;
  var pass = document.getElementById('pass').value;

  chrome.storage.sync.set({
    kodiIp: ip,
    kodiPort: port,
    kodiUser: user,
    kodiPass: pass
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  chrome.storage.sync.get(['kodiIp','kodiPort','kodiUser','kodiPass'], function(items) {
    if(items.kodiIp) {
      document.getElementById('ip').value = items.kodiIp;
    }
    if(items.kodiPort) {
      document.getElementById('port').value = items.kodiPort;
    }
    if(items.kodiUser) {
      document.getElementById('user').value = items.kodiUser;
    }
    if(items.kodiPass) {
      document.getElementById('pass').value = items.kodiPass;
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);