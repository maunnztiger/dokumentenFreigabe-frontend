
class Model {
  
    constructor() {

    }

    getData(callback){
      fetch('http://localhost/dokumentenFreigabe-backend/Admin/updateUser',{
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
      this.headline.textContent = 'Updated User-params';
      this.commandList = this.createElement('ul', 'command-list');
      this.hyperlink = this.createElement('a');
      this.hyperlink.setAttribute('href', 'adminView.html')
      this.hyperlink.textContent = 'Startseite';
      this.hyperlink.style.right = '100%';
      this.hyperlink.style.textDecoration = 'none';
      this.app.append(this.hyperlink, this.headline, this.commandList);
     
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
          console.log('value: '+value.name)
          const li = this.createElement('li');
          const div = this.createElement('div');
          const span_1 = this.createElement('span');
          const span_2 = this.createElement('span');
          const span_3 = this.createElement('span');
          const span_4 = this.createElement('span');
          span_1.textContent = value.user_id;
          span_2.textContent = value.name;
          span_3.textContent = value.groupname;
          span_4.textContent = value.dep_name;
          div.append(span_1, span_2, span_3, span_4);
  
          li.style.float = 'left';         
          li.style.width = '60%';
          li.append(div);        
          this.commandList.append(li); 
  
  
          
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
         
         
  


 