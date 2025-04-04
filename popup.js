const slider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

slider.addEventListener("input", () => {
  let speed = parseFloat(slider.value);
  speedValue.textContent = speed.toFixed(1);
  setSpeed(speed);
});

function setSpeed(speed) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (s) => {
        const video = document.querySelector('video');
        if (video) video.playbackRate = s;
      },
      args: [speed]
    });
  });
}
