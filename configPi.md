zmiana splash.png w `/boot/firmware`

instalacja node npm

serwis autostartu aplikacji:
```
# frontend.service
[Unit]
Description=Frontend App
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/twoj-projekt
ExecStart=/usr/bin/npm run build
Restart=always
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```
aktywacja serwisu:
```bash 
sudo systemctl daemon-reload
sudo systemctl enable frontend.service
sudo systemctl start frontend.service
sudo reboot
```