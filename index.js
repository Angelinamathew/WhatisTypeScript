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
function appendData(data) {
    var mainContainer = document.getElementById("quotes");
    var w = document.getElementById("word");
    var definition = document.getElementById("definition");
    var phonetics = document.getElementById("phenotics");
    var synonyms = document.getElementById("synonyms");
    w.innerHTML = data[0].word;
    // d.innerHTML = data[0].meanings[0].definitions[0].definition;
    // p.innerHTML = `${data[0].phonetics[0].text}`;
    var phoneticFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
        if (data[0].phonetics[i].text) {
            phonetics.innerHTML = data[0].phonetics[i].text;
            phoneticFound = true;
            break;
        }
    }
    if (!phoneticFound) {
        phonetics.innerHTML = "N/A";
    }
    var definitionFound = false;
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].definitions[0].definition) {
            definition.innerHTML = "<strong>Definition:</strong> ".concat(data[0].meanings[i].definitions[0].definition);
            definitionFound = true;
            break;
        }
    }
    if (!definitionFound) {
        definition.innerHTML = "N/A";
    }
    // if (data[0].meanings[0].definitions[0].synonyms) {
    //   s.innerHTML = `${data[0].meanings[0].definitions[0].synonyms}`;
    // } else {
    //   s.innerHTML = "Not available";
    // }
    synonyms.innerHTML = "<strong>Synonyms:</strong>";
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].synonyms[0]) {
            var synonymsThing = document.createElement("ul");
            synonymsThing.textContent = data[0].meanings[i].synonyms;
            synonyms.appendChild(synonymsThing);
        }
    }
    console.log(data[0]);
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
}
