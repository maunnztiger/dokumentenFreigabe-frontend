class Model {
  
    constructor() {

    }
    
    getData(callback){
     
      fetch('http://localhost/dokumentenFreigabe-backend/Index/formular',{
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
    this.title = this.createElement('h2');
    this.title.style.position = 'relative';
    this.title.textContent = 'Dokumentenfreigabe';
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
        const li = this.createElement('li');
        li.style.width = '40%';
        li.style.float = 'right';
        if(value.endsWith('jpg')){
        
          console.log("true "+value);
          const img = this.createElement('img',  'image');
          img.src = value;
          img.style.alignItems = 'left';
          img.style.display = 'flex';
          img.style.felxDirection = 'column';
          img.style.margin = '2,5%';
          img.style.padding = '0%';
          img.style.width = '100%';
          
          this.list.append(img);
        } 
      
         if(value.endsWith('jpg') == false){
          this.div2 = this.createElement('div');
          this.div2.style.width = '40%';
          this.div2.style.float = 'right';
          const span = this.createElement('span');
          span.textContent = value;
          
          li.append(span);        
          this.div2.append(li);
          this.list.append(this.div2);

        }
      })
    }

   
 }

 sendLoginData(){
       
            jQuery(document).ready(function($)
            {
                $("#loginformular").submit(function(event) {
                    // Standard-Aktion abbrechen
                    event.preventDefault();	
            
                    // Formular per AJAX senden
                    var form=$(this);
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost/dokumentenFreigabe-backend/index/dispatchViews',
                        data : form.serialize(),
                        dataType: 'json',
                        encode: true
                    }).done(function(data) {
                        // Aktionen bei Erfolg
                        console.log('done: '+data);
                        setTimeout(function(){
                            document.location.href = "http://localhost/dokumentenFreigabe-frontend/"+data+"/"+data+"View.html"
                          },500);
                    }).fail(function(data) {
                        // Aktionen bei einem Fehler
                        console.log('fail: '+data);			
                    });
                });
                /**/
            });
            
          
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
    this.view.sendLoginData();
    }
   
}

const app = new Controller(new Model(),new View() );
         
         
  


 