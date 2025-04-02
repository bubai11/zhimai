@echo off
chcp 65001
echo [配置防火墙规则]

REM 删除已存在的规则
netsh advfirewall firewall delete rule name="Node.js Server (TCP-In)"
netsh advfirewall firewall delete rule name="Node.js Port 3000 (TCP-In)"

REM 为 Node.js 添加新规则
netsh advfirewall firewall add rule name="Node.js Server (TCP-In)" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes profile=any protocol=TCP

REM 为端口 3000 添加新规则
netsh advfirewall firewall add rule name="Node.js Port 3000 (TCP-In)" dir=in action=allow protocol=TCP localport=3000 enable=yes profile=any

echo [防火墙规则配置完成]

REM 显示当前规则
echo [当前 Node.js 相关的防火墙规则]
netsh advfirewall firewall show rule name="Node.js Server (TCP-In)"
netsh advfirewall firewall show rule name="Node.js Port 3000 (TCP-In)"

echo [检查网络配置]
echo 1. 检查 IP 配置:
ipconfig | findstr IPv4

echo 2. 检查端口 3000 是否在监听:
netstat -ano | findstr :3000

echo 3. 测试本地连接:
curl -s http://localhost:3000/hello

echo 4. 测试本机 IP 连接:
curl -s http://10.235.68.105:3000/hello

pause 