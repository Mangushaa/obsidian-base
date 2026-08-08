Randomly choose server.

Is good when we have multiple independent load balancers then in case of round robin during apps startup all will send 1 request to server 1, 2->2... It will increase load on servers and distribution will be broken. But it is very rear cases.