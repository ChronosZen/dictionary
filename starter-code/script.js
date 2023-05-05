let search = document.getElementById("search");
let word = document.getElementById("words");
let displayword = document.getElementById("displayword");
let read = document.getElementById("read");
let playsound = document.getElementById("playsound");
let meanings_section = document.getElementById("meanings");
let psource = document.getElementById("psource");
let fonttype = document.getElementById("fonttype");
let toggle = document.getElementById("toggle");
let sound = {soundlink: ""};
search.addEventListener ('click',  () => {
    let vocab =  document.getElementById("vocab");
    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${vocab.value}`;
    displayword.innerHTML= "";
    read.innerHTML = "";
    meanings_section.innerHTML ="";
    psource.innerHTML= "";
    playsound.innerHTML ="";
    getmeanings(apiURL);
  });

toggle.addEventListener('click', () =>{

  let element = document.body;
  console.log(element)
  element.classList.toggle("toggle");
})

  async function getmeanings(apiURL){
    let respond = await fetch(apiURL);
    if (respond.status === 404) {
      meanings_section.innerHTML = `<p>Sorry, the word you searched for could not be found.</p>`;
      return;
    }
    let data = await respond.json();
    let noun =[];
    let verb =[];
    let adj =[];
    let adv =[];
    let nounsyn = "";
    let verbsyn = "";
    let adjsyn = "";
    let advsyn = "";
    displayword.innerHTML= data[0].word;
    read.innerHTML = data[0].phonetic;
    
    // <img id="playsound" src="./assets/images/icon-play.svg" alt="">
    playsound.innerHTML = '<img src="./assets/images/icon-play.svg" alt="" onclick ="phonetic()">'
    for(let i = 0; i<data[0].meanings.length;i++){
      switch (data[0].meanings[i].partOfSpeech){
        case "noun":
          for(let j = 0; j<data[0].meanings[i].definitions.length;j++){
           noun.push(data[0].meanings[i].definitions[j].definition);
          }
          for(let j = 0; j<data[0].meanings[i].synonyms.length;j++){
            nounsyn += `${data[0].meanings[i].synonyms[j]}, `
           }     
          break;
        case "verb":
          for(let j = 0; j<data[0].meanings[i].definitions.length;j++){
            verb.push(data[0].meanings[i].definitions[j].definition);
           }
           for(let j = 0; j<data[0].meanings[i].synonyms.length;j++){
            verbsyn += `${data[0].meanings[i].synonyms[j]}, `
           }  
          break;
        case "adjective":
          for(let j = 0; j<data[0].meanings[i].definitions.length;j++){
            adj.push(data[0].meanings[i].definitions[j].definition);
           }
           for(let j = 0; j<data[0].meanings[i].synonyms.length;j++){
            adjsyn += `${data[0].meanings[i].synonyms[j]}, `
           }  
          break;
        case "adverb":
          for(let j = 0; j<data[0].meanings[i].definitions.length;j++){
            adv.push(data[0].meanings[i].definitions[j].definition);
           }
           for(let j = 0; j<data[0].meanings[i].synonyms.length;j++){
            advsyn += `${data[0].meanings[i].synonyms[j]}, `
           }  
          break;
      }

  }
  let source= document.createElement('a');
  source.href = data[0].sourceUrls[0];
  source.textContent = data[0].sourceUrls[0];
  psource.innerHTML= "Source ";
  psource.appendChild(source);
      for(let i = 0; i<data[0].phonetics.length;i++){
      if (data[0].phonetics[i].audio != "") {
          sound.soundlink = data[0].phonetics[i].audio;
        }}
    console.log(data[0]);
    console.log(data[0].meanings[0].partOfSpeech);
    console.log(data[0].meanings[0].definitions[0].definition);
    console.log(data[0].meanings[0].synonyms[0]);
    console.log(data[0].phonetics[0].text);
    console.log(data[0].phonetics[0].audio);
    if(noun.length>0){
      meanings_section.innerHTML += `<div class="meanning">
      <h3 class="h3"><span>noun</span></h3>
      <ul class="ul>Meaning`;     
    for(let k = 0; k<noun.length;k++){   
        meanings_section.innerHTML += `<li class="li">${noun[k]}</li>`;
    } 
    if(nounsyn ==""){
      meanings_section.innerHTML += `</ul>`}
     else{
     meanings_section.innerHTML += `</ul>
      <p class="ul">Synonyms <span class="span">${nounsyn.slice(0, -2)}</span></div>`}}

     if(verb.length>0){
      meanings_section.innerHTML += `<div class="meanning">
      <h3 class="h3"><span>verb</span></h3>
      <ul class="ul">Meaning`;     
    for(let k = 0; k<verb.length;k++){   
        meanings_section.innerHTML += `<li class="li">${verb[k]}</li>`;
    }
    if(verbsyn ==""){
      meanings_section.innerHTML += `</ul>`}
     else{
     meanings_section.innerHTML += `</ul>
     <p class="ul">Synonyms <span class="span">${verbsyn.slice(0, -2)}</span></div>`}}

     if(adj.length>0){
      meanings_section.innerHTML += `<div class="meanning">
      <h3 class="h3"><span>adjective</span></h3>
      <ul class="ul">Meaning`;     
    for(let k = 0; k<adj.length;k++){   
        meanings_section.innerHTML += `<li class="li">${adj[k]}</li>`;
    }
    if(adjsyn ==""){
      meanings_section.innerHTML += `</ul>`}
     else{
     meanings_section.innerHTML += `</ul>
     <p class="ul">Synonyms <span class="span">${adjsyn.slice(0, -2)}</span></div>`}}

     if(adv.length>0){
      meanings_section.innerHTML += `<div class="meanning">
      <h3 class="h3"><span>adverb</span></h3>
      <ul class="ul">Meaning`;     
    for(let k = 0; k<adv.length;k++){   
        meanings_section.innerHTML += `<li class="li">${adv[k]}</li>`;
    }  
    if(advsyn ==""){
      meanings_section.innerHTML += `</ul>`}
     else{
      meanings_section.innerHTML += `</ul>
      <p class="ul">Synonyms <span class="span">${advsyn.slice(0, -2)}</span></div>`}
     }
}
function phonetic(){
 let audio = new Audio(sound.soundlink);
 audio.play();
}
function changeFont(){
  document.getElementById("FontDropdown").classList.toggle("show");
}
function sansserif(){
  document.getElementById("main").style.fontFamily = "sans-serif";
  document.getElementById("FontDropdown").classList.remove("show");
  fonttype.textContent="Sans Serif";
}
function serif(){
  document.getElementById("main").style.fontFamily = "serif";
  document.getElementById("FontDropdown").classList.remove("show");
  fonttype.textContent="Serif";
}
function mono(){
  document.getElementById("main").style.fontFamily = "monospace";
  document.getElementById("FontDropdown").classList.remove("show");
  fonttype.textContent="Mono";
}