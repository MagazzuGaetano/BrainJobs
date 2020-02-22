ENVIRONMENT

Linux:
- Node: v11.15.0
- NPM: 6.9.2

Windows:
- Node: v10.16.0
- NPM: 6.9.0
--------------------------------------------------------------------------------
INSTALL & START

Script Unix: start.sh
Script Batch: start.bat

Gli script sono stati testati più volte. Nel caso dovesse verificarsi qualche 
errore abbiamo riportato sotto come eseguire ogni singolo progetto.
(cd cartella && npm install && npm start)
--------------------------------------------------------------------------------
IMPLEMENTAZIONE & AGGIUNTE

- Nel db sqlite sono gia presenti dei dati 
- Autenticazione tramite Token (JWT) senza ruoli
- Gestione utenti (Registrazione, Login, Cancellazione, Visualizzazione)
- Il gateway verifica la validità del token, tutte le richieste che arrivano al 
  backend sono autenticate.
- Gateway job-centric
- Backend user-centric
- Credenziali Admin: username=admin, email=admin@admin.it password=1234
--------------------------------------------------------------------------------
BACKEND

Port: 8080
Framework: Express
Database: Sqlite
ORM: Sequelize

Install and Start
$ cd backend
$ npm install
$ npm start <force>  // force: true = recreate db with some data (default false)
--------------------------------------------------------------------------------
GATEWAY

Port: 8081
Framework: Express
RestClient: Axios

Install and Start
$ cd api_gateway
$ npm install
$ npm start
--------------------------------------------------------------------------------
FRONTEND

Port: 3000
Framework: React
CSS Framework: Bulma.io

Install and Start
$ cd frontend
$ npm install
$ npm start
--------------------------------------------------------------------------------
