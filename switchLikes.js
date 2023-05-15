import { changeLocalPosts, posts } from "./index.js";
import { likeApi, dislikeApi } from "./api.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";

export const switchLikes = (data) => {
  if (data.isLiked) {
    data.img.src = `./assets/images/like-not-active.svg`;
    dislikeApi({ postId: data.postId, token: data.token })
      .then((responseData) => {
        rewritePosts(data.postId, responseData.post);
      })
  } else {
    data.img.src = `./assets/images/like-active.svg`;
    likeApi({ postId: data.postId, token: data.token })
      .then((responseData) => {
        rewritePosts(data.postId, responseData.post);
      })
  }
};

function rewritePosts(postId, newPost) {
  const newPosts = posts.map((post) => {
    if (post.id === postId) {
      post = newPost;
      return post;
    }
    return post;
  });
  changeLocalPosts(newPosts);
  const appEl = document.getElementById("app");
  renderPostsPageComponent({ appEl });
}
