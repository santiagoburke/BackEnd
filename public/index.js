const socketClient = io()
const cards = document.getElementById('cards')
const nombreUsuario = document.getElementById('nombreUsuario')
const formChat = document.getElementById('form-chat')
const inputMensaje = document.getElementById('mensaje')
const chatParrafo = document.getElementById('paragraph-chat')
let usuario = null

if (!usuario) {
    Swal.fire({
        title: 'Bienvenido',
        text: 'Ingresa tu usuario',
        input: 'text',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas ingresar usuario'
            }
        }
    })
        .then(userName => {
            usuario = userName.value
            nombreUsuario.innerText = usuario
        })
}

formChat.onsubmit = (e) => {
    e.preventDefault()
    const infoUser = {
        user: usuario,
        message: inputMensaje.value,
    }
    socketClient.emit('mensaje', infoUser)
    inputMensaje.value = ''
}

socketClient.on('chat', mensajes => {
    const htmlRender = mensajes.map(e => {
        return `<p><strong>${e.user}:</strong>${e.message}</p>`
    }).join(' ')
    chatParrafo.innerHTML = htmlRender
})

socketClient.on("productos", (prods) => {
    cards.innerHTML = "";
    prods.forEach((prod) => {
        cards.innerHTML += `
      <div class="card">
          <div class="card-header">
          <h3>${prod.title}</h3>
          </div>
          <div class="card-body">
          <div class="card-img">
              <img src="${prod.thumbnail[0]}" alt="Imagen del producto" />
          </div>
          <div class="card-description">
              <p>${prod.description}</p>
              <p>Precio: $${prod.price}</p>
              <p>Códgo: ${prod.code}</pclass=>
              <p>Stock: ${prod.stock}</pclass=>
              <p>Categoría: ${prod.category}</pss=>
          </div>
          </div>
          <div class="card-buy">
          <button class="btn">Comprar</button>
          </div>
      </div>`;
    });
});

