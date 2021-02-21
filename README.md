### FRONTECH LIBRARY
Frontech Library tiene como objetivo aportar una serie de utilidades comunes al inicio de cualquier proyecto front asi como determinados mixin que faciliten el desarrollo del dia a dia como puede ser clases de margin,padding,grid, animaciones base y elementos comunes. Para más información lanzar el comando ```npm run start```.

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
 <a id="colors-css-:root"></a>

# css:root

 Variable de color definida en el archivo .frontech.json

+ **Group:** Colors
+ **Access:** public

<a id="grid-variable-breakpoints"></a>

# $breakpoints

Mapa creado dinamicamente en base al fichero de configuración. Define los puntos de ruptura de los distintos breakpoints

+ **Group:** Grid
+ **Access:** public

## Type

**[Map](https://sass-lang.com/documentation/values/maps)**

<a id="media-queries-mixin-screen-sm"></a>

# @mixin screen-sm

Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración

+ **Group:** Media-queries
+ **Access:** public

## Examples

```scss
.test{
   width: 100%;
   @include screen-sm(){
     width: auto;
   }
}
```

```css
.test {
   width: 100%;
 }

@media only screen and (min-width: [object Object]) {
   .test {
     width: auto;
   }
}
```

<a id="media-queries-mixin-screen-md"></a>

# @mixin screen-md

Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración

+ **Group:** Media-queries
+ **Access:** public

## Examples

```scss
.test{
   width: 100%;
   @include screen-md(){
     width: auto;
   }
}
```

```css
.test {
   width: 100%;
 }

@media only screen and (min-width: [object Object]) {
   .test {
     width: auto;
   }
}
```

<a id="media-queries-mixin-screen-lg"></a>

# @mixin screen-lg

Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración

+ **Group:** Media-queries
+ **Access:** public

## Examples

```scss
.test{
   width: 100%;
   @include screen-lg(){
     width: auto;
   }
}
```

```css
.test {
   width: 100%;
 }

@media only screen and (min-width: [object Object]) {
   .test {
     width: auto;
   }
}
```

<a id="media-queries-mixin-screen-xlg"></a>

# @mixin screen-xlg

Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración

+ **Group:** Media-queries
+ **Access:** public

## Examples

```scss
.test{
   width: 100%;
   @include screen-xlg(){
     width: auto;
   }
}
```

```css
.test {
   width: 100%;
 }

@media only screen and (min-width: [object Object]) {
   .test {
     width: auto;
   }
}
```

<a id="spacing-variable-spacing"></a>

# $spacing

Mapa creado dinamicamente en base al fichero de configuración. Define los atributos para crear las clases de utilidad de margin y padding

+ **Group:** Spacing
+ **Access:** public

## Type

**[Number](https://sass-lang.com/documentation/values/numbers)**
