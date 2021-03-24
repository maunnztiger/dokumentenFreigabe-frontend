class Model {
  
    constructor() {
  
    }
  
     
    getData(callback){
       fetch('http://localhost/dokumentenFreigabe-backend/admin/listVideoParams',{
        method: 'GET',
       })
      .then(response => response.json())    
      .then(data => {
          console.log(data)
          var images = [];
          images.push("../images/images/BlackbookSessions.jpg");
          images.push("../images/images/Detroit.jpg"); 
          this.object = [];
          for(var i =0; i< data['videos'].length; i++){
                this.object.push({
                    name: data['videos'][i],
                    time: data['videoDurationTime'][i],
                    image: images[i],
                    plays : data['plays'][i]
                })
            }
            callback(this.object);
      });
    }
}
  
  class View {
  constructor() {
    this.app = this.getElement('#root')
  
    // The title of the app
    this.headline = this.createElement('h1');
    this.headline.textContent = 'Video-Liste';
    this.title = this.createElement('h2')
    this.commandList = this.createElement('ul', 'command-list')
    this.commandList.style.top = '10';         
    this.commandList.style.left = '100%';
    this.commandList.style.background ='#aaabf6';
    this.div = this.createElement('div');
   
    
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
      this.nav = this.createElement('nav', 'nav_menu');
      this.nav.style.width = '100%';
      this.nav.style.padding = '2%';
      this.nav.style.float = 'left';
      const span2 = this.createElement('span');
      span2.textContent = 'Rechtsklick zum Freischalten!';
      this.nav.append(span2);
      this.commandList.append(this.nav);
      data.forEach(value => {
       
        const li = this.createElement('li');
        li.style.background ='#aaabf6';
        if(value.image.endsWith('jpg')){
          this.img = this.createElement('img',  'image');
          this.img.src = value.image;
          this.img.textContent = value.name;
          this.img.style.display = 'inline-block';
          this.img.style.felxDirection = 'column';
          this.img.style.margin = '1,5%';
          this.img.style.padding = '1%';
          this.img.style.width = '100%';
          const div_img = this.createElement('div')
          div_img.style.float = 'left';
          div_img.style.width = '100%';
          div_img.style.padding = '1%';
          div_img.append(this.img);
          this.commandList.append(div_img);
          this.commandList.style.width = '100%';
        } 
      
        if(value.name.endsWith('jpg') == false){
          const div_two = this.createElement('div');
          const contain = this.createElement('div');
          const nav = this.createElement('nav');
          nav.style.margin = '1%';
          nav.textContent = parseInt(value.plays);
          contain.style.width = '2.4%';
          contain.style.height = '10px';
          contain.style.backgroundColor = 'black';
          contain.style.background =  'linear-gradient(to right bottom, #aaabf6 50%, black 50%)';
          contain.style.transform = 'rotate(-45deg)';
          const span = this.createElement('span');
          span.textContent = value.name;
          li.style.margin = '2.5%';
          li.style.padding = '5%';
          li.style.width = '90%';
          li.textContent = value.time;
          li.append(span);
          li.append(contain);
          li.append(nav);
          div_two.append(li);
          this.commandList.append(div_two);
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
      callback(data);
  })
}
  
bindSelectedVideo(){
    this.commandList.addEventListener('click', event => {
      event.preventDefault();
      console.log("fired " + event.target.textContent);
      
      var baseURL = "http://localhost/dokumentenFreigabe-backend/";
      var url  = baseURL+ "admin/playVideo"
      var params = { 
            name: event.target.textContent,
          };
      var posting = $.post(url, params);
      posting.done( function(data){
                          console.log(data);
                         setTimeout(function(){
                            document.location.href = "playVideo.html";
                          },500);
                  });
    });
  }
 
 dropContextMenu(data){
    this.commandList.addEventListener('contextmenu', event => {
      event.preventDefault();
      var cmenu = true;
      this.contextmenue(cmenu, event, data);
      console.log("fired " + event.target.textContent);
      document.addEventListener('mousedown', event  => {
        event.preventDefault(); 
        var button = event.button;
        if ( button === 1){
          console.log("button clicked");
          this.hideContextMenu();
        }
      });
    
      document.addEventListener('keydown', event  => {
        if (event.code === 'Escape') {
            console.log("keybord clicked "+ event.code);
            this.hideContextMenu();
            console.log("menu hidden");
        }
      });
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
      span_0.addEventListener('click', event => {
        event.preventDefault();
        console.log(event.target.textContent);
        var baseURL = "http://localhost/dokumentenFreigabe-backend/";
        var url  = baseURL+ "admin/changePermission"
        var params = { 
          userName: event.target.textContent,
        };
        var posting = $.post(url, params);
        posting.done(function(data){
          if(data === 'true'){
            console.log(event.target.textContent+'s '+'Permission successfully updated');
          }
        })
      })
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
      
    });
    this.view.bindSelectedVideo();
    this.view.getUserlist(function(data){
      obj.view.dropContextMenu(data);
    });
   }
  }
  
  const app = new Controller(new Model(),new View() );
         
         
  
  
  
  