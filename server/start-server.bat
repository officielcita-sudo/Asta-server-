@echo off
setlocal
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1" -AutoConfirmRegistry %*
endlocal
