import { http } from './easyHTTP';
import { ui } from './ui';
 
document.addEventListener('DOMContentLoaded', getPosts);

document.querySelector('.post-submit').addEventListener('click', submitPost);

document.querySelector('#posts').addEventListener('click', deletePost);

document.querySelector('#posts').addEventListener('click', enableEdit);

document.querySelector('.card-form').addEventListener('click', cancelEdit);


function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(resData => ui.showPosts(resData))
    .catch(error => console.log(error))
}

function submitPost(e){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;
    const data = {
        title,
        body
    }
    
    if(title === '' && body === ''){
        ui.showAlert("Please Fill all Fields", "alert alert-danger");
    } else {
        
        if(id === ''){
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post Added', 'alert alert-success');
                getPosts();
                ui.clearFeilds();
            })
            .catch(error => console.log(error));
        } else {
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
            ui.showAlert('Post Updated', 'alert alert-success');
            getPosts();
            ui.changeFormState('add');
        })
        .catch(error => console.log(error));
        } 
    }
    e.preventDefault();
}

function deletePost(e){
    if(e.target.classList.contains("fa-remove")){
        const id = e.target.parentElement.dataset.id;
        if(confirm("Are you sure ?")){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert("Post has been deleted", "alert alert-danger");
                getPosts();
            })
            .catch(error => console.log(error))
        }
    }
    e.preventDefault();
}
function enableEdit(e){
    if(e.target.classList.contains("fa-pencil")){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const data ={
            id,
            title, 
            body
        }
        ui.fillForm(data);
        
    }
    e.preventDefault();
}

function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}

