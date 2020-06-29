let addListCart = []

const button = document.querySelectorAll('.action-buttons');
const listCart = document.querySelector('#lista-carrinho');
const templateElement = document.querySelector('#carrinho-item');
const template = templateElement.innerHTML;
const listaElement = document.querySelector('#lista-produtos');

const storageHandler = {
  key: 'items',
  storage: localStorage,
  setItems: function (arr) {
    if (arr instanceof Array) this.storage.setItem(this.key, JSON.stringify(arr));
    else throw 'O valor passado para storageHandler.setItems() deve ser Array';
  },
  getItems: function () {
    return JSON.parse(this.storage.getItem(this.key) || '[]');
  }
};


//Objetos
function ItemList(id, name, image, price, qtd){
  this.id = id;
  this.name = name;
  this.image = image;
  this.price = price;
  this.qtd = qtd;
};

const render = () => {
  console.log(addListCart[0]);
  for(i = 0; i < addListCart.length; i++){
    const itemsHTML = templateToHTML(addListCart[i], template);
    console.log(addListCart[0]);
    listCart.innerHTML = itemsHTML.join('\n');
  }
};


const onClick = (evt) => {
  if(evt.target.nodeName === 'BUTTON' && evt.target.attributes['data-id']){
    const id = parseInt(evt.target.attributes['data-id'].value);
    const name = evt.target.attributes['data-name'].value;
    const image = evt.target.attributes['data-image'].value;
    const price = parseFloat(evt.target.attributes['data-price'].value);
    const qtd = parseInt(evt.target.attributes['data-quantity'].value);
    
    const newItemCart = new ItemList(id, name, image, price, qtd)
    addListCart.push(newItemCart);
  }
}


const templateToHTML = (obj, template) => {
  console.log(obj.name)
  return template
    .replaceAll('{{NOME}}', obj.name.value)
    .replaceAll('{{PRECO}}', obj.price)
    .replaceAll('{{ID}}', obj.id)
    .replaceAll('{{IMAGEM}}', obj.image)
    .replaceAll('{{QUANTIDADE}}', obj.qtd)
};


const init = () => {
  addListCart = storageHandler.getItems();
  for (var i = 0; i < button.length; i++){
  button[i].addEventListener("click", onClick)};
  render();
};

init();
