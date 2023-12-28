# Assignment 
 This assignment is to establish connection between server and client using websockets and check every 3 secs with client if client-connection alive with PING and PONG messages.

## Installation
```
npm install
```


## 1.) Run all with Server and 5 clients predefined
``` 
npm run all
```
```This runs ip the server side and creates new 5 client connections connected to the server.```




## 2.) Run Server and Client spearately 
### Run Server
``` 
npm run server
```
```This starts up server and creates a server connection at the given port.```

### Run Client 
``` 
npm run client
```
``` This starts up a new client connection connected to the server , Run this command multiple times to start more client connections```