function fetchPost(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Пост не знайдено');
      }
      return response.json();
    });
}

function fetchComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Коментарі не знайдено');
      }
      return response.json();
    });
}

function searchPost() {
  const postId = document.getElementById('postId').value;
  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = '';

  if (postId >= 1 && postId <= 100) {
    fetchPost(postId)
      .then(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `;
        postContainer.appendChild(postDiv);
        return post;
      })
      .catch(error => {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `<h2>${error}</h2>`;
        postContainer.appendChild(errorDiv);
      })
      .then(post => {
        const commentsButton = document.createElement('button');
        commentsButton.textContent = 'Показати коментарі';
        commentsButton.onclick = () => {
          fetchComments(post.id)
            .then(comments => {
              const commentsDiv = document.createElement('div');
              commentsDiv.innerHTML = '<h3>Коментарі:</h3>';
              comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.innerHTML = `
                  <strong>${comment.name}</strong>
                  <p>${comment.body}</p>
                `;
                commentsDiv.appendChild(commentDiv);
              });
              postContainer.appendChild(commentsDiv);
            })
            .catch(error => {
              const commentsErrorDiv = document.createElement('div');
              commentsErrorDiv.innerHTML = `<h3>${error}</h3>`;
              postContainer.appendChild(commentsErrorDiv);
            });
        };
        postContainer.appendChild(commentsButton);
      });
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = '<h2>Недопустиме значення ID поста.</h2>';
    postContainer.appendChild(errorDiv);
  }
}
        