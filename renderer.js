// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    const webview = document.getElementById('webview');
    const backBtn = document.getElementById('backBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const urlBar = document.getElementById('urlBar');
    const homeBtn = document.getElementById('homeBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    const homeUrl = 'https://www.prospine.in/admin';
    
    // Initialize buttons as disabled
    backBtn.disabled = true;
    forwardBtn.disabled = true;
    
    // Webview event listeners
    webview.addEventListener('dom-ready', function() {
        console.log('Webview DOM ready');
        updateNavigationButtons();
    });
    
    webview.addEventListener('did-start-loading', function() {
        console.log('Started loading');
        refreshBtn.disabled = true;
        refreshBtn.textContent = '⟳';
        errorMessage.style.display = 'none';
    });
    
    webview.addEventListener('did-stop-loading', function() {
        console.log('Stopped loading');
        refreshBtn.disabled = false;
        updateNavigationButtons();
        updateUrlBar();
    });
    
    webview.addEventListener('did-fail-load', function(event) {
        console.error('Failed to load:', event);
        errorMessage.style.display = 'block';
        refreshBtn.disabled = false;
    });
    
    webview.addEventListener('did-navigate', function(event) {
        console.log('Navigated to:', event.url);
        updateNavigationButtons();
        updateUrlBar();
    });
    
    webview.addEventListener('did-navigate-in-page', function(event) {
        console.log('Navigated in page to:', event.url);
        updateNavigationButtons();
        updateUrlBar();
    });
    
    webview.addEventListener('page-title-updated', function(event) {
        document.title = `${event.title} - ProSpine Admin`;
    });
    
    // Navigation functions
    function updateNavigationButtons() {
        if (webview) {
            backBtn.disabled = !webview.canGoBack();
            forwardBtn.disabled = !webview.canGoForward();
        }
    }
    
    function updateUrlBar() {
        if (webview) {
            urlBar.value = webview.getURL();
        }
    }
    
    // Global functions for button clicks
    window.goBack = function() {
        if (webview && webview.canGoBack()) {
            webview.goBack();
        }
    };
    
    window.goForward = function() {
        if (webview && webview.canGoForward()) {
            webview.goForward();
        }
    };
    
    window.refreshPage = function() {
        if (webview) {
            webview.reload();
        }
    };
    
    window.goHome = function() {
        if (webview) {
            webview.loadURL(homeUrl);
        }
    };
    
    // Handle webview console messages for debugging
    webview.addEventListener('console-message', function(e) {
        console.log('Webview console:', e.message);
    });
    
    // Handle new window requests (open in external browser)
    webview.addEventListener('new-window', function(e) {
        e.preventDefault();
        require('electron').shell.openExternal(e.url);
    });
    
    // Security: Handle permission requests
    webview.addEventListener('permission-request', function(e) {
        // Allow notifications and other safe permissions
        if (e.permission === 'notifications' || e.permission === 'geolocation') {
            e.request.allow();
        } else {
            e.request.deny();
        }
    });
    
    // Handle certificate errors
    webview.addEventListener('certificate-error', function(e) {
        console.warn('Certificate error:', e.error);
        // You might want to show a warning to the user here
    });
    
    console.log('Renderer script loaded');
});
