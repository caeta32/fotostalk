function retrieveLocalStorageItems() {

    var articleArray = [];
    var commmentArray = [];
    var likesArray = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.split(" - ")[1]) {
            commmentArray.push(key);
        } else if(key.split(" - ")[2]) {
            console.log()
            likesArray.push(key);
        } else {
            articleArray.push(key);
        }
    }

    commmentArray.sort();
    commmentArray.reverse();

    articleArray.sort();
    articleArray.reverse();

    likesArray.sort();
    likesArray.reverse();
    

    for (let j = 0; j < articleArray.length; j++) {
        var article = document.createElement("article");
        var addPost = document.getElementById("articleSection");
        article.innerHTML = localStorage.getItem(articleArray[j]);
        addPost.append(article);
    }

    for (let k = 0; k < commmentArray.length; k++) {
        var commentSection = document.getElementById("comments" + commmentArray[k].split(" - ")[0]);
        var p = document.createElement("p");
        p.innerHTML = localStorage.getItem(commmentArray[k]);
        commentSection.prepend(p);
    }

    
    for (let l = 0; l < likesArray.length; k++) {
        var likeSection = document.getElementById("likes" + likesArray[k].split(" - ")[0]);
        console.log(likeSection);

        likeSection.innerHTML = localStorage.getItem(likesArray[k]);
    }

}


!async function() {

    let data = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });

    var addToUserList = document.getElementById("user-list");

    for (var i = 0; i < data.length; i++) {
        addToUserList.innerHTML +=
            '<li id=usuario' + i + ' onclick="changeActiveUser(this.id)">' +
            '<div class="container">' +
            '<img id="userimage"    src="img/profilepic' + (i + 1) + '.jpg" class="userProfileThumbnail">' +
            '<div class="text">' +
            '<b id="username">' + data[i].username + '</b>' +
            '<p class="userEmail" id="email">' + data[i].email + '</p>' +
            '</div>' +
            '</div>' +
            '</li>';
    }

}();



function changeActiveUser(userId) {

    var selectedUser = document.getElementById(userId);
    var userToChange = document.getElementById('main-user');

    userToChange.querySelector("#username").classList.remove('username'); // reset animation
    void userToChange.querySelector("#username").offsetWidth; // trigger reflow
    userToChange.querySelector("#username").classList.add('username'); // start animation
    document.getElementById('profilepicture').src = selectedUser.querySelector("#userimage").src;
    userToChange.querySelector("#username").innerHTML = selectedUser.querySelector("#username").innerHTML;

}


function makePost() {

    var userWhoPosted = document.getElementById('main-user');

    var username = userWhoPosted.querySelector("#username").innerHTML;
    var userProfilePicture = document.getElementById("profilepicture").src;
    console.log(userProfilePicture);
    var description = ' ' + userWhoPosted.querySelector("#description").value;
    var imgPath = "img/" + userWhoPosted.querySelector("#upload").value.split("\\")[2];

    var addPost = document.getElementById("articleSection");

    var article = document.createElement("article");

    var postId = Math.floor(Math.random() * 10000) + 1;

    article.innerHTML =
        '<header class="feedHeader">' +
        '<div class="container">' +
        '<img src="' + userProfilePicture + '" class="userProfileThumbnail">' +
        '<div class="text">' +
        '<b>' + username + '</b>' +
        '</div>' +
        '</div>' +
        '</header>' +

        '<img class="feedImages"' +
        'src="' + imgPath + '">' +

        '<div class="socialFunctions">' +
        '<i class="fa-regular fa-heart fa-xl like" onclick=likePost('+ postId +')></i>' +
        '&nbsp; &nbsp;' +
        '<i class="fa-regular fa-comment fa-xl"></i>' +
        '</div>' +

        '<div id="likedBy' + postId + '" class="socialFunctions commentsAndLikes">' +
        '<p id="likes' + postId + '"></p>' +
        '</div>' +

        '<div class="socialFunctions commentsAndLikes">' +
        '<p><b>' + username + '</b>' + description + '</p>' +
        '</div>' +

        '<div id="comments' + postId + '" class="socialFunctions commentsAndLikes">' +

        '</div>' +

        '<hr>' +

        '<div class="commentSection">' +
        '<div class = "postComment">' +
        '<input type="text" id="comment' + postId + '" name="name" class="postCommentInput" placeholder="Añade un comentario..." required onkeypress="search(' + postId + ')"' +
        'minlength="4" maxlength="120" size="10">' +
        '</div>' +

        '<div class = "moreOptions">' +
        '<i class="fa-solid fa-ellipsis"></i>' +
        '</div>' +
        '</div>'

    addPost.prepend(article);
    userWhoPosted.querySelector("#description").value = '';
    userWhoPosted.querySelector("#upload").value = '';

    var articleId = new Date().getTime();

    localStorage.setItem(articleId, article.innerHTML);

}

function search(postId) {

    var userWhoPosted = document.getElementById('main-user');
    var description = document.getElementById("comment" + postId).value;
    var commentSection = document.getElementById("comments" + postId);
    if (event.keyCode === 13) {
        var username = userWhoPosted.querySelector("#username").innerHTML;
        var p = document.createElement("p");
        p.innerHTML = '<b>' + username + ' </b>' + description;
        commentSection.append(p);
        localStorage.setItem(postId + " - " + new Date().getTime(), p.innerHTML);
        console.log(postId);
    }

}

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

function likePost(postId) {

    var userWhoPosted = document.getElementById('main-user');
    var likedBy = document.getElementById("likes" + postId);
    var username = userWhoPosted.querySelector("#username").innerHTML;
    var p = document.createElement("p");
    if(likedBy.innerHTML == "") {
        likedBy.innerHTML = 'A <b> ' + username + ' </b> les gusta esto.';
        localStorage.setItem(postId + " - " + + " - " + " - " + "likes", likedBy.innerHTML);

    } else if(likedBy.innerHTML.split(" ").length == 7) {
        const separateLikes = likedBy.innerHTML.split(" ");
        separateLikes.insert(2, username + " y ");

        liked = separateLikes.join(" ");
        likedBy.innerHTML = liked;
        localStorage.setItem(postId + " - " + + " - " + " - " + "likes", likedBy.innerHTML);

    } else {
        const separateLikes = likedBy.innerHTML.split(" ");
        separateLikes.insert(2, username + ", ");

        liked = separateLikes.join(" ");
        likedBy.innerHTML = liked;
        localStorage.setItem(postId + " - " + + " - " + " - " + "likes", likedBy.innerHTML);

    }


}


function applyCSS(css_link) {
    document.getElementById('change-theme').removeAttribute('href');
    document.getElementById('change-theme').setAttribute('href', css_link);
    scroll(0, 0);

};

