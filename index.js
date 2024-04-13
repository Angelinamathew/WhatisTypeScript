// Import stylesheets
// import './style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    console.log(formData);
    var text = formData.get('defineword');
    console.log(text);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(text))
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        appendData(data);
    })
        .catch(function (err) {
        console.log('error: ' + err);
    });
    return false; // prevent reload
};
fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    appendData(data);
})
    .catch(function (err) {
    console.log('error: ' + err);
});
function appendData(data) {
    var mainContainer = document.getElementById("quotes");
    // let p = document.createElement("p");
    // let w = document.createElement("p");
    var w = document.getElementById("word");
    var p = document.getElementById("definition");
    w.innerHTML = data[0].word;
    p.innerHTML = data[0].meanings[0].definitions[0].definition;
    console.log(data[0]);
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
}
