#!/bin/bash

# Hexo Theme Turbo Installation Script
# Install hexo-postcss, TailwindCSS v4 and DaisyUI

echo -e "\033[36m  ╭──────────────────────────────────────╮\033[0m"
echo -e "\033[36m  │       Theme Turbo Plugin Install     │\033[0m"
echo -e "\033[36m  │              By Eric Lee             │\033[0m"
echo -e "\033[36m  ╰──────────────────────────────────────╯\033[0m"
echo ""

echo -e "\033[33mThis script will install:\033[0m"
echo -e "  \033[37m1. hexo-postcss\033[0m"
echo -e "  \033[37m2. TailwindCSS v4\033[0m"
echo -e "  \033[37m3. DaisyUI\033[0m"
echo ""

read -p "Continue installation? (Y/N) " confirmation

if [[ "$confirmation" != "Y" && "$confirmation" != "y" ]]; then
    echo -e "\033[31mInstallation cancelled.\033[0m"
    exit 1
fi

echo ""
echo -e "\033[32mStarting installation...\033[0m"
echo ""

# Check if in Hexo project root
if [ ! -f "_config.yml" ]; then
    echo -e "\033[31mError: _config.yml not found. Please run this script in Hexo project root.\033[0m"
    exit 1
fi

# Install hexo-postcss
echo -e "\033[36mInstalling hexo-postcss...\033[0m"
npm install hexo-postcss
if [ $? -ne 0 ]; then
    echo -e "\033[31mhexo-postcss installation failed!\033[0m"
    exit 1
fi
echo -e "\033[32mhexo-postcss installed successfully!\033[0m"

# Install TailwindCSS v4 and DaisyUI
echo ""
echo -e "\033[36mInstalling TailwindCSS v4 and DaisyUI...\033[0m"
npm install tailwindcss @tailwindcss/postcss daisyui
if [ $? -ne 0 ]; then
    echo -e "\033[31mTailwindCSS v4 and DaisyUI installation failed!\033[0m"
    exit 1
fi
echo -e "\033[32mTailwindCSS v4 and DaisyUI installed successfully!\033[0m"

# Create .postcssrc.js file
echo ""
echo -e "\033[36mCreating .postcssrc.js config file...\033[0m"
cat > .postcssrc.js << 'EOF'
module.exports = {
    from: undefined,
    plugins: {
        "@tailwindcss/postcss": {},
    }
}
EOF
echo -e "\033[32m.postcssrc.js config file created successfully!\033[0m"

# Check if theme directory exists
themePath="themes/flint"
if [ ! -d "$themePath" ]; then
    echo ""
    echo -e "\033[33mWarning: themes/flint directory not found. Please create main.css manually.\033[0m"
    echo -e "\033[33mLocation: themes/flint/source/css/main.css\033[0m"
    echo -e "\033[33mContent:\033[0m"
    echo -e '\033[33m@import "tailwindcss";\033[0m'
    echo -e '\033[33m@plugin "daisyui" {\033[0m'
    echo -e '\033[33m    themes: black --default;\033[0m'
    echo -e '\033[33m}\033[0m'
else
    # Create main.css file
    cssPath="$themePath/source/css"
    if [ ! -d "$cssPath" ]; then
        mkdir -p "$cssPath"
    fi
    
    cat > "$cssPath/main.css" << 'EOF'
@import "tailwindcss";
@plugin "daisyui" {
    themes: black --default;
}
EOF
    echo -e "\033[32mmain.css file created successfully!\033[0m"
fi

echo ""
echo -e "\033[36m========================================\033[0m"
echo -e "\033[32m   Installation Complete!\033[0m"
echo -e "\033[36m========================================\033[0m"
echo ""
echo -e "\033[32mSuccessfully installed:\033[0m"
echo -e "  \033[32m[OK] hexo-postcss\033[0m"
echo -e "  \033[32m[OK] TailwindCSS v4\033[0m"
echo -e "  \033[32m[OK] DaisyUI\033[0m"
echo ""
echo -e "\033[32mConfig files created:\033[0m"
echo -e "  \033[32m[OK] .postcssrc.js\033[0m"
echo -e "  \033[32m[OK] themes/flint/source/css/main.css\033[0m"
echo ""
echo -e "\033[33mYou can now run:\033[0m"
echo -e "  \033[37mnpm run build    # Build project\033[0m"
echo -e "  \033[37mnpm run server   # Start server\033[0m"
echo ""
