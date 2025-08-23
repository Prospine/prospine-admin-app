#!/bin/bash
# ProSpine Admin App - Arch Linux Package Builder
# This script automates the entire build and installation process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PACKAGE_NAME="prospine-admin-app"

echo -e "${BLUE}ProSpine Admin App - Arch Package Builder${NC}"
echo "========================================="
echo

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're on Arch Linux
if ! command -v pacman &> /dev/null; then
    print_error "This script requires Arch Linux with pacman package manager"
    exit 1
fi

# Check required dependencies
print_status "Checking build dependencies..."

missing_deps=()
for dep in makepkg npm node; do
    if ! command -v "$dep" &> /dev/null; then
        missing_deps+=("$dep")
    fi
done

if [ ${#missing_deps[@]} -ne 0 ]; then
    print_error "Missing required dependencies: ${missing_deps[*]}"
    print_status "Install them with: sudo pacman -S base-devel npm nodejs"
    exit 1
fi

# Change to archlinux directory
cd "$SCRIPT_DIR"

print_status "Current directory: $(pwd)"
print_status "Project directory: $PROJECT_DIR"

# Parse command line options
INSTALL=false
CLEAN=false
FORCE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--install)
            INSTALL=true
            shift
            ;;
        -c|--clean)
            CLEAN=true
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -i, --install    Install the package after building"
            echo "  -c, --clean      Clean build artifacts before building"
            echo "  -f, --force      Force rebuild even if package exists"
            echo "  -h, --help       Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Clean previous builds if requested
if [ "$CLEAN" = true ]; then
    print_status "Cleaning previous build artifacts..."
    rm -rf pkg/ src/ *.pkg.tar.zst *.log
    cd "$PROJECT_DIR"
    rm -rf dist/ node_modules/.cache
    cd "$SCRIPT_DIR"
fi

# Check if package already exists
PKG_FILE="$PACKAGE_NAME-*.pkg.tar.zst"
if [ "$FORCE" = false ] && ls $PKG_FILE 1> /dev/null 2>&1; then
    print_warning "Package file already exists: $(ls $PKG_FILE)"
    echo "Use -f/--force to rebuild or -i/--install to install existing package"
    
    if [ "$INSTALL" = true ]; then
        print_status "Installing existing package..."
        sudo pacman -U $PKG_FILE --noconfirm
        print_status "Package installed successfully!"
    fi
    exit 0
fi

# Generate .SRCINFO
print_status "Generating .SRCINFO..."
makepkg --printsrcinfo > .SRCINFO

# Build the package
print_status "Starting package build..."
print_status "This may take several minutes as it will:"
print_status "1. Install npm dependencies"
print_status "2. Build the Electron application"
print_status "3. Create the Arch package"
echo

if makepkg -sf --noconfirm; then
    print_status "Package built successfully!"
    
    # List created packages
    echo
    print_status "Created packages:"
    ls -lh *.pkg.tar.zst
    
    # Install if requested
    if [ "$INSTALL" = true ]; then
        echo
        print_status "Installing package..."
        sudo pacman -U $PKG_FILE --noconfirm
        
        print_status "Package installed successfully!"
        print_status "You can now run 'prospine-admin-app' or find it in your application menu"
    else
        echo
        print_status "Package created successfully!"
        print_status "To install, run: sudo pacman -U $(ls $PKG_FILE)"
        print_status "Or run this script with -i flag to build and install in one step"
    fi
    
else
    print_error "Package build failed!"
    print_error "Check the output above for details"
    exit 1
fi

echo
print_status "Build process completed!"
