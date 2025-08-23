// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    const webview = document.getElementById('webview');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    const homeUrl = 'https://www.prospine.in/admin';
    
    // Webview event listeners
    webview.addEventListener('did-start-loading', function() {
        console.log('Started loading');
        loadingMessage.style.display = 'flex'; // Show loading message
        errorMessage.style.display = 'none'; // Hide error message
    });
    
    webview.addEventListener('did-stop-loading', function() {
        console.log('Stopped loading');
        loadingMessage.style.display = 'none'; // Hide loading message
    });
    
    webview.addEventListener('did-fail-load', function(event) {
        console.error('Failed to load:', event);
        loadingMessage.style.display = 'none'; // Hide loading message
        errorMessage.style.display = 'flex'; // Show error message
    });
    
    // Create the context menu
    // Note: The 'remote' module is deprecated, but for this simple use case
    // it's the most straightforward approach. For production, you'd use IPC.
    const { Menu, MenuItem } = require('@electron/remote');
    
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'Back', click: () => webview.goBack(), enabled: false }));
    menu.append(new MenuItem({ label: 'Forward', click: () => webview.goForward(), enabled: false }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Reload', click: () => webview.reload() }));
    menu.append(new MenuItem({ label: 'Go Home', click: () => webview.loadURL(homeUrl) }));
    
    // Show the context menu on right-click
    webview.addEventListener('context-menu', (e) => {
        e.preventDefault();
        
        // Update menu item states before showing
        menu.items[0].enabled = webview.canGoBack();
        menu.items[1].enabled = webview.canGoForward();
        
        menu.popup();
    });
    
    // Handle new window requests (open in external browser)
    webview.addEventListener('new-window', function(e) {
        e.preventDefault();
        require('electron').shell.openExternal(e.url);
    });
    
    // Security: Handle permission requests
    webview.addEventListener('permission-request', function(e) {
        if (e.permission === 'notifications' || e.permission === 'geolocation') {
            e.request.allow();
        } else {
            e.request.deny();
        }
    });
    
    webview.addEventListener('certificate-error', function(e) {
        console.warn('Certificate error:', e.error);
    });
    
    console.log('Renderer script loaded');
});