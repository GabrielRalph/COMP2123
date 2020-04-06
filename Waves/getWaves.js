// var AudioContext = requi?re('standardized-audio-context');
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
const audio = new Audio();
audio.src = 'http://3.17.56.140:8000/;?type=http&nocache=1';
audio.crossOrigin = 'anonymous';

window.addEventListener('load', ()=> {
  var onswitch = document.getElementById('switch');
  // var audioInput = document.getElementById('audio-input');
  onswitch.style.setProperty('--running', '0.8')
  onswitch.addEventListener('click', ()=>{
    if(onswitch.style.getPropertyValue('--running') === "0.8"){
      onswitch.style.setProperty('--running', '1');
      connectAudio();
    }else if(onswitch.style.getPropertyValue('--running') === "0"){
      audio.play();
      onswitch.style.setProperty('--running', '1');
    }else{
      audio.pause();
      onswitch.style.setProperty('--running', '0');
    }
  })
})
var dataArray;
var lastMax = 0;
connectAudio = function(){
  try{
    document.body.appendChild(audio);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const stream_dest = ctx.destination;
    const source = ctx.createMediaElementSource(audio);
    var biquadFilter = ctx.createBiquadFilter();
    var analyser = ctx.createAnalyser();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency = 80;
    source.connect(stream_dest);
    source.connect(biquadFilter);
    biquadFilter.connect(analyser);
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    audio.load();
    audio.play();
    myBall = new Ball();
    function renderFrame(){
      requestAnimationFrame(renderFrame);
      myBall.updatePos();
      analyser.getByteTimeDomainData(dataArray);
      var sum = 0;
      var max = 0;
      for( var i in dataArray){
        var newV = Math.pow(dataArray[i] - 128, 2);
        max = newV>max?newV:max;
        sum += newV;
      }
      sum = Math.round(Math.sqrt(sum/bufferLength));
      max = Math.round(Math.sqrt(max));
      // myBall.size = sum;
      // myBall.updateElement();
      if((max-lastMax)*sum > 100){
        myBall.yVel = 10;
      }
      myBall.updatePos();
      document.getElementById('log').style.setProperty('--size', sum*10 + 'px')
      lastMax = max;
    }
    renderFrame();
    // window.AudioContext = window.AudioContext||window.webkitAudioContext;
    // ctrlpnl = new AudioContext();
    // var audioIn = ctrlpnl.createMediaStreamSource(audio_in);
    // var analyser = ctrlpnl.createAnalyser();
    // audioIn.connect(biquadFilter);
    // biquadFilter.connect(analyser)


    // var canvas = document.getElementById("canvas");
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // var cctx = canvas.getContext("2d");
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
    //   analyser.getByteTimeDomainData(dataArray);
    //
    //   cctx.fillStyle = "#000";
    //   cctx.fillRect(0, 0, WIDTH, HEIGHT);
    //
    //   for (var i = 0; i < bufferLength; i++) {
    //     barHeight = dataArray[i];
    //
    //     var r = barHeight + (25 * (i/bufferLength));
    //     var g = 250 * (i/bufferLength);
    //     var b = 50;
    //
    //     cctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    //     cctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
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
