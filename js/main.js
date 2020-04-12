'use strict';

let refJson = [
    'js/json/signin.json', 
    'js/json/signup.json', 
    'js/json/interview.json', 
    'js/json/colorsheme.json', 
    'js/json/addpost.json'
];

let body = document.querySelector('body');
let i = 2;
var xhr = new XMLHttpRequest();
xhr.open('GET', refJson[i], false);
xhr.send(); 
let fileJson = JSON.parse(xhr.responseText);

// let linkRefJson = 0;
// for(let q = 0; q<refJson.length; q++){
//     linkRefJson = document.createElement('button');
//     linkRefJson.textContent = refJson[q].slice(8, -5);
//     body.appendChild(linkRefJson);
// }
// if(document.onclick == linkRefJson){
//     i++;
// }
let name = document.createElement('form');
function createName(fileJson){
    name.className ="main" + "__form";
    name.action = fileJson.name;
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
        name.appendChild(label);
    }
}
let blockCheckboxText =document.createElement('div');
blockCheckboxText.className = "main__group-techo";
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
    if(fileInput.hasOwnProperty('mask')){
        input.classList ="main__input " + "main__input" + `${j}`;
        input.type = 'text';
        jQuery(function($){
            $(".main__input" + `${j}`).mask(fileInput.mask);    
         });
    }
    if(fileInput.hasOwnProperty('multiple')){input.multiple = fileInput.multiple;}
    if(fileInput.hasOwnProperty('filetype')){
        input.accept = 'image/' + fileInput.filetype[0] + ',' + 'image/' + fileInput.filetype[1] + ',' + 'image/' + fileInput.filetype[2];   
    }
    if(fileInput.hasOwnProperty('technologies')){
        name.appendChild(blockCheckboxText);
        for(let k = 0; k < fileInput.technologies.length; k++) {
            createTechno(fileJson, j, k);
        }
    }
    if(fileInput.type == "file"){
        input.className = "main__input-file";
    }
    if(fileInput.hasOwnProperty('colors') || fileInput.type === "textarea" ) {}
    else{
        name.appendChild(input);
    }
}
function createBlockWithColors(fileJson, j){
    let inputColors = document.createElement('input');
    let fileInput = fileJson.fields[j].input;
    let datalist = document.createElement('datalist');
    inputColors.setAttribute('list', "colors");
    datalist.id = "colors";
    for (let k = 0; k < fileInput.colors.length; k ++){
        let option = document.createElement('option');
        option.value = fileInput.colors[k];
        inputColors.className ="main" + "__colors-input";
        inputColors.type = fileInput.type;
        inputColors.value = fileInput.colors[0];
        datalist.appendChild(option);
    }
    name.appendChild(inputColors);
    name.appendChild(datalist);
}
function createTechno(fileJson, j, k){
    let fileInput = fileJson.fields[j].input;
    let block = document.createElement('div');
    let text = document.createElement('p');
    let checkbox = document.createElement('input');
    block.className = "main__techno";
    checkbox.type = "checkbox";
    checkbox.className = "main__checkbox";
    text.textContent = fileInput.technologies[k];
    text.className = "main__checkbox-text";
    // name.appendChild(blockCheckboxText);
    blockCheckboxText.appendChild(block);
    block.appendChild(checkbox);
    block.appendChild(text);
}
function createTextarea(fileJson, j, id){
    let fileInput = fileJson.fields[j].input;
    if(fileInput.type === "textarea"){
        let textarea = document.createElement('textarea');
        textarea.className ="main" + "__textarea";
        textarea.rows = '7';
        textarea.id = id;
        name.appendChild(textarea);
    }
}
let blockLink = document.createElement('div');
blockLink.className = "main__group-link";
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
    name.appendChild(blockLink);
    
}
function createLink(fileJson ,j){
    if(true){
        let link = document.createElement('a');
        link.className ="main" + "__link";
        if(fileJson.references[j].hasOwnProperty('text without ref')){
            let textWithoutRef = document.createElement('p');
            textWithoutRef.className ="main" + "__text";
            if(i = 2){
                textWithoutRef.className ="main" + "__text-without-margin";
            }
            textWithoutRef.textContent = fileJson.references[j]["text without ref"];
            blockLink.appendChild(textWithoutRef);
        }
        link.href ="#" + fileJson.references[j].ref;
        link.textContent =  fileJson.references[j].text;
        blockLink.appendChild(link);
    }
}
function createInputReference(fileJson, j){
    let inputW = document.createElement("input");
    inputW.className = "main__checkbo-in-referense";
    inputW.type = fileJson.references[j].input.type;
    inputW.required = fileJson.references[j].input.required;
    blockLink.appendChild(inputW);
}
function createButton(fileJson){
    let groupBtn = document.createElement('div');
    groupBtn.className ="main" + "__group-button";
    name.appendChild(groupBtn);
    for(let d = 0; d < fileJson.buttons.length; d++){
        let btn = document.createElement('button'); 
        btn.className ="main" + "__button";
        btn.textContent = fileJson.buttons[d].text;
        groupBtn.appendChild(btn);
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
