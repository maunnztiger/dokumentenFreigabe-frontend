class Model {
  
    constructor() {

    }
    
    sendToken(callback){

      const token = "3c28d89b80f70302b04fce2a1451f6ea";

      jQuery(document).ready(function($)
      {
        var path = './images/ncis.jpg'
              $.ajax({
                  type: 'POST',
                  url: 'http://localhost/dokumentenFreigabe-backend/index/index',
                  dataType: 'json',
                  encode: true,
                  headers: {
                    "Authorization": token
                  },
                }).done(function(data) {
                  // Aktionen bei Erfolg
                  data.push(path);
                  console.log(data);
                  callback(data);
              }).fail(function(data) {
                  // Aktionen bei einem Fehler
                  console.log('fail: '+ data);			
              });
      
       
      });
    }


}
  
class View {
  constructor() {
    this.app = this.getElement('#root')

    // The title of the app
    this.div1 = this.createElement('div');
    this.title = this.createElement('h2');
    this.title.style.position = "absolute";
    this.title.style.left = "33%";
    this.title.style.position = 'absolute';
    this.title.textContent = 'Dokumentenfreigabe';
    this.div1.style.position = "absolute";
    this.div1.style.top = '10%';
    this.div1.style.left = '30%';
    this.app.append(this.title);
    this.app.append(this.div1);

 
 
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

  showLoginpup(data){

    data.forEach(element => {
      if(element = "./images/ncis.jpg"){
        this.headerpic = this.createElement("img", "titlepic");
        this.headerpic.src = element;
       
      }
    });
    this.div1.append( this.headerpic);
    document.querySelector("#show-login").addEventListener('click', function(){
      document.querySelector(".popup").classList.add("active");
      document.querySelector(".titlepic").style.display = "none";
    });
    document.querySelector(".popup .close-btn").addEventListener('click', function(){
      document.querySelector(".popup").classList.remove("active");
      document.querySelector(".titlepic").style.display = "block";
    });
    
  }

  login(){
    const submit = document.getElementById("submit");
    submit.addEventListener('click', event => {
      event.preventDefault();
      var userName = document.getElementById("name").value;
      var password = document.getElementById("password").value;
      let params = {
        userName: userName,
        password: password
      }
      console.log(params);
      var url = "http://localhost/dokumentenFreigabe-backend/index/dispatchViews";
      var posting = $.post(url, params);
      posting.done(function(data){
        console.log('done'+JSON.parse(data));
        setTimeout(function(){
          document.location.href = "http://localhost/dokumentenFreigabe-frontend/"+JSON.parse(data)+"/"+JSON.parse(data)+"View.html"
        },500);
      });

  
    

    })
    
  }
 }


class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    var obj = this;
    this.model.sendToken(function(data){
      obj.view.showLoginpup(data);
      obj.view.login();
      
    });
   
  }
     
  
  
}

const app = new Controller(new Model(),new View() );
         
         
  


 