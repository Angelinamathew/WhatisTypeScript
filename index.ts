import './style.css';

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
  // let p = document.createElement("p");
  // let w = document.createElement("p");
  let w = document.getElementById("word")!;
  let p = document.getElementById("definition")!;
  w.innerHTML = data[0].word;
  p.innerHTML = data[0].meanings[0].definitions[0].definition;
  console.log(data[0])
  // mainContainer.appendChild(w);
  // mainContainer.appendChild(p);
}