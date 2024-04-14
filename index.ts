// Import stylesheets
// import './style.css';

const form: HTMLFormElement = document.querySelector('#defineform')!;

form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
  .then(function (response) {
      return response.json();
  })
  .then(function(data) {
      appendData(data);
  })
  .catch(function(err) {
      console.log('error: ' + err);
  })

    return false; // prevent reload

};
function appendData(data) {
  let mainContainer = document.getElementById("quotes")!;
  let w = document.getElementById("word")!;
  let definition = document.getElementById("definition")!;
  let phonetics = document.getElementById("phenotics")!;
  let synonyms = document.getElementById("synonyms")!;
  w.innerHTML = data[0].word;
  
  // d.innerHTML = data[0].meanings[0].definitions[0].definition;
  // p.innerHTML = `${data[0].phonetics[0].text}`;
  let phoneticFound = false;
  
  for (let i = 0; i < data[0].phonetics.length; i++) {
  if (data[0].phonetics[i].text) {
    phonetics.innerHTML = data[0].phonetics[i].text;
    phoneticFound = true;
    break;
  }
  }
  if (!phoneticFound) {
    phonetics.innerHTML = "N/A";
  }
  let definitionFound = false;

for (let i = 0; i < data[0].meanings.length; i++){
  if(data[0].meanings[i].definitions[0].definition){
    definition.innerHTML = `<strong>Definition:</strong> ${data[0].meanings[i].definitions[0].definition}`;
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
  synonyms.innerHTML =`<strong>Synonyms:</strong>`;

  for(let i = 0; i < data[0].meanings.length; i++){
   if(data[0].meanings[i].synonyms[0]){
     let synonymsThing = document.createElement("ul");
     synonymsThing.textContent = data[0].meanings[i].synonyms;
     synonyms.appendChild(synonymsThing);
   }
  }
  console.log(data[0])
  // mainContainer.appendChild(w);
  // mainContainer.appendChild(p);
}