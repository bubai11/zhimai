@echo off
chcp 65001
echo [网络连接测试]

echo 1. 测试本地回环:
ping -n 4 127.0.0.1

echo 2. 测试本机 IP:
ping -n 4 10.235.68.105

echo 3. 检查端口 3000:
netstat -ano | findstr :3000

echo 4. 测试 HTTP 连接:
echo 测试本地回环:
curl -v http://127.0.0.1:3000/hello
echo.
echo 测试本机 IP:
curl -v http://10.235.68.105:3000/hello

echo 5. 检查防火墙状态:
netsh advfirewall show allprofiles

echo 6. 显示活动的网络连接:
netsh interface ipv4 show interfaces

pause 