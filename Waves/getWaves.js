var ctrlpnl;
var waves;

// var pre = document.querySelector('pre');
// var myScript = document.querySelector('script');

window.addEventListener('load', init, false);
function init() {
  var onswitch = document.querySelector('#switch');
  onswitch.style.setProperty('--running', '0');
  onswitch.addEventListener('click', function() {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      ctrlpnl = new AudioContext(window.AudioContext);
      console.log(onswitch.style.getPropertyValue('--running'));
      if(onswitch.style.getPropertyValue('--running') === "0"){
        loadWaves('http://192.168.0.233:8000/;?type=http&amp;nocache=1');
        waves.start(ctrlpnl.currentTime);
        onswitch.style.setProperty('--running', '1');
      }else{
        waves.stop(ctrlpnl.currentTime);
        onswitch.style.setProperty('--running', '0');
      }
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser' +e);
    }

  });
}

function loadWaves(url) {
  waves = ctrlpnl.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  // Decode asynchronously
  alert('test: '+url)
  request.onload = function() {
    alert('test onload: ')

    ctrlpnl.decodeAudioData(request.response).then(function(buffer) {
      waves.buffer = buffer;
      waves.connect(ctrlpnl.destination)

    }, (err) => {

      alert('getting audio from '+url)
    });
  }
  request.send();
}

// wire up buttons to stop and play audio
