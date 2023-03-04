class UI{
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }
    showPosts(posts){
        let output = '';
        posts.forEach((post)=>{
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="card-link edit" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="card-link delete" data-id="${post.id}">
                    <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `;
        })
        this.post.innerHTML = output;
    }
    showAlert(message, className){
        this.clearAlert();    
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.postsContainer');
        const posts = document.querySelector('#posts');
        container.insertBefore(div, posts);
        setTimeout(()=>{this.clearAlert()},3000);
    }
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
    clearFeilds(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;
        this.changeFormState('edit');
    }
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = "Update Post";
            this.postSubmit.className = "btn btn-warning post-submit btn-block"

            //Create cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.className = "btn btn-danger btn-block post-cancel";
            cancelBtn.textContent = "Cancel Edit"
            const card = document.querySelector('.card');
            const formEnd = document.querySelector('.form-end');
            card.insertBefore(cancelBtn, formEnd);
        } else {
            this.postSubmit.textContent = "Post It";
            this.postSubmit.className = "post-submit btn btn-primary btn-block"
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }
            this.clearIdInput();
            this.clearFeilds();
        }
    }
    clearIdInput(){
        this.idInput.value = "";
    }
        
}

export const ui = new UI();