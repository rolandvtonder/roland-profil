@echo off
title Roland Web Design - local preview
cd /d "%~dp0"

echo.
echo   Starting your website...
echo.
echo   Your browser will open by itself in a few seconds.
echo   KEEP THIS BLACK WINDOW OPEN while you look at the site.
echo   Close it when you are done.
echo.

call npm run dev -- --open

echo.
echo   The website has stopped. You can close this window.
pause
