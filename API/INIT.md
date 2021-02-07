### FRONTECH LIBRARY
Frontech Library tiene como objetivo aportar una serie de utilidades comunes al inicio de cualquier proyecto front asi como determinados mixin que faciliten el desarrollo del dia a dia como puede ser clases de margin,padding,grid, animaciones base y elementos comunes. Para más información revisa la documentación en la ruta ```Frontech Guidelines/index.html```.

Para el correcto funcionamiento de la libreria es preciso crear un archivo de configuración en el proyecto llamado ```.frontech.json```, el cual determinara las utilidades de margin, padding y grid custom. Dicha configuración debe mantener la siguiente estructura:
```
{
  "grid": {
    "sm": {
      "gutter": "30px",
      "offset": "50px",
      "columns": 4,
      "width": "360px"
    },
    "md": {
      "gutter": "30px",
      "offset": "50px",
      "columns": 6,
      "width": "768px"
    },
    "lg": {
      "gutter": "30px",
      "offset": "50px",
      "columns": 12,
      "width": "1440px"
    },
    "xlg": {
      "gutter": "30px",
      "offset": "50px",
      "columns": 12,
      "width": "1920px"
    }
  },
  "spacing": {
    "increase": 5,
    "limit": 20
  }
}
```

Para la posible utilización de la libreria simplemente será necesario importar en tu hoja de estilos sass el siguiente archivo:

```@use '~frontech-library/sass/abstracts.scss';```
