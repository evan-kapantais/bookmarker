// Listen for form submit

document.getElementById("myForm")
.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();
    

    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url) {
    console.log(url);

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.forEach(function(item){
        if (url == item.url) {
            bookmarks.splice(bookmarks.indexOf(item), 1);
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    bookmarks.forEach(
        item => bookmarksResults.innerHTML += 
        '<div class="card bg-light text-dark card-body">' +
            '<h3>' + item.name + 
            '<a class = "btn btn-default" target = "_blank" href = "'+item.url+'">Visit</a>' + 
            '<a  onclick = "deleteBookmark(\''+item.url+'\')" class = "btn btn-danger" href = "#">Delete</a>' +
            '</h3>' + 
        '</div>'
    );
}

function validateForm(siteName, siteUrl) {

    if (!siteName || !siteUrl) {
        alert('Please fill in both forms');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please provide a valid url');
        return false;
    }

    return true;
}