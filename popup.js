document.getElementById('connect').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'connect' }, (response) => {
    document.getElementById('status').textContent = response.status;
  });
});

document.getElementById('disconnect').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'disconnect' }, (response) => {
    document.getElementById('status').textContent = response.status;
  });
});
