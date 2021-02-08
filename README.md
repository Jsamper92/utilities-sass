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
 <a id="fonts-mixin-font-face"></a>

# @mixin font-face

Mixin cuyo objetivo es crear una fuente partiendo de una ruta establecida

+ **Group:** Fonts
+ **Access:** public

## Parameters

| Name      | Type                                                             | Description                                     | Default                  |
| :-------- | :--------------------------------------------------------------- | :---------------------------------------------- | :----------------------- |
| `$name`   | **[String](https://sass-lang.com/documentation/values/strings)** | Nombre de la fuente.                            | -                        |
| `$path`   | **[String](https://sass-lang.com/documentation/values/strings)** | Localización de la fuente.                      | -                        |
| `$weight` | **[String](https://sass-lang.com/documentation/values/strings)** | Grosor de la fuente.                            | -                        |
| `$style`  | **[String](https://sass-lang.com/documentation/values/strings)** | Estilo de la fuente.                            | -                        |
| `$exts`   | **[String](https://sass-lang.com/documentation/values/strings)** | Formato de fuentes a crear por medio del mixin. | `eot woff2 woff ttf svg` |

## Examples

```scss
@include font-face("Helvetica--Neue--35", "fonts/helvetica--neue/HelvNeue35", 500, normal);
```

```css
@font-face {
     font-family: "Helvetica--Neue--35";
     font-style: normal;
     font-weight: 500;
     src: url("fonts/helvetica--neue/HelvNeue35.eot?") format("eot"),
     url("fonts/helvetica--neue/HelvNeue35.woff2") format("woff2"),
     url("fonts/helvetica--neue/HelvNeue35.woff") format("woff"),
     url("fonts/helvetica--neue/HelvNeue35.ttf") format("truetype"),
     url("fonts/helvetica--neue/HelvNeue35.svg#Helvetica--Neue--35") format("svg");
}
```

## Dependencies

+ **[@function str-replace](#functions-function-str-replace)**

<a id="functions-function-str-replace"></a>

# @function str-replace

Mixin cuyo objetivo es partiendo de un string reemplazar un carácter por otro

+ **Group:** Functions
+ **Access:** public

## Parameters

| Name       | Type                                                             | Description                                     | Default |
| :--------- | :--------------------------------------------------------------- | :---------------------------------------------- | :------ |
| `$string`  | **[String](https://sass-lang.com/documentation/values/strings)** | String a modificar.                             | -       |
| `$search`  | **[String](https://sass-lang.com/documentation/values/strings)** | Carácter a buscar.                              | -       |
| `$replace` | **[String](https://sass-lang.com/documentation/values/strings)** | Carácter que reemplazara al string establecido. | `""`    |

## Examples

```scss

str-replace($name, " ", "_")
```

## Dependents

+ **@mixin font-face** Mixin cuyo objetivo es crear una fuente partiendo de una ruta establecida

<a id="grid-variable-breakpoints"></a>

# $breakpoints

Mapa creado dinamicamente en base al fichero de configuración. Define los puntos de ruptura de los distintos breakpoints

+ **Group:** Grid
+ **Access:** public

## Type

**[Map](https://sass-lang.com/documentation/values/maps)**

## Dependents

+ **@mixin get-grid** Mixin que partiendo de los puntos de ruptura establecidos en el fichero de configuración, genera las clases del sistema de rejilla.
+ **@mixin get-utilities-spacing** Mixin que partiendo de los puntos de ruptura establecidos en el fichero de configuración, genera las clases del sistema de rejilla.

<a id="grid-mixin-get-grid"></a>

# @mixin get-grid

Mixin que partiendo de los puntos de ruptura establecidos en el fichero de configuración, genera las clases del sistema de rejilla.

+ **Group:** Grid
+ **Access:** public

## Parameters

| Name           | Type                                                       | Description                                  | Default        |
| :------------- | :--------------------------------------------------------- | :------------------------------------------- | :------------- |
| `$breakpoints` | **[Map](https://sass-lang.com/documentation/values/maps)** | Mapa establecido en la configuración inicial | `$breakpoints` |

## Examples

```scss
@include get-grid();
```

```css
@media only screen and (min-width: 0px) {
 .col-sm-1 {
   box-sizing: border-box;
   padding: 0 30px;
   flex: 0 0 25%;
   min-width: 25%;
   max-width: 25%;
 }
}...
@media only screen and (min-width: 768px) {
 .col-md-1 {
   box-sizing: border-box;
   padding: 0 30px;
   flex: 0 0 16.6666666667%;
   min-width: 16.6666666667%;
   max-width: 16.6666666667%;
 }
}...
@media only screen and (min-width: 1440px) {
 .col-lg-1 {
   box-sizing: border-box;
   padding: 0 30px;
   flex: 0 0 8.3333333333%;
   min-width: 8.3333333333%;
   max-width: 8.3333333333%;
 }
}...

```

## Dependencies

+ **[$breakpoints](#grid-variable-breakpoints)** Mapa que define los puntos de ruptura, gutter y offset

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

@media only screen and (min-width: 360px) {
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

@media only screen and (min-width: 768px) {
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

@media only screen and (min-width: 1440px) {
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

@media only screen and (min-width: 1920px) {
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

## Dependents

+ **@mixin get-utilities-spacing** Mixin que partiendo de los puntos de ruptura establecidos en el fichero de configuración, genera las clases del sistema de rejilla.

<a id="spacing-variable-types"></a>

# $types

Mapa que define el prefijo de la clase y propiedad CSS del mixin de margenes y padding

+ **Group:** Spacing
+ **Access:** public

## Type

**[Map](https://sass-lang.com/documentation/values/maps)**

## Dependents

+ **@mixin get-utilities-spacing** Mixin que partiendo de los puntos de ruptura establecidos en el fichero de configuración, genera las clases del sistema de rejilla.

<a id="spacing-mixin-get-utilities-spacing"></a>

# @mixin get-utilities-spacing

Mixin que partiendo de los puntos de ruptura establecidos en el fichero de configuración, genera las clases del sistema de rejilla.

+ **Group:** Spacing
+ **Access:** public

## Parameters

| Name           | Type                                                       | Description                                  | Default        |
| :------------- | :--------------------------------------------------------- | :------------------------------------------- | :------------- |
| `$breakpoints` | **[Map](https://sass-lang.com/documentation/values/maps)** | Mapa establecido en la configuración inicial | `$breakpoints` |
| `$spacing`     | **[Map](https://sass-lang.com/documentation/values/maps)** | Mapa establecido en la configuración inicial | `$spacing`     |

## Examples

```scss
@include get-utilities-spacing()
```

```css
@media only screen and (min-width: 0px) {
 .mt-sm-1 {
     margin-top: 5px;
  }...
@media only screen and (min-width: 768px) {
 .pb-md-2 {
     padding-bottom: 10px;
  }...
@media only screen and (min-width: 1440px) {
 .ml-lg-3 {
     margin-left: 15px;
  }...
```

## Dependencies

+ **[$breakpoints](#grid-variable-breakpoints)** Mapa que define los puntos de ruptura, gutter y offset
+ **[$spacing](#spacing-variable-spacing)** Mapa que define el valor exponencial de una clase a la siguiente y el número de estas clases que se van a crear
+ **[$types](#spacing-variable-types)** Mapa que define el prefijo de la clase y propiedad CSS del mixin de margenes y padding
