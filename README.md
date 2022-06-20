# cs-onboarding

## Run
```
docker-compose up
```

## run with kubernetes
```
kubectl port-forward server-6b5789b94d-drghf 3000:3000
kubectl port-forward client-6c6bf78bd-kc74h 8085:8085
kubectl port-forward svelte-7944f6f5b9-xcfnp 8080:8080
```

## helm
```
helm install calculator --dry-run --debug ./chart 

export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}");
export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services svelte-service)
echo http://$NODE_IP:$NODE_PORT

export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}");
export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services vue-service)
echo http://$NODE_IP:$NODE_PORT

export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}");
export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services server-service)
echo http://$NODE_IP:$NODE_PORT
```

## Project setup

### Generate keys (for manual run)
```bash
cd server/src
mkdir keys
cd keys
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem -subj "/C=EG/ST=Cairo/L=Cairo/O=Codescalers/OU=IT/CN=calc"
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

```

# server side
```
cd server
```
[How to run the server side](/server/README.md)


# client side (vue.js)
```
cd client
```
[How to run the client vue side](/client/README.md)


# client side (svelte)
```
cd svelte-client
```
[How to run the client svelte side](/svelte-client/README.md)





