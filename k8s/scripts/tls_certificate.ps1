openssl req -x509 -sha256 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -nodes -subj "/C=US/ST=California/L=SoCal/O=eakin.dev/OU=rnd/CN=localhost"
