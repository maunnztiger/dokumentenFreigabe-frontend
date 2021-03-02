class Model {
  
    constructor() {

    }
    getData(){
        var url = "http://localhost/dokumentenFreigabe-backend/admin/getPdfBinary";
        return url;
        
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


    if (data.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'No data send!';
      this.list.append(p);
    } else {
        
                console.log(data);
                this.embed = document.getElementById('embed');
                this.embed.src = data;
                this.embed.style.display = "block";
                this.list.append(this.embed); 
          
           
        }
 }

 


}
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    var data = this.model.getData();
    this.view.displayData(data)
        
    }
}

const app = new Controller(new Model(),new View() );
         
         
  


 