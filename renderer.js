document.addEventListener('DOMContentLoaded', () => {
  const webview = document.getElementById('webview');
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const homeUrl = 'https://www.prospine.in/admin';

  // Loading states
  webview.addEventListener('did-start-loading', () => {
    loadingMessage.style.display = 'flex';
    errorMessage.style.display = 'none';
  });

  webview.addEventListener('did-stop-loading', () => {
    loadingMessage.style.display = 'none';
  });

  webview.addEventListener('did-fail-load', (event) => {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'flex';
  });

  // Right-click context menu (using IPC instead of @electron/remote)
  webview.addEventListener('context-menu', (e) => {
    e.preventDefault();
    const template = [
      { label: 'Back', click: () => window.electronAPI.webviewAction('back') },
      { label: 'Forward', click: () => window.electronAPI.webviewAction('forward') },
      { type: 'separator' },
      { label: 'Reload', click: () => window.electronAPI.webviewAction('reload') },
      { label: 'Go Home', click: () => window.electronAPI.webviewAction('home') }
    ];
    // simple browser-style menu
    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    menu.style.background = '#fff';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '5px';
    menu.style.zIndex = 9999;

    template.forEach(item => {
      if (item.type === 'separator') {
        const hr = document.createElement('hr');
        menu.appendChild(hr);
      } else {
        const btn = document.createElement('div');
        btn.innerText = item.label;
        btn.style.cursor = 'pointer';
        btn.style.padding = '4px 8px';
        btn.addEventListener('click', () => {
          item.click();
          document.body.removeChild(menu);
        });
        menu.appendChild(btn);
      }
    });

    document.body.appendChild(menu);

    document.addEventListener('click', () => {
      if (menu.parentNode) document.body.removeChild(menu);
    }, { once: true });
  });

  // Handle new window requests safely
  webview.addEventListener('new-window', (e) => {
    e.preventDefault();
    window.open(e.url, '_blank'); // will be caught by main -> external
  });

  // Permission requests: only allow certain types
  webview.addEventListener('permission-request', (e) => {
    if (['notifications', 'geolocation'].includes(e.permission)) {
      e.request.allow();
    } else {
      e.request.deny();
    }
  });
});
