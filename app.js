document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrar");
  const input = form.querySelector("input");

  const mainDiv = document.querySelector(".main");
  const ul = document.getElementById("invitedList");

  const div = document.createElement("div");
  const filterLabel = document.createElement("label");
  const filterCheckbox = document.createElement("input");

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckbox.type = "checkbox";
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);

  filterCheckbox.addEventListener("change", (event) => {
     const isChecked = event.target.checked;
     const lis = ul.children;
     if (isChecked) {
       for (let i=0; i<lis.length; i++) {
          let li = lis[i];
          if (li.className === "responded") {
            li.style.display = "";
          } else {
            li.style.display = "none";
          }
       }

     } else {
       for (let i=0; i<lis.length; i++) {
          let li = lis[i];
          li.style.display = "";
       }

     }
  });

  form.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value;
      const li = createLi(text);
      ul.appendChild(li);
      input.value = "";
  });

  ul.addEventListener("change", (event) => {
      const checkbox = event.target;
      const checked = checkbox.checked;
      const listItem = checkbox.parentNode.parentNode;

      if (checked) {
        listItem.className = "responded";
      } else {
        listItem.className = "";
      }
  });

  ul.addEventListener("click", (event) => {
     if (event.target.tagName === "BUTTON") {
       const button = event.target;
       const li = event.target.parentNode;
       const ul = li.parentNode;

       function removeName() {
          ul.removeChild(li);
        }

        function editName() {
          const span = li.firstElementChild;
          const input = document.createElement("input");
          input.type = "text";
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = "Save";
        }

        function saveName() {
          const input = li.firstElementChild;
          const span = document.createElement("span");
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = "Edit";
        }

       if (button.textContent === "Remove") {
          removeName();

       } else if(button.textContent === "Edit") {
          editName();

       } else if(button.textContent === "Save") {
          saveName();
       }
     }
  });

  function createLi(text){
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    const li = document.createElement("li");
    const span = createElement("span", "textContent", text);
      li.appendChild(span);

    const label = createElement("label", "textContent", "Confirmed");
    const checkbox = createElement("input", "type", "checkbox");
      label.appendChild(checkbox);
      li.appendChild(label);

    const editButton = createElement("button", "textContent", "Edit");
      li.appendChild(editButton);

    const removeButton = createElement("button", "textContent", "Remove");
      li.appendChild(removeButton);
      return li;
  }
});
