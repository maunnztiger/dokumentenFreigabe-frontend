class Model {
  
    constructor() {
  
    }
  
     
    /*getData(callback){
       
      fetch('http://localhost/dokumentenFreigabe-backend/admin/uploadVideo',{
        method: 'GET',
       })
      .then(response => response.json())    
      .then(data => callback(data));
       
    }*/
  }
  
  class View {
  constructor() {
    this.app = this.getElement('#root')
  
    // The title of the app
    this.headline = this.createElement('h1');
    this.headline.textContent = 'Video-Upload';
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
  
  uploadVideo(){
   
  }

}
  
  
  class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    var obj = this;
    this.view.uploadVideo();
    
    this.submit = document.getElementById('submit');
    this.form = document.getElementById('myFile');
    

    this.submit.addEventListener('click', event => {
        event.preventDefault();
        let body = new FormData(this.form);
        body.append('myVideo', $('#uploadFile')[0].files);
        console.log($('#uploadFile')[0].files, body);
        var baseURL = "http://localhost/dokumentenFreigabe-backend/";
        var url = baseURL + "index/uploadVideo"
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
  
  const app = new Controller(new Model(),new View() );
         
         
  
  
  
  