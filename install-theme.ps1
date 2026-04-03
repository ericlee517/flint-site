# Hexo Theme Turbo Installation Script
# Install hexo-postcss, TailwindCSS v4 and DaisyUI

Write-Host "  ╭──────────────────────────────────────╮" -ForegroundColor Cyan
Write-Host "  │       Theme Turbo Plugin Install     │" -ForegroundColor Cyan
Write-Host "  │              By Eric Lee             │" -ForegroundColor Cyan
Write-Host "  ╰──────────────────────────────────────╯" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will install:" -ForegroundColor Yellow
Write-Host "  1. hexo-postcss" -ForegroundColor White
Write-Host "  2. TailwindCSS v4" -ForegroundColor White
Write-Host "  3. DaisyUI" -ForegroundColor White
Write-Host ""

$confirmation = Read-Host "Continue installation? (Y/N)"

if ($confirmation -ne "Y" -and $confirmation -ne "y") {
    Write-Host "Installation cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Starting installation..." -ForegroundColor Green
Write-Host ""

if (-not (Test-Path "_config.yml")) {
    Write-Host "Error: _config.yml not found. Please run this script in Hexo project root." -ForegroundColor Red
    exit
}

Write-Host "Installing hexo-postcss..." -ForegroundColor Cyan
npm install hexo-postcss
if ($LASTEXITCODE -ne 0) {
    Write-Host "hexo-postcss installation failed!" -ForegroundColor Red
    exit
}
Write-Host "hexo-postcss installed successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "Installing TailwindCSS v4 and DaisyUI..." -ForegroundColor Cyan
npm install tailwindcss @tailwindcss/postcss daisyui
if ($LASTEXITCODE -ne 0) {
    Write-Host "TailwindCSS v4 and DaisyUI installation failed!" -ForegroundColor Red
    exit
}
Write-Host "TailwindCSS v4 and DaisyUI installed successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "Creating .postcssrc.js config file..." -ForegroundColor Cyan
$postcssConfig = 'module.exports = {
    from: undefined,
    plugins: {
        "@tailwindcss/postcss": {},
    }
}'
Set-Content -Path ".postcssrc.js" -Value $postcssConfig -Encoding UTF8
Write-Host ".postcssrc.js config file created successfully!" -ForegroundColor Green

$themePath = "themes/flint"
if (-not (Test-Path $themePath)) {
    Write-Host ""
    Write-Host "Warning: themes/flint directory not found. Please create main.css manually." -ForegroundColor Yellow
    Write-Host "Location: themes/flint/source/css/main.css" -ForegroundColor Yellow
    Write-Host "Content:" -ForegroundColor Yellow
    Write-Host '@import "tailwindcss";' -ForegroundColor Yellow
    Write-Host '@plugin "daisyui" {' -ForegroundColor Yellow
    Write-Host '    themes: black --default;' -ForegroundColor Yellow
    Write-Host '}' -ForegroundColor Yellow
} else {
    $cssPath = "$themePath/source/css"
    if (-not (Test-Path $cssPath)) {
        New-Item -ItemType Directory -Path $cssPath -Force | Out-Null
    }
    
    $mainCssContent = '@import "tailwindcss";
@plugin "daisyui" {
    themes: black --default;
}'
    Set-Content -Path "$cssPath/main.css" -Value $mainCssContent -Encoding UTF8
    Write-Host "main.css file created successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Successfully installed:" -ForegroundColor Green
Write-Host "  [OK] hexo-postcss" -ForegroundColor Green
Write-Host "  [OK] TailwindCSS v4" -ForegroundColor Green
Write-Host "  [OK] DaisyUI" -ForegroundColor Green
Write-Host ""
Write-Host "Config files created:" -ForegroundColor Green
Write-Host "  [OK] .postcssrc.js" -ForegroundColor Green
Write-Host "  [OK] themes/flint/source/css/main.css" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run:" -ForegroundColor Yellow
Write-Host "  npm run build    # Build project" -ForegroundColor White
Write-Host "  npm run server   # Start server" -ForegroundColor White
Write-Host ""