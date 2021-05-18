class Model {
  
  constructor() {

  }

   
  getData(callback){
     
    fetch('http://localhost/dokumentenFreigabe-backend/admin/adminView',{
      method: 'GET',
     })
    .then(response => response.json())    
    .then(data => callback(data));
     
  }
}

class View {
constructor() {
  this.app = this.getElement('#root')

  // The title of the app
  this.headline = this.createElement('h1');
  this.headline.textContent = 'AdminView';
  this.title = this.createElement('h2')
  this.commandList = this.createElement('ul', 'command-list')
  this.commandList.style.top = '10';         
  this.commandList.style.left = '100%';
  this.commandList.style.background ='#c6f68d';
  this.app.append(this.headline, this.commandList);
 
}
// Create an element with an optional CSS class
createElement(tag, className) {
  const element = document.createElement(tag)
  if (className) element.classList.add(className)
    return element
  }

// Retrieve an element from the DOM
getElement(selector) {
  const element = document.querySelector(selector);
  return element;
}

displayData(data){
  console.log("displayed", data);
  if (data.length === 0) {
    const p = this.createElement('p');
    p.textContent = 'No Data passed!';
    this.commandList.append(p);
  } else {
    data.forEach(value => {
      const li = this.createElement('li');
      li.style.background = '#5300e8';
      if(value.endsWith('jpg') == false){
        const span = this.createElement('nav');
        span.textContent = value;
        span.style.color = 'white';
        li.style.top = '10%';         
        li.style.left = '10%';
        li.style.width = '50%';
        li.append(span);        
        this.commandList.append(li); 
      }
    })
  }
}

dropContextMenu(){
this.commandList.addEventListener('contextmenu', event => {
   
  var cmenu = true;
  this.contextmenue(cmenu, event);
  event.preventDefault();
  console.log("fired " + event.target.textContent);
  
  document.addEventListener('mousedown', event  => {
    event.preventDefault(); 
    var button = event.button;
    if ( button === 1){
      console.log("button clicked");
      this.hideContextMenu();
    }
   
   })

  document.addEventListener('keydown', event  => {
    if (event.code === 'Escape') {
        console.log("keybord clicked "+ event.code);
        this.hideContextMenu();
        console.log("menu hidden");
    }
  
  });

const pdf = document.getElementsByClassName('span_0')[0];
pdf.addEventListener('click', event => {
    event.preventDefault();
    setTimeout(function(){
      document.location.href = "listPDF-files.html";
    },500);
  });

  const userList = document.getElementsByClassName('span_1')[0];
  userList.addEventListener('click', event => {
    event.preventDefault();
    setTimeout(function(){
      document.location.href = "listUsers.html";
    },500);
  });

  const xmlGetRequest = document.getElementsByClassName('span_2')[0];
  xmlGetRequest.addEventListener('click', event => {
    event.preventDefault();
  
      
    setTimeout(function(){
      document.location.href = "http://localhost/dokumentenFreigabe-frontend/admin/xmlView.html";
    },500);
     
  });


  const videoParams = document.getElementsByClassName('span_3')[0];
  videoParams.addEventListener('click', event => {
    event.preventDefault();
  
      
    setTimeout(function(){
      document.location.href = "http://localhost/dokumentenFreigabe-frontend/admin/listVideoParams.html";
    },500);
     
  });

  const videoUpload = document.getElementsByClassName('span_4')[0];
  videoUpload.addEventListener('click', event => {
    var baseURL = "http://localhost/dokumentenFreigabe-frontend/"
    var url = baseURL + "admin/videoUpload.html";
    setTimeout(function(){
      document.location.href = url;
    }, 500);
  });
  
  const wordDocuments =  document.getElementsByClassName('span_5')[0];
  wordDocuments.addEventListener('click', event => {
    event.preventDefault();
    setTimeout(function(){
      document.location.href = "http://localhost/dokumentenFreigabe-frontend/admin/word.html";
    },500);
  });

  const logout =  document.getElementsByClassName('span_6')[0];
  logout.addEventListener('click', event => {
    event.preventDefault();
    console.log('logout fired');
    fetch('http://localhost/dokumentenFreigabe-backend/index/logout',{
      method: 'GET',
     })
    .then(response =>{
      console.log(response),
      response.json()
      
    })    
    .then(data => {
      console.log(data);
      setTimeout(function(){
        document.location.href = "http://localhost/dokumentenFreigabe-frontend/index.html";
      },500);
    });

   
   });
}, false);
}


iterateNodes(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === 4) {
      document.body.innerHTML += nodes[i].textContent + "<br>"
    };
      if (nodes[i].childNodes.length) {
        iterateNodes(nodes[i].childNodes)
      }
    }
}



hideContextMenu(){
this.div.remove();
}

getPosition(e) {
var posx = 0;
var posy = 0;

if (!e) var e = window.event;
 
  posx = e.clientX ;
                     
  posy = e.clientY ; 

console.log('position handled');
return {
  x: posx,
  y: posy
}
}


contextmenue(cmenu,e){

//build the dom-elements here:
if(!cmenu || cmenu === null) return true;

this.div = this.createElement('div', 'absolute');
this.div.setAttribute("id", "context");

const ul = this.createElement('ul');

const li_0 = this.createElement('li');
const span_0 = this.createElement('span', 'span_0');
span_0.textContent= 'Get-PDF-List';
li_0.append(span_0);
li_0.style.margin = 0;
li_0.style.background = '#fff2df';
li_0.style.borderBottom = '1px solid #dd0074';


const li_1 = this.createElement('li');
const span_1 = this.createElement('span', 'span_1');
span_1.textContent= 'User-Liste';
li_1.append(span_1);
li_1.style.margin = 0;
li_1.style.background = '#fff2df';
li_1.style.borderBottom = '1px solid #dd0074';


const li_2 = this.createElement('li');
const span_2 = this.createElement('span', 'span_2');
span_2.textContent= 'Get XML-Object';
li_2.append(span_2);
li_2.style.margin = 0;
li_2.style.background = '#fff2df';
li_2.style.borderBottom = '1px solid #dd0074';

const li_3 = this.createElement('li');
const span_3 = this.createElement('span', 'span_3');
span_3.textContent= 'Get Video List';
li_3.style.background = '#fff2df';
li_3.style.margin =0;
li_3.style.borderBottom = '1px solid #dd0074';
li_3.append(span_3);

const li_4 = this.createElement('li');
const span_4 = this.createElement('span', 'span_4');
span_4.textContent= 'Upload Video';
li_4.style.background = '#fff2df';
li_4.style.margin =0;
li_4.style.borderBottom = '1px solid #dd0074';
li_4.append(span_4);

const li_5 = this.createElement('li');
const span_5 = this.createElement('span', 'span_5');
span_5.textContent= 'Get Word Document List';
li_5.style.background = '#fff2df';
li_5.style.margin =0;
li_5.style.borderBottom = '1px solid #dd0074';
li_5.append(span_5);

const li_6 = this.createElement('li');
const span_6 = this.createElement('span', 'span_6');
span_6.textContent= 'Abmelden';
li_6.style.background = '#fff2df';
li_6.append(span_6);

li_6.append(span_6);
ul.append(li_0, li_1, li_2, li_3, li_4, li_5,li_6);
this.div.append(ul);


var menuPosition = this.getPosition(e);
console.log(menuPosition);
document.body.append(this.div);
this.div.style.position = 'absolute';
this.div.style.left = menuPosition.x + "px";
this.div.style.top = menuPosition.y + "px";

return false;
}
}


class Controller {
constructor(model, view) {
  this.model = model;
  this.view = view;
  var obj = this;
  this.model.getData(function(data){
    obj.view.displayData(data);
  });
  
  this.view.dropContextMenu();
}
}

const app = new Controller(new Model(),new View() );
       
       



