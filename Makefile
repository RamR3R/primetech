server:
    @node server.js

client1:
    @node client.js

client2:
    @node client.js

client3:
    @node client.js

client4:
    @node client.js

client5:
    @node client.js




all: server client1 client2 client3 client4 client5
    @echo "All processes started"

.PHONY: server client1 client2 client3 client4 client5 all
