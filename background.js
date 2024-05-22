chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'connect') {
      setProxy('212.110.188.207', '34405', sendResponse);
      return true; // Keep the message channel open for sendResponse
    } else if (request.action === 'disconnect') {
      clearProxy(sendResponse);
      return true; // Keep the message channel open for sendResponse
    }
  });
  
  function setProxy(host, port, sendResponse) {
    const config = {
      mode: 'fixed_servers',
      rules: {
        singleProxy: {
          scheme: 'http',
          host: host,
          port: parseInt(port)
        }
      }
    };
  
    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      () => {
        if (chrome.runtime.lastError) {
          sendResponse({ status: 'Failed to connect to proxy.' });
        } else {
          sendResponse({ status: 'Connected to proxy.' });
        }
      }
    );
  }
  
  function clearProxy(sendResponse) {
    chrome.proxy.settings.clear({ scope: 'regular' }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ status: 'Failed to disconnect from proxy.' });
      } else {
        sendResponse({ status: 'Disconnected from proxy.' });
      }
    });
  }
  
