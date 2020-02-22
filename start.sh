#!/bin/bash
(cd backend && npm install && npm start) &
(cd api_gateway && npm install && npm start) &
(cd frontend && npm install && BROWSER=none npm start)
