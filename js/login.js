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
    this.title.textContent = 'Login';
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
    this.view.sendLoginData();
  }
   
}

const app = new Controller(new Model(),new View() );
         
         
  


 