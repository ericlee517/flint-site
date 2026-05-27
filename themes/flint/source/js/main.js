(function() {
  'use strict';
  
  const scripts = [
    '/js/countdown.min.js',
    '/js/lazysizes.min.js',
    '/js/script.js',
    '/js/nav-title.js'
  ];
  
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  
  function loadAllScripts() {
    scripts.reduce(function(promise, src) {
      return promise.then(function() {
        return loadScript(src);
      });
    }, Promise.resolve());
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllScripts);
  } else {
    loadAllScripts();
  }
})();
