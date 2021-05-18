class Model {
  
    constructor() {

    }
    getData(callback){
     
        fetch('http://localhost/dokumentenFreigabe-backend/index/getWordDocumentsList',{
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
    this.div1 = this.createElement('div');
    this.uplaodForm = document.getElementById('myFile');
    this.uplaodForm.style.position = 'relative';
    this.uplaodForm.style.width = '50%';
    this.list = this.createElement('ul', 'list')
    this.list.append(this.div1);
    this.app.append(this.list);
  
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
 
    const div = this.createElement('div', 'videos');


    console.log("displayed", data);
  if (data.length === 0) {
    const p = this.createElement('p');
    p.textContent = 'No Data passed!';
    this.list.append(p);
  } else {
    data.forEach(docxName => {
    console.log(docxName);
      const li = this.createElement('li');
      li.style.background = '#5300e8';
     
        const span = this.createElement('nav');
        span.textContent = docxName;
        span.style.color = 'white';
        li.style.top = '10%';         
        li.style.left = '10%';
        li.style.width = '50%';
        li.append(span);        
        this.list.append(li); 
        var objekt = this;
        span.addEventListener('contextmenu' , event  => {
          event.preventDefault(); 
          objekt.div   = objekt.createElement('div');
          objekt.div2  = objekt.createElement('div');
          objekt.div2.style.position = 'absolute';
          const ul_0 = objekt.createElement('ul');
          const li_1 = this.createElement('li');
          objekt.div2.style.position = 'relative';
          objekt.div2.style.margin = 0;
          li_1.style.margin = 0;
          ul_0.style.margin = 0;
          li_1.style.background = '#fff2df';
          li_1.style.borderBottom = '1px solid #dd0074';
          const span_1 = objekt.createElement('span','span_1');
          span_1.textContent = 'PDF löschen';
          li_1.append(span_1);
          ul_0.append(li_1);
          objekt.div2.append(ul_0);
          objekt.div.append(objekt.div2);
          span_1.addEventListener('click', event => {
            event.preventDefault();
            var baseURL = "http://localhost/dokumentenFreigabe-backend/";
            var url  = baseURL+ "admin/deletePDF"
            var params = { 
                pdfName: docxName
            };
            console.log(params);
            var posting = $.post(url, params);
            posting.done(function(){
                setTimeout(function(){
                  document.location.reload();
                },2000);
            });
          }); // end of delete PDF vevent
          this.getUserlist(function(data){
            event.preventDefault();
            var cmenu = true;
            if(!cmenu || cmenu === null) return true;
            
          
            const ul = objekt.createElement('ul');
           
            data.forEach(values => {
            const li_0 = objekt.createElement('li');
            const span_0 = objekt.createElement('span', 'span_0');
            span_0.textContent= values.name;
           
            li_0.append(span_0);
            li_0.style.margin = 0;
            li_0.style.background = '#fff2df';
            li_0.style.borderBottom = '1px solid #dd0074';
            ul.append(li_0);
            objekt.div.append(ul);
          span_0.addEventListener('click', event => {
            event.preventDefault();
            console.log(event.target.textContent);
            var baseURL = "http://localhost/dokumentenFreigabe-backend/";
            var url  = baseURL+ "admin/setPDFPermission"
            var params = { 
              userName: event.target.textContent,
              pdfName: docxName
            };
            console.log(params);
            var posting = $.post(url, params);
            posting.done(function(data){
              if(data === 'true'){
                alert(event.target.textContent+'s '+' PDF Permission successfully updated for '+pdfName);
                objekt.hideContextMenu();
              } 
            });
     
          }); // end of set PDF permission event
          
          document.addEventListener('mousedown', event  => {
            event.preventDefault(); 
            var button = event.button;
            if ( button === 1){
              console.log("button clicked");
              objekt.hideContextMenu();
            }
          });
  
          document.addEventListener('keydown', event  => {
            if (event.code === 'Escape') {
              console.log("keybord clicked "+ event.code);
              objekt.hideContextMenu();
              console.log("menu hidden");
            }
          });
          }); // end of get userlist
          var menuPosition = objekt.getPosition(event);
          console.log(menuPosition);
          document.body.append(objekt.div);
          objekt.div.style.position = 'absolute';
          objekt.div.style.left = menuPosition.x + "px";
          objekt.div.style.top = menuPosition.y + "px";
          return false
        }); 
        });  // end of contextmenu event 

    }); // end of data forEach
}
}
 getUserlist(callback){
  fetch('http://localhost/dokumentenFreigabe-backend/admin/getNonAdminUsers',{
    method: 'GET',
   })
  .then(response => response.json())    
  .then(data => {
    console.log(data);
    if(typeof data !== 'string'){
      callback(data);
    }
    if(typeof data === 'string'){
      return;
    }
})
}
 bindSelectedDocument(){
     this.list.addEventListener('click', event => {
        event.preventDefault();
        console.log("fired " + event.target.textContent);
        
        var baseURL = "http://localhost/dokumentenFreigabe-backend/";
        var url  = baseURL+ "index/getDocxBinary"
        var params = { 
          fileName: event.target.textContent,
           
            };
        var obj = this;
        var posting = $.post(url, params);
        posting.done(function(){
            this.iframe = document.getElementById('iframe');
            setTimeout(function(){
               this.iframe.src = url;
            }, 1000)
       
            this.iframe.style.display = "block";
            obj.list.append(this.iframe); 
          
        
                      
        })
       
      });
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

contextmenue(cmenu,e,data){

//build the dom-elements here:
if(!cmenu || cmenu === null) return true;

this.div.setAttribute("id", "context");
this.div = this.createElement('div', 'absolute');
this.div2  = objekt.createElement('div');
const ul = this.createElement('ul');
data.forEach(value => {
  const li_0 = this.createElement('li');
  const span_0 = this.createElement('span', 'span_0');
  span_0.textContent= value.name;
 
  li_0.append(span_0);
  li_0.style.margin = 0;
  li_0.style.background = '#fff2df';
  li_0.style.borderBottom = '1px solid #dd0074';
  ul.append(li_0);
  this.div.append(ul);
})

var menuPosition = this.getPosition(e);
console.log(menuPosition);
document.body.append(this.div);
this.div2.style.margin = 0;
this.div2.style.position = 0;
this.div.style.position = 'absolute';
this.div.style.left = menuPosition.x + "px";
this.div.style.top = menuPosition.y + "px";

return false;
}

uploadFile(){
 
  this.submit = document.getElementById("submit");


  this.submit.addEventListener('click', event => {
  event.preventDefault();
  this.file = document.getElementById("myFile");
    let body = new FormData(this.file);
    body.append('myfile', $('#uploadFile')[0].files[0])
    console.log($('#uploadFile')[0].files[0]);
    var baseURL = "http://localhost/dokumentenFreigabe-backend/";
    var url = baseURL + "index/uploadFile"
    $.ajax({
      url: url,  
      type: 'POST',
      data: body,
      success:function(data){
        console.log(data);
      },
    cache: false,
    contentType: false,
    processData: false
  });

  });
  
}


}
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    var obj = this;
    this.model.getData(function(data){
        obj.view.displayData(data);
        obj.view.bindSelectedDocument();
    });
    this.view.uploadFile();
        
    }
}

const app = new Controller(new Model(),new View() );
         
         
  


 