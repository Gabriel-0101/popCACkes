const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}
const campos = {
	nombre: false,
    apellido: false,
    usuario: false,
	password: false,
	email: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {

		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
        case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
        case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;

	}
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto');
		document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto');
		document.querySelector(`#grupo-${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo-${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove('formulario-input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto');
		document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto');
		document.querySelector(`#grupo-${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo-${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add('formulario-input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.apellido && campos.email && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario-grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario-grupo-correcto');
		});
	} else {
		document.getElementById('formulario-mensaje').classList.add('formulario-mensaje-activo');
	}
});
