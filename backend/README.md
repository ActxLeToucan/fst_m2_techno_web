# API
## Configuration
Créer un fichier `local-development.yml` ou `local-production.yml` dans le dossier [config](./config).
Complétez-le pour écraser les valeurs de la [config par défaut](config/default.yml).

## Développement
Dupliquer le fichier [`docker-compose.dev.yml.dist`](docker-compose.dev.yml.dist) en `docker-compose.dev.yml`.\
Modifier les informations de connexion à la base de données si besoin.

### Installation des dépendances
Exécuter la commande ```npm ci```.

Ajouter le cli nest : ```npm i -g @nestjs/cli```

### Lancement du projet
Exécuter la commande ```npm run start:dev:db``` pour lancer la base de données.

Exécuter la commande ```npm run start:dev```.\
L'application va tourner en mode watch, et sera accessible à l'adresse `{server.host}:{server.port}` (cf. [config](config)).

## Déploiement
### Build simple
Exécutez :
```
# sur linux
export NODE_ENV=production
# sur windows, avec cmd
SET NODE_ENV=production
# sur windows, avec powershell
$env:NODE_ENV="production"

# ensuite, pour tout le monde
npm ci --omit=dev
npm run build
npm run start:prod
```

### Docker
Exemple de config pour docker (fichier `config/local-production.yml`):
```yml
mongodb:
  uri: "mongodb://root:motdepasse@mongo:27017/truckManager?authSource=admin"
```

Dupliquer le fichier [`docker-compose.yml.dist`](docker-compose.yml.dist), le renommer en `docker-compose.yml`.\
Configurer les variables d'environnement manquantes, et si besoin, modifier la configuration.

Exécuter la commande ```npm run prod``` pour construire et lancer l'image docker de l'application.

## Documentation
La documentation (OpenAPI) est disponible après le lancement du serveur à l'adresse `{server.host}:{server:port}/docs`.
