# cs-onboarding

## Project setup

### Generate keys
```bash
cd server/src
mkdir keys
cd keys
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem -subj "/C=EG/ST=Cairo/L=Cairo/O=Codescalers/OU=IT/CN=calc"
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

```

### Run
```bash
docker-compose up
```

# server side
```
cd server
```

## Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Testing
```
export NODE_TLS_REJECT_UNAUTHORIZED='0'
npm run test
```

# client side (vue.js)
```
cd client
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

# client side (svelte)
```
cd svelte-client
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```




