GOOS=linux GOARCH=amd64 go build -o main main.go

systemctl daemon-reload
sudo systemctl restart tarok.webapi
systemctl status tarok.webapi

nginx -s reload

## Local
go run main.go