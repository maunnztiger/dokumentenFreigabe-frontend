class Model {
  
    constructor() {

    }
    getData(callback){
     
        fetch('http://localhost/dokumentenFreigabe-backend/admin/getPDFFileNames',{
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
        this.list.append(li); 
      }
    })
  }
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
          
            this.embed.src = url;
            this.embed.style.display = "block";
            obj.list.append(this.embed); 
        
                      
        })    
       
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
        obj.view.bindSelectedPDF();
    });
  
        
    }
}

const app = new Controller(new Model(),new View() );
         
         
  


 