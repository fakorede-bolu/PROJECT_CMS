/*
 * front end logic for the application
 *
*/

const api = {};

// session token creation
api.setSessionToken = (token) => {
    localStorage.setItem('token', token)
};

// Verify that the admin route is assecible by a user
api.adminProtect = () => {
    // get the token from the localStorage and Only continue to route if it is available
    const token = localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
                fetch(`http://localhost:3000/admin`, {
                    headers: {
                        token: token._id
                    }
                })
                .then(response => response.json())
                .then(admin => {
                    if (admin) {
                        window.location === "/admin"
                    } else {
                        window.location === "/login"
                    }
                })
            } else {
                window.location = "/login"
            }
        })
    } else {
        window.location = "/login"
    }
}

// ----------------------Register API----------------------------
api.register = () => {
    document.getElementById("register").addEventListener('click', registerData);

    function registerData(e) {
        e.preventDefault()
        
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('inputPassword').value;
        let passwordMatch = document.getElementById('passwordMatch').value;

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            passwordMatch
        }

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then((user) => {
            if (user._id) {
                window.location = '/login'
            } else {
                const divElement = document.getElementById('wrapper-div')
                const err = `<div style=" height: 30px; background-color: orangeRed; text-align: center; border-radius : 7px; text-transform: upperCase;margin-bottom: 10px">${user.Error}</div>`
                divElement.insertAdjacentHTML('afterbegin', err);
                document.getElementById('firstName').value = firstName;
                document.getElementById('lastName').value = lastName;
                document.getElementById('inputEmail').value =  email;
                document.getElementById('inputPassword').value = "";
                document.getElementById('passwordMatch').value = "";

                window.location = '/register'
            }
        })


    }
}

// -----------------------for the login page-----------------------
api.login = () => {

    
         document.getElementById("login-form").addEventListener('submit', loginData);
         

         // create the login Data callback
         function loginData(e) {

             e.preventDefault()
            
             //get the required data to send over to the tokens api 
             let email = document.getElementById('InputEmail').value;
             let password = document.getElementById('InputPassword').value;

            //  Fetch the api/token url and send over the email and password, the response is a token obj.
             fetch("http://localhost:3000/api/tokens", {
                 method: "POST",
                 headers: {
                     'Accept': 'application/json, text/plain, */*',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ email: email, password: password })
             })
             .then(response => response.json())
             .then((token) => {
                 if (token._id) {
                    //  Set the token id to the localStorage
                     api.setSessionToken(token._id)
                    //  fetch the user by the userid and set the token id as the header token response should be the user array
                    fetch(`http://localhost:3000/users?id=${token.userId}`, {
                        method: "GET",
                        headers: {
                            "token": token._id
                        } 
                    })
                    .then(response => response.json())
                    .then(user => {
                        if (user[0]._id) {
                        console.log(user);
                        } else {
                            // window.location = "/login"  
                        }
                    })
                 } else {
                     const divElement = document.getElementById('login-form')
                     const err = `<div style=" height: 30px; background-color: orangeRed; text-align: center; border-radius : 7px; text-transform: upperCase;margin-bottom: 10px">${token.Error}</div>`
                     divElement.insertAdjacentHTML('afterbegin', err);
                 }
             })

         }

    // 
    
};


// ----------------CREATE POSTS--------------------------
api.createPost = () => {

    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {

                // get the categories from category api and pass them dynamically in the category option.

                fetch('http://localhost:3000/api/post/allcategory', {
                    method: 'GET',
                    headers: {
                        'token': token
                    }
                })
                    .then(response => response.json())
                    .then(category => {
                        category.map(element => {
                            const categoryElement = document.getElementById('category')
                            var opt = document.createElement('option');
                            opt.value = element.category;
                            opt.innerHTML = element.category;
                            opt.selected = true;
                            categoryElement.appendChild(opt);
                        })
                    })

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
                    let category = document.getElementById('category').value;
                    let allowComments = document.getElementById('allowComments').checked;
                    let textBody = document.getElementById('text-body').value;

                    // 5. create the object to be passed to the front end as json
                    const newPost = {
                        title,
                        status,
                        category,
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
                            if (posts) {
                                window.location = "/posts";
                            } else {
                                window.location = "/api/post"
                            }

                        })
                } 

            } else {
                window.location = '/login'
            }
        })    
    } else {
        window.location = "/login"
    }
    
};

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
        image.width = '350'
        image.height = '350'

        document.getElementById('blog_post--image').appendChild(image)    

        fetch('http://localhost:3000/api/post/allcategory')
        .then(response => response.json())
        // get all the category and display
        .then(category => {
            categoryReverse = category.reverse();
            categoryReverse.map((element) => {
                let category = `<div class="col-lg-6">
                    <ul class="list-unstyled mb-0">
                        <li>
                        <a href="#">${element.category}</a>
                        </li>
                    </ul>
                </div>`

                document.querySelector('#category__list').insertAdjacentHTML('beforeend', category);
            })
        })
        // grab all the comments associated to the post and display
        fetch(`http://localhost:3000/api/post/allcomments${id}`)
            .then(response => response.json())
            .then(comments => {
                comments.reverse().map(comment => {
                        // get the user with the comment
                        // @TODO
                        // get the blog div id and insert the comment for each
                        const eachComment = `<div class="media mb-4">
                                <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                                <div class="media-body">
                                    <h5 class="mt-0">@TODO</h5>
                                    ${comment.body}
                                </div>
                            </div>`



                        document.getElementById("blog_post").insertAdjacentHTML('beforeend', eachComment)
                })
            })
    })
};

// ---------------ALL POSTS -----------------------------
api.allPosts = () => {

    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
                fetch("http://localhost:3000/api/allpost")
                .then(response => response.json())
                .then(posts => {
                    if (posts.Error === undefined) {
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
                            const td8 = tr.insertCell(8);

                            td0.innerHTML = element._id;
                            td1.innerHTML = `<img src="../../public/photos/${element.fileImage}" alt="img" id="img-preview" height="50">`
                            td2.innerHTML = element.status
                            // fetch the individual category with the category id from the data
                            fetch(`http://localhost:3000/api/categories?id=${element.category}`)
                                .then(response => response.json())
                                .then(category => {
                                    td3.innerHTML = category.category
                                });
                            td4.innerHTML = element.allowComments
                            td5.innerHTML = element.dateCreated
                            td6.innerHTML = element.title
                            td7.innerHTML = `<a href=/api/post/edit?id=${element._id} class="btn btn-info">Edit</a>`
                            const id = `"?id=${element._id.toString()}"`
                            td8.innerHTML = `<button onclick = api.delete_post(${id}) class="btn btn-danger">Delete</button>`
                        });
                    } 
                })
            } else {
                window.location = '/login'
            }
        })
    } else {
        window.location = '/login'
    }
};

// -----------------EDIT POSTS -------------------------

// to update the html value of the edit post.
api.edit = () => {

    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
                // get the categories from category api and pass them dynamically in the category option.
                fetch('http://localhost:3000/api/post/allcategory')
                .then(response => response.json())
                .then(category => {
                    category.map(element => {
                        const categoryElement = document.getElementById('category')
                        var opt = document.createElement('option');
                        opt.value = element.category;
                        opt.innerHTML = element.category;
                        opt.selected = true;
                        categoryElement.appendChild(opt);
                    })
                })

                const id = window.location.search;
                const url = `http://localhost:3000/api/post${id}`

                // fetch the url
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        // fetch the individual category with the category id from the data
                        fetch(`http://localhost:3000/api/categories?id=${data.category}`)
                            .then(response => response.json())
                            .then(category => {
                                document.querySelector("#editpost-form #category").value = category.category;
                            })
                        // 1. get the values and add the default values to them
                        document.querySelector("#editpost-form #title").value = data.title;
                        document.querySelector("#editpost-form #status").value = data.status;
                        document.querySelector("#editpost-form #text-body").value = data.textBody;
                        document.querySelector('#editpost-form #allowComments').checked = data.allowComments
                    }
                })
            } else {
                window.location = '/login'
            }
        })
    } else {
        window.location = '/login'
    }
};

api.edit_post = () => {

    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
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
                    let category = document.getElementById('category').value;
                    let allowComments = document.getElementById('allowComments').checked;
                    let textBody = document.getElementById('text-body').value;

                    // 5. create the object to be passed to the front end as json
                    const newPost = {
                        title,
                        status,
                        category,
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
                    });

                } 
            } else {
                window.location = '/login';
            }
        });
    } else {
        window.location = '/login';
    }
};

// -----------DELETE POSTS ---------------------
api.delete_post = (id) => {
    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
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
            } else {
                window.location = "/login"
            }
        })
    } else {
        window.location = "/login"
    }
};

// Create comment api
api.comments = () => {
    console.log('worrrl')

    // Get the token from the localStorage
    const token = window.localStorage.getItem('token')

    // create the add   Comment function to be called on submit

    if (token) {
        console.log('what happened and went wrong')
        // get the comment form id and pass in the function to be called when it is submitted
        document.getElementById("comment__form").addEventListener('submit', addComment)

        function addComment(e) {
            // Get the value of the comment body
            const comment = document.getElementById("post__comment").value
           
            // Get the post id to be sent over as a queryString to the comments url
            const id = window.location.search;
            
            //prevent default form submit
            e.preventDefault();
            
            // Fetch the url  and send over the comment inputed by a login user {send the token in the header}
            fetch(`http://localhost:3000/api/post/comments${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({ comment: comment })
            })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response)
                    window.location = `/post${id}`
                }
            })
        }
    } else {
        window.location = "/login"
    }
   
}

// Admin all comments
api.allComments = () => {
    // Get the token to be sent over as a queryString to the comments url
    const token = window.localStorage.getItem('token')
    const url = `http://localhost:3000/api/post/comments`

    if (token) {
        // Fetch the url and set the token in the headers
        fetch(url, {
            method : "GET",
            headers: {token : token}
        })
        .then(response => response.json())
        .then(comments => {
            
            comments.map(element => {
                // grab the user by sending a get request to user handler
                fetch(`http://localhost:3000/users?id=${element.userId}`, {
                    method: "GET",
                    headers: { token: token }
                })
                .then(response => response.json())
                .then(user => {
                    const userName = user[0].firstName
                    const table = document.getElementById("table__row");
                    const tableRow = `<tr>
                                    <th scope="row">${element._id}</th>
                                    <td>${userName}</td>
                                    <td>${element.date}</td>
                                </tr>`
                    table.insertAdjacentHTML('afterbegin', tableRow)
                })
            })
        })
    } else {
        window.location ="/login"
    }

}

// ---------------HOME PAGE API-----------------
api.homepage = () => {
    fetch('http://localhost:3000/api/allpost')
    .then(response => response.json())
    .then(posts => {
        const postReverse = posts.reverse()
        postReverse.map((post) => {
            let html = `<div class="card mb-4">
                <img class="card-img-top" height="350" src="../../public/photos/${post.fileImage}" alt="Card image cap">
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

        });

        // get all the categort to be displayed
        fetch('http://localhost:3000/api/post/allcategory')
            .then(response => response.json())
            .then(category => {
                categoryReverse = category.reverse();
                categoryReverse.map((element) => {
                    let category =  `<div class="col-lg-6">
                            <ul class="list-unstyled mb-0">
                                <li>
                                <a href="#">${element.category}</a>
                                </li>
                            </ul>
                        </div>`

                    document.querySelector('#category__list').insertAdjacentHTML('beforeend', category);
                })
            });

    })
};

// ---------------CATEGORY API-------------------
api.createCategory = () => {

    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
                // 1. get the for by id
                document.getElementById('category__form').addEventListener('submit', postData);


                // 2.create post data
                function postData(e) {
                    //3. prevent default form submit
                    e.preventDefault();

                    //4. get the value of the category
                    let category = document.getElementById('category__name').value;

                    // 5. create the object to be passed to the front end as json
                    const newCategory = {
                        category
                    };

                    // 6. create the fetch api and handle the responses
                    fetch("http://localhost:3000/api/categories", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newCategory)
                    })
                    .then(response => response.json())
                    .then(posts => {
                        const table = document.getElementById("category__table");
                        const tr = table.insertRow(-1);
                        const td0 = tr.insertCell(0);
                        const td1 = tr.insertCell(1);
                        const td2 = tr.insertCell(2);
                        const td3 = tr.insertCell(3);
                        const td4 = tr.insertCell(4);

                        td0.innerHTML = posts._id
                        td1.innerHTML = posts.category
                        td2.innerHTML = posts.date
                        td3.innerHTML = `<a href=/api/categories/edit?id=${posts._id} class="btn btn-info">Edit</a>`
                        const id = `"?id=${posts._id.toString()}"`
                        td4.innerHTML = `<button onclick = api.deleteCategory(${id}) class="btn btn-danger">Delete</button>`
                    })
                }
            } else {
                window.location = "/login"
            }
        });
    } else {
        window.location = "/login"
    }
    
};

api.allCategory = () => {
    fetch("http://localhost:3000/api/post/allcategory")
    .then(response => response.json())
    .then(post => {
        console.log("object");
        post.map(element => {
            const table = document.getElementById("category__table");
            const tr = table.insertRow(-1);
            const td0 = tr.insertCell(0);
            const td1 = tr.insertCell(1);
            const td2 = tr.insertCell(2);
            const td3 = tr.insertCell(3);
            const td4 = tr.insertCell(4);

            td0.innerHTML = element._id
            td1.innerHTML = element.category
            td2.innerHTML = element.date
            td3.innerHTML = `<a href=/api/categories/edit?id=${element._id} class="btn btn-info">Edit</a>`
            const id = `"?id=${element._id.toString()}"`
            td4.innerHTML = `<button onclick = api.deleteCategory(${id}) class="btn btn-danger">Delete</button>`
        })
    })
};

api.editCategory = () => {

    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
                const id = window.location.search;
                // 1. get the for by id
                document.getElementById('category__editform').addEventListener('submit', postData);

                // 2.create post data
                function postData(e) {
                    //3. prevent default form submit
                    e.preventDefault();

                    //4. get all the values by id
                    let category = document.getElementById('edit__Category').value;

                    // 5. create the object to be passed to the front end as json
                    const updatedCat = {
                        category
                    };

                    // 6. create the fetch api and handle the responses
                    fetch(`http://localhost:3000/api/categories${id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedCat)
                    })
                    .then(response => response.json())
                    .then(posts => {
                        window.location = "/post/categories";
                    })

                }
            } else {
                window.location = "/login"
            }
        });
    } else {
        window.location = "/login"
    }
};

api.deleteCategory = (id) => {
    // get the token from the localStorage and Only continue to route if it is available
    const token = window.localStorage.getItem('token')

    if (token) {
        // check if the given token is valid
        fetch(`http://localhost:3000/api/tokens?id=${token}`)
        .then(response => response.json())
        .then(token => {
            if (token._id) {
                // 4. create the fetch api and handle the responses
                fetch(`http://localhost:3000/api/categories${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(category => {
                        if (category) {
                            window.location = "/post/categories";
                        };

                    })
            } else {
                window.location = "/login"
            }
        })
    } else {
        window.location = "/login"
    }
};

api.init = () => {

    const path = window.location.pathname

    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
   
   
    if (trimmedPath === "post/create") {
        api.createPost();
    }

    if (trimmedPath === "login") {
        api.login();
    }

    if (trimmedPath === "register") {
        api.register();
    }
    
    if (trimmedPath === "posts") {
        api.allPosts()
        
    }

    if (trimmedPath === "api/post/edit") {
        api.edit()
        api.edit_post()
    }

    if (trimmedPath === "") {
        api.homepage()
    }
    if (trimmedPath === "post/comments") {
        api.allComments()
    }

    if (trimmedPath === "post") {
        api.getPost()
        api.comments()
    }

    if (trimmedPath === "post/categories") {
        api.createCategory()
        api.allCategory()
    }

    if (trimmedPath === "api/categories/edit") {
        api.editCategory()
    }

    if (trimmedPath === "admin") {
        api.adminProtect()
    }
    
};

window.onload = api.init();
 





// how to edit a post
/*
 *
 * first of all i need to be able to get a single post and this is what i did, with the get method to handlers.create which takes an id that means i have to dynamically pass an id to the url from the query string and this is possible because the edit button in the all post, adds the queryString to each post so when i go to that edit page i already have the querystring available to me, all I have to do is get the queryString and pass it into the singlepost url as a querystring
 * 
 */
