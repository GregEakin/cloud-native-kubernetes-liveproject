# openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=California/L=SoCal/O=eakin.dev/OU=rnd/CN=www.eakin.dev"
openssl req -x509 -sha256 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -nodes -subj "/C=US/ST=California/L=SoCal/O=eakin.dev/OU=rnd/CN=dogbert.library.eakin.dev"
