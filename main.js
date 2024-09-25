const cadenaCaracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const caracterEspecial = '!@#$%^&*()';
const MIN_LENGTH = 8;
const STRONG_LENGTH = 12;

let cantidad = document.getElementById('cantidad');
let contrasena = document.getElementById('contrasena');
let mensajeSeguridad = document.getElementById('mensajeSeguridad');

// Genera una contraseña con las características deseadas
function generar() {
    let numeroDigitado = parseInt(cantidad.value);
    
    // Validaciones
    if (!numeroDigitado) return; // No hace nada si no se ingresa nada
    if (numeroDigitado < MIN_LENGTH) {
        mostrarError('Debes ingresar un número mayor o igual a 8.');
        return;
    }

    let password = generarPassword(numeroDigitado);
    contrasena.value = password;

    const nivelSeguridad = validarSeguridad(password);
    actualizarMensajeSeguridad(nivelSeguridad);
}

// Genera la contraseña aleatoria
function generarPassword(longitud) {
    let password = '';

    // Genera caracteres aleatorios
    for (let i = 0; i < longitud; i++) {
        let caracterAleatorio = cadenaCaracteres[Math.floor(Math.random() * cadenaCaracteres.length)];
        password += caracterAleatorio;
    }

    // Añade caracteres especiales aleatorios
    let cantidadEspeciales = Math.floor(Math.random() * (longitud / 2));
    for (let j = 0; j < cantidadEspeciales; j++) {
        let posicionAleatoria = Math.floor(Math.random() * longitud);
        password = password.substring(0, posicionAleatoria) + caracterEspecial[Math.floor(Math.random() * caracterEspecial.length)] + password.substring(posicionAleatoria + 1);
    }

    return password;
}

// Valida la seguridad de la contraseña
function validarSeguridad(contrasena) {
    const longitud = contrasena.length;
    const tieneNumeros = /[0-9]/.test(contrasena);
    const tieneMinusculas = /[a-z]/.test(contrasena);
    const tieneMayusculas = /[A-Z]/.test(contrasena);
    const tieneCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);

    if (longitud < STRONG_LENGTH) {
        return (tieneNumeros && (tieneMayusculas || tieneMinusculas)) ? 'Medio' : 'Bajo';
    }
    return (tieneNumeros && tieneMayusculas && tieneCaracteresEspeciales && tieneMinusculas) ? 'Alto' : 'Medio';
}

// Actualiza el mensaje de seguridad y sus estilos
function actualizarMensajeSeguridad(nivelSeguridad) {
    mensajeSeguridad.textContent = `Nivel de seguridad de la contraseña: ${nivelSeguridad}`;
    mensajeSeguridad.classList.remove('oculto', 'Bajo', 'Medio', 'Alto');
    mensajeSeguridad.classList.add(nivelSeguridad);
}

// Función para copiar la contraseña al portapapeles
function copiar() {
    if (!contrasena.value) {
        mostrarError('No hay ninguna contraseña para copiar.');
        return;
    }
    navigator.clipboard.writeText(contrasena.value)
        .then(() => alert('Contraseña copiada al portapapeles.'))
        .catch(err => alert('No se pudo copiar la contraseña.'));
}

// Función para mostrar errores de forma más amigable
function mostrarError(mensaje) {
    alert(mensaje); 
}

// Limpia el formulario y oculta el mensaje de seguridad
function limpiar() {
    cantidad.value = "";
    contrasena.value = "";
    mensajeSeguridad.textContent = "";
    mensajeSeguridad.classList.add('oculto');
}
