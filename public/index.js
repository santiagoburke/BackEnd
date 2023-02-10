const socketServer = io()
const cards = document.getElementById('cards')

socketServer.on("productos", (prods) => {
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