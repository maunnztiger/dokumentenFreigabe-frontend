class Model {
  
    constructor() {

    }
   

    getData(callback){
        var request = new XMLHttpRequest();
        request.addEventListener("load", function() {
          var parser = new DOMParser();
          var dom =  parser.parseFromString( this.response, "application/xml" )
          //console.log(dom.documentElement.childNodes == "parsererror" ? "error while parsing" : dom.documentElement.childNodes);
          callback(dom.documentElement.childNodes);            
        });
        request.open("GET", "http://localhost/dokumentenFreigabe-backend/admin/getXMLObject");
        request.send();
      
       
    }
}
  
class View {
  constructor() {
    this.app = this.getElement('#root')

    // The title of the app
    this.div1 = this.createElement('div');
    this.title = this.createElement('h2');
    this.title.style.position = 'relative';
    this.title.textContent = 'XML-Data-Content';
    this.div1.style.float = 'left';
    this.div1.append(this.title);
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
    console.log("displayed", data);
    const div = this.createElement('div', 'videos');


    if (data.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'No data send!';
      this.list.append(p);
    } else {
        
            data.forEach(value => {
            if(value.textContent !== "\n    " && value.textContent !== "\n"){
                this.li = this.createElement('li');
                this.li.style.background = '#f7ddba';
                const span = this.createElement('span');
                span.textContent = value.textContent;
                this.li.style.float = 'left';         
                this.li.style.width = '60%';
                this.li.append(span);        
                this.list.append(this.li); 
          
            console.log("true "+ value.textContent);
  
     
    
            }  

        
      })
    
    }
 }

 


}
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    var obj = this;
    this.model.getData(function(data){
          obj.view.displayData(data)
        });
    }
}

const app = new Controller(new Model(),new View() );
         
         
  


 