# ProSpine Admin App - Arch Linux Package

This directory contains everything needed to build and install ProSpine Admin App as a native Arch Linux package.

## Quick Install (Recommended)

The easiest way to build and install the package is using the automated build script:

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/yourcompany/prospine-admin-app.git
cd prospine-admin-app/archlinux

# Build and install in one command
./build-package.sh --install
```

## Manual Installation

If you prefer to do it step by step:

### Prerequisites

Make sure you have the required build dependencies:

```bash
sudo pacman -S base-devel nodejs npm
```

### Building the Package

```bash
cd archlinux/
makepkg -si
```

This will:
1. Install npm dependencies
2. Build the Electron application
3. Create the Arch package
4. Install it automatically (`-i` flag)

### Installing a Pre-built Package

If you already have a built package file:

```bash
sudo pacman -U prospine-admin-app-*.pkg.tar.zst
```

## Build Script Options

The `build-package.sh` script supports several options:

```bash
./build-package.sh [OPTIONS]

Options:
  -i, --install    Install the package after building
  -c, --clean      Clean build artifacts before building  
  -f, --force      Force rebuild even if package exists
  -h, --help       Show help message
```

### Examples

```bash
# Just build the package
./build-package.sh

# Build and install
./build-package.sh --install

# Clean previous builds and rebuild
./build-package.sh --clean --force --install

# Install existing package without rebuilding
./build-package.sh --install
```

## What Gets Installed

The package installs the following:

- **Application**: `/opt/prospine-admin-app/`
- **Executable symlink**: `/usr/bin/prospine-admin-app`
- **Desktop entry**: `/usr/share/applications/prospine-admin-app.desktop`
- **Application icon**: `/usr/share/icons/hicolor/256x256/apps/prospine-admin-app.png`
- **Documentation**: `/usr/share/doc/prospine-admin-app/`
- **License**: `/usr/share/licenses/prospine-admin-app/`

## Usage After Installation

Once installed, you can:

### Launch from Application Menu
Look for "ProSpine Admin Portal" in your application launcher/menu.

### Launch from Terminal
```bash
prospine-admin-app
```

### Manage with Pacman
```bash
# Check if installed
pacman -Q prospine-admin-app

# Remove the application
sudo pacman -R prospine-admin-app

# Get package information
pacman -Qi prospine-admin-app
```

## Troubleshooting

### Build Fails with Node/NPM Errors
Make sure you have the latest versions of Node.js and npm:
```bash
sudo pacman -S nodejs npm
```

### Missing Dependencies Error
Install build dependencies:
```bash
sudo pacman -S base-devel
```

### Icon Not Showing
The icon cache should update automatically, but you can force it:
```bash
sudo gtk-update-icon-cache /usr/share/icons/hicolor/
sudo update-desktop-database /usr/share/applications/
```

Then restart your desktop environment or log out and back in.

### Application Won't Start
Check if all runtime dependencies are installed:
```bash
sudo pacman -S gtk3 libxss nss alsa-lib libxrandr libxcomposite libxdamage libxfixes ca-certificates
```

## For Developers

### Updating the Package
1. Update version in `../package.json`
2. Update `pkgver` in `PKGBUILD` if needed (or let `pkgver()` function handle it)
3. Update `pkgrel` in `PKGBUILD` for packaging changes
4. Rebuild: `./build-package.sh --clean --force`

### Adding to AUR
This package is ready for submission to the Arch User Repository (AUR):

1. The `.SRCINFO` file is automatically generated
2. All standard Arch packaging guidelines are followed
3. Post-install hooks handle desktop integration

### File Structure
```
archlinux/
├── PKGBUILD              # Main package build script
├── .SRCINFO              # Generated package metadata
├── build-package.sh      # Automated build script
├── README.md            # This file
└── .gitignore           # Ignore build artifacts
```

## Contributing

When contributing to the packaging:

1. Follow the [Arch Package Guidelines](https://wiki.archlinux.org/title/Arch_package_guidelines)
2. Test the package on a clean Arch system
3. Update version numbers appropriately
4. Ensure all dependencies are correct

## Support

For packaging issues, please open an issue on the main repository.
For application issues, refer to the main project documentation.
