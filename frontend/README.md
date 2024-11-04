# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Prod
Copy the file `./src/environments/environment.prod.ts.dist` to `./src/environments/environment.prod.ts` and set your own `apiBaseUrl`.

### With Docker
Copy the file `./docker-compose.yml.dist` to `./docker-compose.yml` and change the config if needed.

Run `docker compose up --build -d`

### Without Docker
Run:
```
npm run build -- --configuration production
npm run serve:ssr:frontend
```
