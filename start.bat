@echo off
echo ========================================
echo    Sistema de Agenda de Contactos
echo ========================================
echo.
echo Iniciando la aplicacion...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si las dependencias están instaladas
if not exist "node_modules" (
    echo Instalando dependencias del servidor...
    npm install
)

if not exist "client\node_modules" (
    echo Instalando dependencias del cliente...
    cd client
    npm install
    cd ..
)

echo.
echo Dependencias verificadas. Iniciando aplicacion...
echo.
echo El servidor se ejecutara en: http://localhost:5000
echo El cliente se ejecutara en: http://localhost:3000
echo.
echo Presiona Ctrl+C para detener la aplicacion
echo.

REM Iniciar la aplicación
npm run dev

pause
