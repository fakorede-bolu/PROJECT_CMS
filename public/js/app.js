// /*
//  * front end logic for the application
//  *
//  */

const api = {};


// -----------------------for the login page-----------------------
 api.login = () => {

    
         document.getElementById("login-form").addEventListener('submit', loginData);
         

         // create the login Data callback
         function loginData(e) {

             e.preventDefault()

             let email = document.getElementById('InputEmail').value;
             let password = document.getElementById('InputPassword').value;

             fetch("http://localhost:3000/login", {
                 method: "POST",
                 headers: {
                     'Accept': 'application/json, text/plain, */*',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ email: email, password: password })
             }).then(response => response.json()).then((response) => {
                 console.log(response);
             })

         }
    
};


// ----------------CREATE POSTS--------------------------
api.createPost = () => {
    
    // 1. get the for by id
    document.getElementById('post-form').addEventListener('submit', postData);

    document.getElementById('file').addEventListener('change', previewFile)
   
   const pixObj = {};
    function previewFile() {
        const preview = document.getElementById('img-preview')
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
            pixObj.data = reader.result;
            
        }, false);

        if (file) {
            pixObj.name = file.name,
            pixObj.type = file.type
            reader.readAsDataURL(file);
           
        }
    }

    // 2.create post data
    function postData(e) {
        //3. prevent default form submit
        e.preventDefault();

        //4. get all the values by id
        let title = document.getElementById('title').value;
        let status = document.getElementById('status').value;
        let allowComments = document.getElementById('allowComments').checked;
        let textBody = document.getElementById('text-body').value;
        

        // 5. create the object to be passed to the front end as json
        const newPost = {
            title,
            status,
            allowComments,
            textBody,
            file: pixObj
        };

        // 6. create the fetch api and handle the responses
        fetch("http://localhost:3000/api/post", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(posts => {
                console.log(posts);
                window.location = "/posts";
            })

    } 

    
    
}

// --------------VIEW POST ------------------------------
api.getPost = () => {
    const id = window.location.search;
    const url = `http://localhost:3000/api/post${id}`

    fetch(url)
    .then(response => response.json())
    .then(posts => {
        document.querySelector('#blog_post--title').innerHTML = posts.title;
        document.getElementById('blog_post--date').innerHTML =`Posted on ${posts.dateCreated}`
        document.getElementById('blog_post--content').innerHTML = posts.textBody;
        const image = document.createElement('img');
        image.src = `../../public/photos/${posts.fileImage}`;
        image.width = '550'
        image.height = '350'
        // image.className = 'center'

        document.getElementById('blog_post--yh').appendChild(image)

        console.log(document.getElementById('blog_post--image'));
       
    })

}

// ---------------ALL POSTS -----------------------------
api.allPosts = () => {
    fetch("http://localhost:3000/api/allpost")
    .then(response => response.json())
    .then(posts => {
        posts.map(element => {
            const table = document.getElementById("post-table");
            const tr = table.insertRow(-1);
            const td0 = tr.insertCell(0);
            const td1 = tr.insertCell(1);
            const td2 = tr.insertCell(2);
            const td3 = tr.insertCell(3);
            const td4 = tr.insertCell(4);
            const td5 = tr.insertCell(5);
            const td6 = tr.insertCell(6);
            const td7 = tr.insertCell(7);
            

            td0.innerHTML = element._id;
            td1.innerHTML = `<img src="../../public/photos/${element.fileImage}" alt="img" id="img-preview" height="50">`
            td2.innerHTML = element.status,
            td3.innerHTML = element.allowComments
            td4.innerHTML = element.dateCreated
            td5.innerHTML = element.title
            td6.innerHTML = `<a href=/post/edit?id=${element._id} class="btn btn-info">Edit</a>`
            const id = `"?id=${element._id.toString()}"`
            td7.innerHTML = `<button onclick = api.delete_post(${id}) class="btn btn-danger">Delete</button>`
        });
    })
};

// -----------------EDIT POSTS -------------------------
api.edit = () => {
    const id = window.location.search;
    const url = `http://localhost:3000/api/post${id}`
    
    // fetch the url
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data) { 
            console.log(data);
            // 1. get the values and add the default values to them
            document.querySelector("#editpost-form #title").value = data.title;
            document.querySelector("#editpost-form #status").value = data.status;
            document.querySelector("#editpost-form #text-body").value = data.textBody;
            document.querySelector('#editpost-form #allowComments').checked = data.allowComments
        }
    })
};

api.edit_post = () => {
    const id = window.location.search;
    // 1. get the for by id
    document.getElementById('editpost-form').addEventListener('submit', postData);

    // 2.create post data
    function postData(e) {
        //3. prevent default form submit
        e.preventDefault();

        //4. get all the values by id
        let title = document.getElementById('title').value;
        let status = document.getElementById('status').value;
        let allowComments = document.getElementById('allowComments').checked;
        let textBody = document.getElementById('text-body').value;

        // 5. create the object to be passed to the front end as json
        const newPost = {
            title,
            status,
            allowComments,
            textBody
        };

        // 6. create the fetch api and handle the responses
        fetch(`http://localhost:3000/api/post${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(posts => {
                console.log(posts);
                window.location = "/posts";
            })

    } 
}

// -----------DELETE POSTS ---------------------

api.delete_post = (id) => {
        // 4. create the fetch api and handle the responses
        fetch(`http://localhost:3000/api/post${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(posts => {
                if (posts) {
                    window.location = "/posts";
                };
                
            })

    
}

// ---------------HOME PAGE API-----------------
api.homepage = () => {
    fetch('http://localhost:3000/api/allpost')
    .then(response => response.json())
    .then(posts => {
        const postReverse = posts.reverse()
        postReverse.map((post) => {
            let html = `<div class="card mb-4">
                <img class="card-img-top" width="200" height="470" src="../../public/photos/${post.fileImage}" alt="Card image cap">
                <div class="card-body">
                <h2 class="card-title">${post.title}</h2>
                <p class="card-text">${post.textBody}</a>
                <a href="/post?id=${post._id}" class="btn btn-primary">Read More &rarr;</a>
                </div>
                <div class="card-footer text-muted">
                Posted on ${post.dateCreated} by
                <a href="#">Fakorede Boluwatife</a>
                </div>
            </div>`

            document.querySelector('#blog__list').insertAdjacentHTML('afterend', html);

        })
    })
}

api.init = () => {
   
   
    if (window.location.pathname === "/post/create") {
        console.log('post post');
        api.createPost();
    }

    if (window.location.pathname === "/login") {
        api.login();
    }
    
    if (window.location.pathname === "/posts") {
        api.allPosts()
        
    }

    if (window.location.pathname === "/post/edit") {
        api.edit()
        api.edit_post()
    }

    if (window.location.pathname === "/") {
        api.homepage()

    }

    if (window.location.pathname === "/post") {
        console.log(`work work`);
        api.getPost()

    }
    
};

window.onload = api.init();
 



// how to edit a post
/*
 *
 * first of all i need to be able to get a single post and this is what i did, with the get method to handlers.create which takes an id that means i have to dynamically pass an id to the url from the query string and this is possible because the edit button in the all post, adds the queryString to each post so when i go to that edit page i already have the querystring available to me, all I have to do is get the queryString and pass it into the singlepost url as a querystring
 * 
 */




// window.onload = init();