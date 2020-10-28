// window.addEventListener('DOMContentLoaded', fetchImage);

const handleResponse = (res) => {
    if (!res.ok) throw(res);
    return res.json() 
}

const fetchImage = () => {
    document.querySelector('.loader').innerHTML = "Loading...";

    fetch('http://localhost:3000/kitten/image')
        .then(res => {return res.json()})
        .then((data) => {
            document.querySelector('.cat-pic').src = data.src;
        })
        .catch((error) => { 
            alert('ahhhhhhhhh');
        });
}

fetchImage();

const updateScore = (data) => {
    document.querySelector('.score').innerHTML = data.score;
}

const increaseVote = () => {
    fetch('http://localhost:3000/kitten/upvote', { method: 'PATCH' })
        .then(handleResponse)
        .then(updateScore)
        .catch(error => { 
            alert('increase vote error') 
        });
}

const decreaseVote = () => {
    fetch('http://localhost:3000/kitten/downvote', { method: 'PATCH' })
        .then(handleResponse)
        .then(updateScore)
        .catch(error => { alert('decrease vote error') });
}

const commentSubmit = (event) => {
    event.preventDefault();

    const commentForm = document.querySelector('.comment-form');
    const formData = new FormData(commentForm);
    const comment = formData.get('user-comment');
    
    fetch('http://localhost:3000/kitten/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ comment })
	})
        .then(handleResponse)
        .then(commentForm.reset)
        .catch(error => { alert('comment error') })
}

document.querySelector('#new-pic').addEventListener('click', fetchImage);
document.querySelector('#upvote').addEventListener('click', increaseVote);
document.querySelector('#downvote').addEventListener('click', decreaseVote);
document.querySelector('.comment-form').addEventListener('submit', commentSubmit);