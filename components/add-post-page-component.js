import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3></div>
        <div class="form-inputs">        
          <button class="button" id="add-button">Выберите фото</button>
          <textarea class="textarea add-post-textarea" rows="4" placeholder="Опишите фотографию..."></textarea>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
  };
 
  render();
}
