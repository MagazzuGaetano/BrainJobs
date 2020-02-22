@echo off

:start
cls
echo BrainJobs

start backend.bat
start gateway.bat
start frontend.bat

pause
