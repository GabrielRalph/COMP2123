var ctrlpnl;
var waves;

var pre = document.querySelector('pre');
var myScript = document.querySelector('script');

window.addEventListener('load', init, false);
function init() {
  var onswitch = document.querySelector('#switch');
  var wavesIn = document.querySelector('#waves-in');
  onswitch.style.setProperty('--running', '0');
  onswitch.addEventListener('click', function() {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      ctrlpnl = new AudioContext();
      console.log(onswitch.style.getPropertyValue('--running'));
      if(onswitch.style.getPropertyValue('--running') === "0"){
        loadWaves(wavesIn);
        // waves.start(ctrlpnl.currentTime);
        onswitch.style.setProperty('--running', '1');
      }else{
        // waves.stop(ctrlpnl.currentTime);
        onswitch.style.setProperty('--running', '0');
      }
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser' +e);
    }

  });
}

function loadWaves(wavesInp) {
  waves = ctrlpnl.createMediaElementSource(wavesInp);
  var biquadFilter = ctrlpnl.createBiquadFilter();
  biquadFilter.frequency = 80;
  var analyser = ctrlpnl.createAnalyser();
  waves.connect(biquadFilter);
  biquadFilter.connect(analyser);
  analyser.connect(waves);

  // ...

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  waves.connect(ctrlpnl.destination)
}

// wire up buttons to stop and play audio
