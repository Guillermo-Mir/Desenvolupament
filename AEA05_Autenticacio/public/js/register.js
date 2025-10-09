/*
 // Función auxiliar para obtener elementos fácilmente
        const $ = el => document.querySelector(el);

        // Seleccionamos el formulario y el span de mensaje
        const registerForm = $('#register-form')
        const registerSpan = $('#register-form span')

        // Escuchamos el evento de "submit" (cuando el usuario intenta enviar el formulario)
        registerForm?.addEventListener('submit', e => {
            e.preventDefault() // Evita que se recargue la página

            // Obtenemos los valores de los campos del formulario
            const username = $('#register-username').value
            const password = $('#register-password').value
            const confimrpassword = $('#register-confirm-password').value

            // Comprobamos si las contraseñas coinciden
            if (password != confimrpassword) {
                alert('Passwords do not match')
                return // Si no coinciden, salimos sin enviar los datos
            }

            // Enviamos los datos al servidor con fetch (POST /register)
            fetch('/register', {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json' // Indicamos que enviamos JSON
                },
                body: JSON.stringify({ username, password }) // Enviamos los datos como JSON
            })
            .then(res => {
                console.log(res) // Mostramos la respuesta en consola 
                if (res.ok) {
                    // Si el servidor respondió correctamente (código 200 o 201)
                    registerSpan.innerText = 'Usuario registrado. ..Entrando..'
                          registerSpan.style.color = 'green'
                    registerSpan.clasList.add("success");
                    setTimeout(() => {
                        window.location.href = '/protected'
                    }, 2000);
                } else {
                    // Si hubo un error en el registro
                    registerSpan.innerText = 'Error al registrar usuario'
                    registerSpan.style.color = 'red'
                }
            });
        });
*/