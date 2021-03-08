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
          const div_one = this.createElement('div')
          div_one.style.float = 'left';
          div_one.style.width = '100%';
          div_one.style.padding = '1%';
          div_one.append(this.img);
          this.commandList.append(div_one);
         
         
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
    
  }
  }
  
  const app = new Controller(new Model(),new View() );
         
         
  
  
  
  