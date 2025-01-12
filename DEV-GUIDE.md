# Angular Udviklingsguide

## Extensions

Tilføj `Angular Essentials` fra John Papa til vs code

## Fjern Spec test Filer

Update til `angular.json` for at undgå .spec / test filer blive genereret:

```json
"schematics": {
  "@schematics/angular:component": {
    "skipTests": true
  },
  "@schematics/angular:service": {
    "skipTests": true
  }
}
```

## Prettier Konfiguration

Bruges Prettier. Lav en `.prettierrc` fil for at øge linjebredden fra 80 til fx 120 \#We in da future with big monitors!:

```json
{
  "printWidth": 120
}
```

## Installér Angular Material

Installer Angular Material:

```sh
ng add @angular/material
```

## Opret Environment Filer

```sh
ng generate environments
```

[AngularDocs: Environments](https://angular.dev/tools/cli/environments#)

## Components

Husk at tilføje `RouterLink` og `RouterLinkActive` til imports for at bruge dem i html filen.

Samme gælder for dvs modules der bruges fra Angular Materials.

Tilføj paths til components i `app.routes`.

### Navbar Component

```sh
ng generate component components/navbar/navbar
```

### Home

```sh
ng generate c pages/home/home
```

### Login

```sh
ng generate c pages/login/login
```

### 404 Not found

```sh
ng g c pages/page-not-found/page-not-found
```

### Guard

```sh
ng g g core/guards/auth
```

### Interceptor

```sh
ng g interceptor core/interceptors/auth
```

[YouTube: Short Interceptor](https://www.youtube.com/watch?v=I27bRQC5gEY)

[AngularDocs: Inject](https://angular.dev/guide/di/dependency-injection-context)

[AngularDocs: Signals](https://angular.dev/guide/signals)

[AngularDocs: Routes](https://angular.dev/guide/routing/common-router-tasks)
