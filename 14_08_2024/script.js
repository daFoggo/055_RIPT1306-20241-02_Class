document.addEventListener("DOMContentLoaded", function () {
  let title = document.getElementById("title");
  let text = document.getElementById("text");
  let unorderedList = document.getElementById("list");
  let removeItem = document.getElementById("remove-me");
  let image = document.getElementsByTagName("img")[0];
  let btn = document.getElementById("btn");
  let paras = document.getElementsByTagName("p");
  let table = document.createElement("table");
  let tableContainer = document.getElementById("table-container");
  let divs = document.getElementsByTagName("div");
  let divCounterContainer = document.getElementById("div-counter-container");
  let divCounter = document.createElement("p");
  let items = document.getElementsByClassName("item");
  let startChanging = document.getElementById("start-changing");

  startChanging.addEventListener("click", function () {
    changeEverything();
  });

  btn.addEventListener("click", function () {
    alert("Button clicked!");
  });

  const changeEverything = () => {
    title.innerHTML = "Hello, DOM!";

    text.style.color = "red";

    unorderedList.appendChild(document.createElement("li")).innerHTML =
      "Second item of list";

    removeItem.remove();

    image.src = "./static/changed_img.png";

    Array.from(paras).forEach(function (para) {
      para.innerHTML = "Updated paragraph";
    });

    for (let i = 0; i < 3; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement("td");
        cell.textContent = `R${i + 1}, C${j + 1}`;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    tableContainer.appendChild(table);

    divCounter.innerHTML = "Div number: " + divs.length;
    divCounterContainer.appendChild(divCounter);

    Array.from(items).forEach(function (item) {
      item.innerHTML = "Updated item";
    });
  };
  
});
