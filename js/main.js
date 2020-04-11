'use strict';

let refJson = [
    'js/json/signin.json', 
    'js/json/signup.json', 
    'js/json/interview.json', 
    'js/json/colorsheme.json', 
    'js/json/addpost.json'
];

let body = document.querySelector('body');
let i = 3;
var xhr = new XMLHttpRequest();
xhr.open('GET', refJson[i], false);
xhr.send(); 
let fileJson = JSON.parse(xhr.responseText);

let linkRefJson = 0;
for(let q = 0; q<refJson.length; q++){
    linkRefJson = document.createElement('button');
    linkRefJson.textContent = refJson[q].slice(8, -5);
    body.appendChild(linkRefJson);
}
if(document.onclick == linkRefJson){
    i++;
}

function createName(fileJson){
    let name = document.createElement('h1');
    name.className ="main" + "__title";
    let cls ="main" + "__title";
    name.textContent = fileJson.name;
    body.appendChild(name);
}
function createFields(fileJson){
    for(let j = 0; j < fileJson.fields.length; j++){
        let id = 'form' + `${j}`;
        createLabel(fileJson, j, id);
        createInput(fileJson, j, id);
    }

}
function createLabel(fileJson, j, id){
    if(fileJson.fields[j].hasOwnProperty("label")){
        let label = document.createElement('label');
        label.className ="main" + "__label";
        label.htmlFor = id;
        label.textContent = fileJson.fields[j].label;
        body.appendChild(label);
    }
}
function createInput(fileJson, j, id){
    let fileInput = fileJson.fields[j].input;
    let input = document.createElement('input');
    input.className ="main" + "__input";
    input.type = fileInput.type;
    createTextarea(fileJson, j, id);
    if(fileJson.fields[j].hasOwnProperty('label')){input.id = id;}
    if(fileInput.hasOwnProperty('required')) {input.required = fileInput.required;}
    if(fileInput.hasOwnProperty('colors')) {createBlockWithColors(fileJson, j);}
    if(fileInput.hasOwnProperty('placeholder')) {input.placeholder = fileInput.placeholder;}
    if(fileInput.hasOwnProperty('mask')){input.mask = fileInput.mask;}
    if(fileInput.hasOwnProperty('multiple')){input.multiple = fileInput.multiple;}
    if(fileInput.hasOwnProperty('filetype')){input.filetype = fileInput.filetype;}
    if(fileInput.hasOwnProperty('colors') || fileInput.type === "textarea") {}
    else{
        body.appendChild(input);
    }

}
function createBlockWithColors(fileJson, j){
    let fileInput = fileJson.fields[j].input;
    for (let k = 0; k < fileInput.colors.length; k ++){
        let inputColors = document.createElement('input');
        inputColors.className ="main" + "__colors-input";
        inputColors.type = fileInput.type;
        inputColors.value = fileInput.colors[k];
        body.appendChild(inputColors);
    }
}
function createTextarea(fileJson, j, id){
    let fileInput = fileJson.fields[j].input;
    if(fileInput.type === "textarea"){
        let textarea = document.createElement('textarea');
        textarea.className ="main" + "__textarea";
        textarea.rows = '7';
        textarea.id = id;
        body.appendChild(textarea);
    }
}
function createReference(fileJson){
    let references = fileJson.references;
    for(let j = 0; j < references.length; j++){
        if(i == 1 || i == 0){
            createLink(fileJson, j);
        }
        if(i == 2 || i == 4){
            createInputReference(fileJson, j);
            if( j = 1){
                createLink(fileJson, j);
            }
        }
        
    }
    
}
function createLink(fileJson ,j){
    let link = document.createElement('a');
    link.className ="main" + "__link";
    if(fileJson.references[j].hasOwnProperty('text without ref')){
        let textWithoutRef = document.createElement('p');
        textWithoutRef.className ="main" + "__text";
        textWithoutRef.textContent = fileJson.references[j]["text without ref"];
        body.appendChild(textWithoutRef);
    }
    link.href ="#" + fileJson.references[j].ref;
    link.textContent =  fileJson.references[j].text;
    body.appendChild(link);

}
function createInputReference(fileJson, j){
    let inputW = document.createElement("input");
    inputW.type = fileJson.references[j].input.type;
    inputW.required = fileJson.references[j].input.required;
    body.appendChild(inputW);
}
function createButton(fileJson){
    for(let d = 0; d < fileJson.buttons.length; d++){
        let btn = document.createElement('button'); 
        btn.textContent = fileJson.buttons[d].text;
        body.appendChild(btn);
    }
}
if(i == 3){
    createName(fileJson);   
    createFields(fileJson);
}
else{
    createName(fileJson);   
    createFields(fileJson);
    createReference(fileJson);
    createButton(fileJson);
}
