(function(){const app = document.querySelectorAll(".content")[0];
window.addEventListener("click", (e) => {

  //обработчик собитий при нажитии на кнопок верхнего меню
  if (e.target.classList.contains("cats__link") || e.target.classList.contains("dogs__link") ||
    e.target.classList.contains("artists__link") || e.target.classList.contains("emotions__link") || e.target.classList.contains("cartoons__link")) {
    clearContent();
    setContentOnClick(e);
  }
  if (e.target.classList.contains("header__title") || e.target.classList.contains("title__gifs")) {
    clearContent();
    gifsOnMainPage();
  }
});

window.addEventListener("keyup", (e) => {
  //обработчик при вводе в поиск
  if (e.keyCode == 13) {
    clearContent();
    search();
  }
});


function clearContent() {
  if (app.children.length != 0) {//если есть контент, удалить контент
    const elemToRemove = app.querySelectorAll(".content__container-img")[0];
    app.removeChild(elemToRemove);
  }
}
function setContentOnClick(e) {
  const content = document.createElement("div");//контейнер для контента
  content.classList.add("content__container-img");
  fetch(`http://api.giphy.com/v1/gifs/search?q=${e.target.dataset.link}&api_key=Ecgoa48qOBrO9U0cMkDb6dYGoE7jCmNr`)//получаем контент в зависимости от нажатой кнопки
    .then((response) => {
      return response.json();
    }).then((response) => {
      response.data.forEach((item) => {
        let img = document.createElement("img");
        img.setAttribute("src", item.images.original.url);
        content.appendChild(img);
      });
      app.appendChild(content);
    });
}


function search() {
  const content = document.createElement("div");//контейнер для контента
  content.classList.add("content__container-img");
  const search = document.querySelectorAll(".header__search")[0];
  let searchStrToArray = search.value.trim().split(" ");
  let result = searchStrToArray.join("+");
  fetch(`http://api.giphy.com/v1/gifs/search?q=${result}&api_key=Ecgoa48qOBrO9U0cMkDb6dYGoE7jCmNr`)//получаем контент по значению поля ввода
    .then((response) => {
      return response.json();

    }).then((response) => {
      console.log(response.data);
      response.data.forEach((item) => {
        let img = document.createElement("img");
        img.setAttribute("src", item.images.original.url);
        content.appendChild(img);
      });
      app.appendChild(content);
    });
}

function gifsOnMainPage() {
  const content = document.createElement("div");//контейнер для контента
  content.classList.add("content__container-img");
  fetch(`http://api.giphy.com/v1/gifs/search?q=popular&api_key=Ecgoa48qOBrO9U0cMkDb6dYGoE7jCmNr`)
    .then((response) => {
      return response.json();
    }).then((response) => {
      response.data.forEach((item) => {
        let img = document.createElement("img");
        img.setAttribute("src", item.images.original.url);
        content.appendChild(img);
      });
      app.appendChild(content);
    });
};
gifsOnMainPage();
}());