// var ctrlpnl;
// var waves;
//
// var pre = document.querySelector('pre');
// var myScript = document.querySelector('script');
//
// window.addEventListener('load', init, false);
// function init() {
//   var onswitch = document.querySelector('#switch');
//   var wavesIn = document.getElementById('waves-in');
//   onswitch.style.setProperty('--running', '0');
//   onswitch.addEventListener('click', function() {
//     try {
//       // Fix up for prefixing
//       window.AudioContext = window.AudioContext||window.webkitAudioContext;
//       ctrlpnl = new AudioContext();
//       console.log(onswitch.style.getPropertyValue('--running'));
//       if(onswitch.style.getPropertyValue('--running') === "0"){
//         loadWaves(wavesIn);
//         // waves.start(ctrlpnl.currentTime);
//         onswitch.style.setProperty('--running', '1');
//       }else{
//         // waves.stop(ctrlpnl.currentTime);
//         onswitch.style.setProperty('--running', '0');
//       }
//     }
//     catch(e) {
//       alert('Web Audio API is not supported in this browser' +e);
//     }
//
//   });
// }
//
// function loadWaves(wavesInp) {
//   waves = ctrlpnl.createMediaElementSource(wavesInp);
//   var biquadFilter = ctrlpnl.createBiquadFilter();
//   biquadFilter.frequency = 80;
//   biquadFilter.type = "lowpass";
//   var analyser = ctrlpnl.createAnalyser();
//   waves.connect(biquadFilter);
//   biquadFilter.connect(analyser);
//
//
//   // ...
//
//   analyser.fftSize = 2048;
//   var bufferLength = analyser.frequencyBinCount;
//   var dataArray = new Uint8Array(bufferLength);
//   analyser.getByteTimeDomainData(dataArray);
//
//   analyser.connect(ctrlpnl.destination)
// }
//
// // wire up buttons to stop and play audio

window.addEventListener('load', ()=> {
  var onswitch = document.getElementById('switch');
  // var audioInput = document.getElementById('audio-input');
  onswitch.style.setProperty('--running', '0')
  onswitch.addEventListener('click', ()=>{
    if(onswitch.style.getPropertyValue('--running') === "0"){
      // audioInput.play();
      connectAudio();
      onswitch.style.setProperty('--running', '1');
    }else{
      // audioInput.pause();
    onswitch.style.setProperty('--running', '0');
  }
  })
})
var dataArray;

connectAudio = function(){
  try{
    const audio = new Audio();
    audio.src = 'http://192.168.0.233:8000/;?type=http&amp;nocache=1';
    audio.crossOrigin = 'anonymous';
    audio.controls = true;
    document.body.appendChild(audio);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const stream_dest = ctx.createMediaStreamDestination();
    const source = ctx.createMediaElementSource(audio);
    var biquadFilter = ctx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency = 80;
    source.connect(biquadFilter);
    biquadFilter.connect(stream_dest);

    const stream = stream_dest.stream;
    audio.load();
    audio.play();
    // window.AudioContext = window.AudioContext||window.webkitAudioContext;
    // ctrlpnl = new AudioContext();
    // var audioIn = ctrlpnl.createMediaStreamSource(audio_in);
    // var analyser = ctrlpnl.createAnalyser();
    // audioIn.connect(biquadFilter);
    // biquadFilter.connect(analyser)
    //
    // analyser.fftSize = 2048;
    // var bufferLength = analyser.frequencyBinCount;
    // dataArray = new Uint8Array(bufferLength);
    //
    // var canvas = document.getElementById("canvas");
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // var ctx = canvas.getContext("2d");
    //
    //
    // analyser.connect(ctrlpnl.destination);
    //
    // analyser.fftSize = 256;
    //
    // var bufferLength = analyser.frequencyBinCount;
    // console.log(bufferLength);
    //
    // var dataArray = new Uint8Array(bufferLength);
    //
    // var WIDTH = canvas.width;
    // var HEIGHT = canvas.height;
    //
    // var barWidth = (WIDTH / bufferLength) * 2.5;
    // var barHeight;
    // var x = 0;
    //
    // function renderFrame() {
    //   requestAnimationFrame(renderFrame);
    //
    //   x = 0;
    //
    //   analyser.getByteFrequencyData(dataArray);
    //
    //   ctx.fillStyle = "#000";
    //   ctx.fillRect(0, 0, WIDTH, HEIGHT);
    //
    //   for (var i = 0; i < bufferLength; i++) {
    //     barHeight = dataArray[i];
    //
    //     var r = barHeight + (25 * (i/bufferLength));
    //     var g = 250 * (i/bufferLength);
    //     var b = 50;
    //
    //     ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    //     ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    //
    //     x += barWidth + 1;
    //   }
    // }
    //
    // renderFrame();

  }catch(err){
    alert(err)
  }
}
