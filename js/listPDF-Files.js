class Model {
  
    constructor() {

    }
    getData(callback){
     
        fetch('http://localhost/dokumentenFreigabe-backend/index/getPDFFileNames',{
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
    data.forEach(pdfName => {
      const li = this.createElement('li');
      li.style.background = '#5300e8';
      if(pdfName.endsWith('jpg') == false){
        const span = this.createElement('nav');
        span.textContent = pdfName;
        span.style.color = 'white';
        li.style.top = '10%';         
        li.style.left = '10%';
        li.style.width = '50%';
        li.append(span);        
        this.list.append(li); 
        var objekt = this;
        span.addEventListener('contextmenu' , event  => {
          event.preventDefault(); 
          this.getUserlist(function(data){
            event.preventDefault();
            var cmenu = true;
            if(!cmenu || cmenu === null) return true;
            
            objekt.div = objekt.createElement('div', 'absolute');
            objekt.div.setAttribute("id", "context");
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
        pdfName: pdfName
      };
      console.log(params);
      var posting = $.post(url, params);
      posting.done(function(data){
        if(data === 'true'){
          alert(event.target.textContent+'s '+' PDF Permission successfully updated for '+pdfName);
          objekt.hideContextMenu();
        } 
      


      })
    })
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
  })
 
  var menuPosition = objekt.getPosition(event);
  console.log(menuPosition);
  document.body.append(objekt.div);
  objekt.div.style.position = 'absolute';
  objekt.div.style.left = menuPosition.x + "px";
  objekt.div.style.top = menuPosition.y + "px";

  return false
});
})
      }
    })
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
 bindSelectedPDF(){
     this.list.addEventListener('click', event => {
        event.preventDefault();
        console.log("fired " + event.target.textContent);
        
        var baseURL = "http://localhost/dokumentenFreigabe-backend/";
        var url  = baseURL+ "admin/getPdfBinary"
        var params = { 
          fileName: event.target.textContent,
           
            };
        var obj = this;
        var posting = $.post(url, params);
        posting.done(function(){
            this.embed = document.getElementById('embed');
            setTimeout(function(){
               this.embed.src = url;
            }, 1000)
       
            this.embed.style.display = "block";
            obj.list.append(this.embed); 
        
                      
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
        obj.view.bindSelectedPDF();
    });
  
        
    }
}

const app = new Controller(new Model(),new View() );
         
         
  


 