(function() {
  'use strict';
  
  const navTitleText = document.getElementById('nav-title-text');
  
  if (navTitleText) {
    const titleObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          console.log('导航标题已更新:', navTitleText.textContent);
        }
      });
    });
    
    titleObserver.observe(navTitleText, {
      childList: true,
      subtree: true
    });
  }
  
  const navTitle = document.querySelector('.nav-title');
  if (navTitle) {
    navTitle.addEventListener('click', function(e) {
      const startTime = performance.now();
      
      requestAnimationFrame(function() {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > 100) {
          console.warn('标题切换响应时间超过100ms:', duration.toFixed(2) + 'ms');
        } else {
          console.log('标题切换响应时间:', duration.toFixed(2) + 'ms');
        }
      });
    });
  }
  
  console.log('导航标题功能已初始化');
  console.log('当前页面:', window.location.pathname);
  console.log('导航标题:', navTitleText ? navTitleText.textContent : '未找到');
})();
