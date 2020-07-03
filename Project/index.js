let addListCart = []

const buttonAddCart = document.querySelectorAll('button[data-price]');
const listCart = document.querySelector('#lista-carrinho');
const templateElement = document.querySelector('#carrinho-item');
const template = templateElement.innerHTML;
const listaElement = document.querySelector('#lista-produtos');
const total = document.querySelector('#total');
const buttonRemove = document.querySelectorAll('ul button[class = remover-item]')
let saldo

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

  listCart.innerHTML = '';
  saldo = 0;
  for(i = 0; i < addListCart.length; i++){
    saldo += parseFloat(addListCart[i].price)*parseInt(addListCart[i].qtd);
    const itemsHTML = templateToHTML(addListCart[i], template);
    listCart.innerHTML += itemsHTML
  }
  total.innerHTML = saldo.toFixed(2).replace(".",",").toString()
};


const onClick = (evt) => {
  if(evt.target.nodeName === 'BUTTON' && evt.target.attributes['data-id']){
    const id = parseInt(evt.target.attributes['data-id'].value);
    const name = evt.target.attributes['data-name'].value;
    const image = evt.target.attributes['data-image'].value;
    const price = parseFloat(evt.target.attributes['data-price'].value);
    const qtd = parseInt(evt.target.attributes['data-quantity'].value);
    
    const newItemCart = new ItemList(id, name, image, price, qtd)
    let contem = false;
    let ref = 0

    for(i = 0; i < addListCart.length; i++){
        if(addListCart[i].id == newItemCart.id){
          contem = true;
          ref = i;
        }
    }
    
    if(contem){
      addMore(newItemCart.id, ref)
    }else{
      addListCart.push(newItemCart);
    }
    init();
  }
}

const addMore = (id, ref) => {
  let analise = addListCart[ref].qtd + 1
  addListCart[ref].qtd = analise;
  init();
};

const RemoveClick = (evt) => {
  if(evt.target.nodeName === 'BUTTON' && evt.target.attributes['class'].nodeValue === 'remover-item'){
    const index = parseInt(evt.target.attributes['data-id'].nodeValue);
    const test = addListCart.filter((num) => {return num.id !== index})
    addListCart = test
    init()
  }
};


const templateToHTML = (obj, template) => {
    return template
    .replace(/{{NOME}}/g, obj.name)
    .replace(/{{PRECO}}/g, obj.price)
    .replace(/{{ID}}/g, obj.id)
    .replace(/{{IMAGEM}}/g, obj.image)
    .replace(/{{QUANTIDADE}}/g, obj.qtd)
};

const Quantid = (evt) => {

  if(evt.target.nodeName === 'INPUT' && evt.target.attributes['class'].nodeValue === 'qtd'){

  }
}

const init = () => {

  for (var i = 0; i < buttonAddCart.length; i++){
  buttonAddCart[i].addEventListener("click", onClick)};

  listCart.addEventListener('click', RemoveClick)
  listCart.addEventListener('click', Quantid)
  

  render()
  
};

init();
