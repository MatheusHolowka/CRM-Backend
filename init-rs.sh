#!/bin/bash
# Aguarda o MongoDB subir completamente
sleep 5

# Inicializa o Replica Set
mongosh --host localhost:27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --eval "rs.initiate()"