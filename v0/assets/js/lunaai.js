const audioCtx = new AudioContext();
const numberOfNodes = 1;
const data = new Uint8Array(numberOfNodes * 4);

const elVisualizer = document.querySelector('.visualizer');

const elNodes = Array.from({ length: numberOfNodes }, (n, i) => {
  let node = document.createElement('div');
  node.className = 'node';
  node.style.setProperty('--i', i);
  elVisualizer.appendChild(node);
  return node;
});

const analyserNode = new AnalyserNode(audioCtx, {
  fftSize: Math.max(numberOfNodes * 4, 32),
  maxDecibels: -20,
  minDecibels: -80,
  smoothingTimeConstant: 0.8
});

function updateVisualizer() {
  requestAnimationFrame(updateVisualizer);

  analyserNode.getByteFrequencyData(data);

  elNodes.forEach((node, i) => {
    node.style.setProperty('--c', data[i]);
    node.style.setProperty(
      '--level',
      (data[i] / 255)
      // Attempt a log-ish scale for sensitivity in higher registers
      * (1 + (i / numberOfNodes))
    );
  });


}

function startStream() {
  return navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(stream => audioCtx.createMediaStreamSource(stream))
    .then(source => {
      source.connect(analyserNode);
    }).then(updateVisualizer);

}

// Have to initialize via a user event
document.addEventListener('click', () => {
  audioCtx.resume();
  startStream();
});