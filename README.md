# cs-onboarding

## Project setup

## Generate keys
```
cd server/src
```

```
mkdir keys
```

```
cd keys
```

```
openssl genrsa -out key.pem
```

```
openssl req -new -key key.pem -out csr.pem -subj "/C=EG/ST=Cairo/L=Cairo/O=Codescalers/OU=IT/CN=calc"

```

```
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

## Run
```
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
npm run test
```

# client side
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




