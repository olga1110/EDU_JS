var pageNumber = 1;
function sendRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://jsonplaceholder.typicode.com/photos?_page=' + pageNumber + '&_limit=10',
        true);
    xhr.timeout = 15000;
    xhr.ontimeout = function () {
        console.log('Время вышло');
    };

    xhr.send();

    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
            }
        }
    }
}

window.onscroll = function () {
    if (window.scrollY <= document.body.offsetHeight - window.innerHeight) {
        sendRequest();
        pageNumber++;
    }

}