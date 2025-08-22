# ProSpine Admin Portal - Desktop App

An Electron desktop application that provides a dedicated interface for the ProSpine Admin Portal at www.prospine.in/admin.

## Features

- **Clean Desktop Interface**: Native desktop application wrapper for the ProSpine admin portal
- **Navigation Controls**: Back, forward, refresh, and home buttons for easy navigation
- **URL Display**: Shows current page URL in the address bar
- **Security**: Proper security settings with webview isolation
- **External Link Handling**: Opens external links in the default browser
- **Error Handling**: Displays connection errors and loading states
- **Responsive Design**: Adjusts to different window sizes

## Project Structure

```
prospine-admin-app/
├── main.js           # Main Electron process
├── index.html        # App interface with webview
├── renderer.js       # Frontend JavaScript for webview controls
├── package.json      # Project configuration
└── README.md         # This file
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd prospine-admin-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Development Mode
```bash
npm run dev
```
This runs the app with additional logging enabled.

### Production Mode
```bash
npm start
```
This runs the app normally.

## Technical Details

### Security Features
- **Node Integration Disabled**: Prevents Node.js access from the webview
- **Context Isolation**: Isolates the main world and isolated world contexts
- **Web Security Enabled**: Standard web security policies apply
- **Content Security Policy**: Restricts resource loading to trusted sources

### Navigation Features
- **Back/Forward Navigation**: Browser-like navigation controls
- **Refresh**: Reload the current page
- **Home Button**: Quick return to the main admin portal
- **URL Bar**: Displays current location (read-only)

### Error Handling
- Connection failures are displayed with user-friendly messages
- Loading states are indicated with visual feedback
- Certificate errors are logged for debugging

## Customization

### Changing the Target URL
To point the app to a different URL, modify the `homeUrl` variable in `renderer.js`:

```javascript
const homeUrl = 'https://your-new-url.com';
```

Also update the initial src in `index.html`:

```html
<webview id="webview" src="https://your-new-url.com" ...>
```

### Window Settings
Modify window dimensions and other properties in `main.js`:

```javascript
mainWindow = new BrowserWindow({
  width: 1200,    // Change window width
  height: 800,    // Change window height
  // ... other options
});
```

### Styling
The app's appearance can be customized by editing the CSS in `index.html`.

## Development Notes

- The app uses Electron's webview tag to embed the ProSpine admin portal
- All external navigation opens in the system's default browser
- Console messages from the webview are logged to the main app console
- The app handles both in-page navigation and full page navigation events

## System Requirements

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **Operating System**: Windows, macOS, or Linux

## Troubleshooting

### Common Issues

1. **App won't start**: Ensure Electron is properly installed with `npm install`
2. **Webview not loading**: Check internet connection and firewall settings
3. **Navigation not working**: Ensure the target website allows iframe embedding

### Debug Mode
Run with debug logging:
```bash
npm run dev
```

### Console Access
Open Developer Tools in the app (uncomment the line in `main.js`):
```javascript
mainWindow.webContents.openDevTools();
```

## License

ISC License - See package.json for details.

## Created By

This desktop app provides a native interface for the ProSpine Admin Portal.
ProSpine © 2025 - Created by Sumit Srivastava.
# prospine-admin-app
# prospine-admin-app
