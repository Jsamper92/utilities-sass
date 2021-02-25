### FRONTECH LIBRARY
Frontech Library tiene como objetivo aportar una serie de utilidades comunes al inicio de cualquier proyecto front asi como determinados mixin que faciliten el desarrollo del dia a dia como puede ser clases de margin, padding, grid, animaciones base y elementos comunes. Para más información lanzar el comando ```npm run start``` y acceder a la documentación en el navegador bajo el puerto ```http://localhost:3000/```.

Para el correcto funcionamiento de la libreria es preciso crear un archivo de configuración en el proyecto llamado ```.frontech.json```, el cual determinara las utilidades de margin, padding y grid custom. Dicha configuración debe mantener la siguiente estructura:
```
{
  "colors": {
    "secondary_3": {
      "value": "rgba(203.00000309944153, 223.00000190734863, 144.00000661611557, 1)",
      "type": "color"
    },
    "secondary_2": {
      "value": "rgba(143.00000667572021, 173.00000488758087, 136.00000709295273, 1)",
      "type": "color"
    },
    "secondary_1": {
      "value": "rgba(127.00000002980232, 156.00000590085983, 150.0000062584877, 1)",
      "type": "color"
    },
    "primary_3": {
      "value": "rgba(155.00000596046448, 193.00000369548798, 219.0000021457672, 1)",
      "type": "color"
    },
    "primary_2": {
      "value": "rgba(20.000000707805157, 131.00000739097595, 187.00000405311584, 1)",
      "type": "color"
    },
    "primary_1": {
      "value": "rgba(0, 102.00000151991844, 153.00000607967377, 1)",
      "type": "color"
    }
  },
  "typography": {
    "Helvetica--Neue--35": {
      "family": {
        "value": "helvetica--Neue--35",
        "type": "typography"
      },
      "weight": {
        "value": 400,
        "type": "typography"
      },
      "style":{
        "value":"normal",
        "type":"typography"
      }
    },
    "Helvetica--Neue--55": {
      "family": {
        "value": "helvetica--Neue--55",
        "type": "typography"
      },
      "weight": {
        "value": 400,
        "type": "typography"
      },
      "style":{
        "value":"normal",
        "type":"typography"
      }
    },
    "Lato-regular": {
      "family": {
        "value": "lato-regular",
        "type": "typography"
      },
      "weight": {
        "value": 400,
        "type": "typography"
      },
      "style":{
        "value":"normal",
        "type":"typography"
      }
    },
    "Gotham-italic": {
      "family": {
        "value": "gotham-italic",
        "type": "typography"
      },
      "weight": {
        "value": 300,
        "type": "typography"
      },
      "style":{
        "value":"italic",
        "type":"typography"
      }
    },
    "icomoon": {
      "family": {
        "value": "icomoon",
        "input": "assets/icons",
        "output": "assets/fonts",
        "type": "typography"
      },
      "weight": {
        "value": "normal",
        "type": "typography"
      },
      "style":{
        "value":"normal",
        "type":"typography"
      }
    }
  },
  "grid": {
    "sm": {
      "gutter": {
        "value": "30px",
        "type": "grid"
      },
      "offset": {
        "value": "50px",
        "type": "grid"
      },
      "columns": {
        "value": 4,
        "type": "grid"
      },
      "width": {
        "value": "360px",
        "type": "grid"
      }
    },
    "md": {
      "gutter": {
        "value": "30px",
        "type": "grid"
      },
      "offset": {
        "value": "50px",
        "type": "grid"
      },
      "columns": {
        "value": 6,
        "type": "grid"
      },
      "width": {
        "value": "768px",
        "type": "grid"
      }
    },
    "lg": {
      "gutter": {
        "value": "30px",
        "type": "grid"
      },
      "offset": {
        "value": "50px",
        "type": "grid"
      },
      "columns": {
        "value": 12,
        "type": "grid"
      },
      "width": {
        "value": "1440px",
        "type": "grid"
      }
    }
  },
  "spacing":{
    "increase":{
        "value": 5,
        "type":"spacing"
    },
    "limit": {
        "value": 20,
        "type":"spacing"
    }
}
}
```

Para la posible utilización de la libreria simplemente será necesario importar en tu hoja de estilos sass el siguiente archivo:

```@use '~frontech-library/library/web/abstracts';```
