(function(){
  const audio = document.getElementById('theme');
  if(!audio) return;

  const playBtn   = document.getElementById('playBtn');
  const timeLabel = document.getElementById('time');
  const bar       = document.getElementById('bar');
  const volBtn    = document.getElementById('volBtn');
  const volSlider = document.querySelector('.player-volume');

  const iconPlay  = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const iconVol   = document.getElementById('iconVol');
  const iconMute  = document.getElementById('iconMute');

  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    if(isPlaying){
      audio.pause();
      iconPlay.style.display  = 'block';
      iconPause.style.display = 'none';
    } else {
      audio.play();
      iconPlay.style.display  = 'none';
      iconPause.style.display = 'block';
    }
    isPlaying = !isPlaying;
  });

  volBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    iconVol.style.display  = audio.muted ? 'none' : 'block';
    iconMute.style.display = audio.muted ? 'block' : 'none';
  });

  audio.addEventListener('timeupdate', () => {
    const cur = Math.floor(audio.currentTime);
    const min = Math.floor(cur / 60);
    const sec = cur % 60;
    timeLabel.textContent = `${min}:${sec < 10 ? '0'+sec : sec}`;
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    bar.value = pct;
    updateBar(bar, pct);
  });

  bar.addEventListener('input', () => {
    audio.currentTime = (bar.value / 100) * audio.duration;
    updateBar(bar, bar.value);
  });

  volSlider.addEventListener('input', () => {
    audio.volume = volSlider.value;
    updateBar(volSlider, volSlider.value * 100);
  });

  function updateBar(el, val){
    el.style.setProperty('--progress', val);
  }

  updateBar(bar, 0);
  updateBar(volSlider, 100);
})();