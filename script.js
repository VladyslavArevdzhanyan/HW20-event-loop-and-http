let titleBlock = document.getElementById('title')
let descriptionBlock = document.getElementById('description')
let commentsBlock = document.getElementById('commentsUl')
let textarea = document.getElementById('textareaComment')
let addCommentBtn = document.getElementById('addComment')

class InformBlock {
    constructor(id) {
        this.id = id;
    }

    async getTitle() {
        try {
            let titleAndDescr = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
            if (titleAndDescr.ok) {
                return titleAndDescr.json();
            }
        } catch {
            console.error('Error')
        }
    }

    showTitleAndDescr(info) {
        titleBlock.innerHTML = `<p id=${info.id}>${info.title}</p>`;
        descriptionBlock.innerHTML = `<p id=${info.id}>${info.body}</p>`;
    }

    async getComment() {
        try {
            let comment = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`);
            if (comment.ok) {
                return comment.json();
            }
        } catch {
            console.error('Error')
        }
    }

    showComment(comments) {
        let comment = '';

        for (let el of comments) {
            if (!el) {
                return;
            }
            comment += `<li>${el.body}</li>`;
        }
        commentsBlock.innerHTML = comment;
    }
}

let title = new InformBlock(1);

title.getTitle()
    .then((titleAndDescr) => {
        title.showTitleAndDescr(titleAndDescr);
    });

title.getComment()
    .then((comment) => {
        title.showComment(comment);
    });


function addComment(inform) {
    let newComment = document.createElement('li')
    newComment.innerHTML = `<li>${inform.body}</li>`
    commentsBlock.append(newComment);
    textarea.value = '';
}

addCommentBtn.addEventListener('click', async function commentPost() {
    await fetch('https://jsonplaceholder.typicode.com/posts/1/comments', {
            method: 'POST',
            body: JSON.stringify({
                body: textarea.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => addComment(json));
})