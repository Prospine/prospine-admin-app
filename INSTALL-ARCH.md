# Installation on Arch Linux

ProSpine Admin App can be installed as a native Arch Linux package for seamless desktop integration.

## Quick Installation

```bash
# Clone the repository
git clone https://github.com/yourcompany/prospine-admin-app.git
cd prospine-admin-app/archlinux

# Build and install in one command
./build-package.sh --install
```

That's it! The application will be:
- ✅ Installed system-wide with proper permissions
- ✅ Available in your application menu as "ProSpine Admin Portal"  
- ✅ Accessible from terminal via `prospine-admin-app` command
- ✅ Manageable with `pacman` like any other package

## What This Does

The automated build process:

1. **Installs build dependencies** (Node.js, npm)
2. **Builds the Electron application** from source
3. **Creates a proper Arch package** (.pkg.tar.zst)
4. **Installs it system-wide** with desktop integration
5. **Sets up icons and menu entries** automatically

## Alternative Installation Methods

### Manual Build
```bash
cd archlinux/
makepkg -si
```

### Install Pre-built Package
```bash
sudo pacman -U prospine-admin-app-*.pkg.tar.zst
```

## Management

```bash
# Check if installed
pacman -Q prospine-admin-app

# Remove application
sudo pacman -R prospine-admin-app

# Update (rebuild and reinstall)
cd archlinux/
./build-package.sh --clean --force --install
```

## Requirements

- Arch Linux with `base-devel` package group
- Node.js and npm (`sudo pacman -S nodejs npm`)

For more details, see [`archlinux/README.md`](archlinux/README.md).
