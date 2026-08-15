const NUMERO_WHATSAPP = "3007306559";   // <-- Numero de contacto
const CORREO          = "zyntra2727@gmail.com"; // <-- Correo de contacto

/* ------------------------------------------------------------
   1. Menú del celular
   ------------------------------------------------------------ */
const hamburguesa = document.getElementById("hamburguesa");
const menu = document.getElementById("menu");

hamburguesa.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  hamburguesa.setAttribute("aria-expanded", abierto);
});

// Al tocar un enlace, el menú se cierra solo
menu.querySelectorAll("a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    menu.classList.remove("abierto");
    hamburguesa.setAttribute("aria-expanded", "false");
  });
});

/* ------------------------------------------------------------
   2. Barra superior: línea inferior al bajar
   ------------------------------------------------------------ */
const barra = document.getElementById("barra");

window.addEventListener("scroll", () => {
  barra.classList.toggle("fija", window.scrollY > 12);
});

/* ------------------------------------------------------------
   3. Aparición de bloques al bajar + marcar la sección actual
   ------------------------------------------------------------ */
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".revelar").forEach(el => observador.observe(el));

const secciones = document.querySelectorAll("section[id]");
const enlacesMenu = menu.querySelectorAll('a[href^="#"]');

const observadorSeccion = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (!entrada.isIntersecting) return;
    enlacesMenu.forEach(enlace => {
      enlace.classList.toggle("activo", enlace.getAttribute("href") === "#" + entrada.target.id);
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });

secciones.forEach(seccion => observadorSeccion.observe(seccion));

/* ------------------------------------------------------------
   4. Barra del panel de seguimiento
   ------------------------------------------------------------ */
const medidor = document.getElementById("medidor");
setTimeout(() => { medidor.style.width = "99.8%"; }, 500);

/* ------------------------------------------------------------
   5. Datos de contacto tomados de las variables de arriba
   ------------------------------------------------------------ */
const enlaceWhatsapp = document.getElementById("enlace-whatsapp");
enlaceWhatsapp.href = "https://wa.me/" + NUMERO_WHATSAPP;
enlaceWhatsapp.textContent = formatearNumero(NUMERO_WHATSAPP);

function formatearNumero(numero) {
  // 573001234567  ->  +57 300 123 4567
  const sinIndicativo = numero.slice(2);
  return "+" + numero.slice(0, 2) + " " +
         sinIndicativo.slice(0, 3) + " " +
         sinIndicativo.slice(3, 6) + " " +
         sinIndicativo.slice(6);
}

const enlaceCorreo = document.getElementById("enlace-correo");
enlaceCorreo.href = "mailto:" + CORREO;
enlaceCorreo.textContent = CORREO;

document.getElementById("anio").textContent = new Date().getFullYear();

/* ------------------------------------------------------------
   6. Formulario: revisa los datos y arma el mensaje de WhatsApp
   ------------------------------------------------------------ */
const formulario = document.getElementById("formulario");
const aviso = document.getElementById("aviso");

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const datos = {
    nombre:   formulario.nombre.value.trim(),
    negocio:  formulario.negocio.value.trim(),
    telefono: formulario.telefono.value.trim(),
    servicio: formulario.servicio.value,
    mensaje:  formulario.mensaje.value.trim()
  };

  const errores = {};

  if (datos.nombre.length < 3)  errores.nombre = "Escriba su nombre completo.";
  if (datos.negocio.length < 2) errores.negocio = "Escriba el nombre de su negocio.";
  if (!/^\d{7,10}$/.test(datos.telefono.replace(/\s|-/g, ""))) {
    errores.telefono = "Escriba un número de 7 a 10 dígitos.";
  }
  if (datos.mensaje.length < 10) errores.mensaje = "Cuéntenos un poco más, con 10 letras basta.";

  mostrarErrores(errores);

  if (Object.keys(errores).length > 0) {
    const primerCampo = formulario.querySelector(".campo--malo input, .campo--malo textarea");
    if (primerCampo) primerCampo.focus();
    aviso.textContent = "Revise los campos marcados.";
    return;
  }

  const texto =
    "Hola, quiero cotizar con ustedes.\n\n" +
    "Nombre: " + datos.nombre + "\n" +
    "Negocio: " + datos.negocio + "\n" +
    "Teléfono: " + datos.telefono + "\n" +
    "Servicio: " + datos.servicio + "\n\n" +
    datos.mensaje;

  window.open("https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank");

  aviso.textContent = "Abrimos WhatsApp con su mensaje listo para enviar.";
  formulario.reset();
});

function mostrarErrores(errores) {
  formulario.querySelectorAll(".campo").forEach(campo => campo.classList.remove("campo--malo"));
  formulario.querySelectorAll(".error").forEach(p => p.textContent = "");

  for (const clave in errores) {
    const texto = formulario.querySelector('[data-error="' + clave + '"]');
    if (!texto) continue;
    texto.textContent = errores[clave];
    texto.closest(".campo").classList.add("campo--malo");
  }
}

// Al corregir un campo, el error desaparece
formulario.querySelectorAll("input, textarea").forEach(campo => {
  campo.addEventListener("input", () => {
    const contenedor = campo.closest(".campo");
    if (!contenedor.classList.contains("campo--malo")) return;
    contenedor.classList.remove("campo--malo");
    contenedor.querySelector(".error").textContent = "";
  });
});
