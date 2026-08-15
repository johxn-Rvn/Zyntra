# Sitio web del emprendimiento — guía de edición

Tres archivos, nada que instalar. Se abren y se editan en Visual Studio Code.

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Los textos y la estructura de la página |
| `estilos.css` | Los colores, las tipografías y el diseño |
| `script.js` | El menú, las animaciones y el formulario |

Los tres deben quedar **en la misma carpeta**. Si separa los archivos, la página pierde el diseño.

---

## Abrirla en Visual Studio Code

1. Abra VS Code → **Archivo → Abrir carpeta** → elija la carpeta con los tres archivos.
2. Instale la extensión **Live Server** (ícono de extensiones en la barra izquierda, busque "Live Server").
3. Clic derecho sobre `index.html` → **Open with Live Server**.

La página se abre en el navegador y se actualiza sola cada vez que usted guarda con `Ctrl + S`. Sin Live Server también funciona: doble clic en `index.html`, pero le toca refrescar a mano.

---

## Lo primero que deben cambiar

**1. El número de WhatsApp y el correo** — archivo `script.js`, primeras líneas:

```js
const NUMERO_WHATSAPP = "573000000000";
const CORREO          = "contacto@sucorreo.com";
```

El número va con el indicativo del país pegado (57 para Colombia), sin espacios ni signo `+`. Ese mismo número recibe los mensajes del formulario de contacto.

**2. El nombre del emprendimiento** — en `index.html` está como *Taller Web* (es un nombre de relleno). Presione `Ctrl + Shift + H` en VS Code para reemplazarlo en todo el archivo de una vez. Aparece en cuatro lugares: el título de la pestaña, la barra superior, el pie de página y el aviso legal. También cambie el monograma `TW` por las iniciales de ustedes.

**3. El logo** — en `index.html`, busque el comentario `<!-- LOGO:` y reemplace el cuadro con las iniciales por su imagen:

```html
<img src="logo.png" alt="Logo de su emprendimiento" class="marca__logo">
```

Ponga el archivo `logo.png` en la misma carpeta.

**4. Los nombres del equipo** — sección `EQUIPO` en `index.html`. Cambie los "Nombre Apellido" y la letra inicial de cada uno.

**5. Los precios** — sección `PLANES` en `index.html`. Están en pesos colombianos y son valores de ejemplo.

---

## Cambiar los colores

Todo el color de la página sale de seis variables, al comienzo de `estilos.css`:

```css
:root{
  --tinta:   #0E1F38;   /* azul oscuro de fondos y textos */
  --plano:   #17304F;   /* azul de superficies            */
  --cal:     #EEF1F4;   /* fondo claro                    */
  --papel:   #FFFFFF;   /* blanco de tarjetas             */
  --cinta:   #F5B841;   /* amarillo de acento             */
  --menta:   #46C1A6;   /* verde de "todo en orden"       */
}
```

Cambie un valor ahí y el color se actualiza en toda la página. Es la forma más rápida de adaptar el sitio a los colores del logo de ustedes.

---

## Cómo está armada la página

```
Barra superior     menú + botón de cotización
Portada            titular + panel de seguimiento
Servicios          creación / mantenimiento + tres extras
Cómo trabajamos    los cuatro pasos del proceso
Planes             tres planes mensuales
Equipo             las personas del grupo
Preguntas          acordeón de preguntas frecuentes
Contacto           datos + formulario que va a WhatsApp
Pie de página
```

Cada sección está separada en `index.html` con un comentario grande en mayúsculas, así que es fácil encontrarla desplazándose.

**El panel de seguimiento de la portada** es la parte que más diferencia el sitio: muestra el mantenimiento como un reporte en vivo, con los puntos que laten y la barra de disponibilidad. Los sitios que aparecen ahí son ejemplos; cuando tengan clientes reales, cámbienlos por los suyos.

---

## Detalles que ya vienen resueltos

- Se adapta a celular, tablet y computador.
- Funciona con el teclado y tiene un enlace de "ir al contenido" para lectores de pantalla.
- Respeta la opción del sistema de reducir animaciones.
- El formulario revisa los datos antes de enviar y muestra el error debajo de cada campo.

## Para publicarla en internet

La opción gratis más sencilla es **GitHub Pages**: suben la carpeta a un repositorio, entran a *Settings → Pages* y eligen la rama `main`. Queda en línea en unos minutos.
