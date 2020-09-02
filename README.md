# Simple Blockchain

## Description
A simple blockchain implemented in nodejs.

## Dev Setup
- Run `npm install`
- Enter `npm run dev`: It will start a new webserver at port 3001 and a new peer2peer server at port 5001
- Ports can be configured by using environment variables:
    - Type `HTTP_PORT={HTTP_PORT} P2P_PORT={PEER_TO_PEER_PORT} npm run dev`
- Multiple nodes can be created by running `npm run dev` multiple times by providing different PORTS for each server.
- To make the peer2peer servers communicate with each other, pass PEERS environment variable while creating new nodes:
    - Type `HTTP_PORT={HTTP_PORT} P2P_PORT={PEER_TO_PEER_PORT} PEERS={LIST_OF_PEER_SOCKETS} npm run dev`

## Available API endpoints
- `/blocks` : Get the current blockchain across the network
- `/mine`   : Mine a new block to the blockchain

