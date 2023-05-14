import { USER_POSTS_PAGE, POSTS_PAGE, LOADING_PAGE  } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { likeApi, dislikeApi } from "../api.js";
import { switchLikes } from "../switchLikes.js";


export function renderPostsPageComponent({ appEl }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
              <div class="header-container"></div>
                <ul class="posts">
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;
  const postsHTML = appEl.querySelector(".posts");
  let postHTML = "";

  posts.forEach((post) => {
    let likes = '0';
    if (post.likes.length === 1) {
      likes = post.likes[0].name
    }else if (post.likes.length === 2) {
      likes = `${post.likes[0].name}, ${post.likes[1].name}`;
    } else if (post.likes.length > 2) {
      likes = `${post.likes[0].name}, ${post.likes[1].name} и еще ${post.likes.length - 2} человек`;
    }
    postHTML = `
      <li class="post">
        <div class="post-header" data-user-id=${post.user.id}>
          <img src="${post.user.imageUrl}"class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <img class="preloader-likes --display-off" src="./assets/images/preloader-likes.gif">
          <button 
            data-post-id="${post.id}" 
            data-is-liked="${post.isLiked}"
            data-likes="${post.likes.length}" 
            class="like-button">
              <img src="./assets/images/${
                post.isLiked ? "like-active.svg" : "like-not-active.svg"
              }">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${likes}</strong>
          </p>
        </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
              ${post.description}
          </p>
          <p class="post-date">
            ${post.createdAt}
          </p>
      </li>
    `;
    postsHTML.innerHTML += postHTML;
  });

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let userEl of document.querySelectorAll(".like-button")) {
    userEl.addEventListener("click", () => {
      userEl.classList.add('--display-off');
      userEl.previousElementSibling.classList.remove('--display-off');
      const sentData = {
        isLiked: userEl.dataset.isLiked === "true" ? true : false,
        likes: userEl.dataset.likes,
        postId: userEl.dataset.postId,
        token: getToken(),
        img: userEl.querySelector('img'),
      }
      switchLikes(sentData);
    });
  }
}
