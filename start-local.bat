@echo off
echo Установка зависимостей (если их еще нет)...
call npm install
echo Запуск локального сервера...
start "" cmd /c "timeout /t 5 >nul && start http://localhost:3000"
npm run dev
pause
