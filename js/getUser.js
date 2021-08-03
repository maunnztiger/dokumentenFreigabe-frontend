class Model {
  
    constructor() {

    }

    getData(callback){
      fetch('http://localhost/dokumentenFreigabe-backend/admin/getUser',{
        method: 'GET',
       })
      .then(response =>response.json())
      .then(data => callback(data));
    }
}
  
class View {
  constructor() {
    this.app = this.getElement('#root')

    // The title of the app
    this.headline = this.createElement('h1');
    this.headline.textContent = 'User-Data';
    this.title = this.createElement('h2')
    this.app.append(this.headline);
    document.body.style.background ="#3a7bd5";
   
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
      this.app.append(p);
    } else {
      data.forEach(value => {
        console.log('value: '+value.name)
        const id = this.getElement('#user_id');
        id.value = value.user_id;
        const name = this.getElement('#userName');
        name.value = value.name;
        const group = this.getElement('#groupName');
        group.value = value.groupname;
        const department = this.getElement('#department');
        department.value = value.dep_name;
    })
    }
 }

 updateUserData(){
  
  jQuery(document).ready(function($)
  {
      $("#updateformular").submit(function(event) {
          // Standard-Aktion abbrechen
          event.preventDefault();	
  
          // Formular per AJAX senden
          var form=$(this);
          $.ajax({
              type: 'PUT',
              url: 'http://localhost/dokumentenFreigabe-backend/admin/updateUser',
              data : form.serialize(),
              dataType: 'json',
              encode: true
          }).done(function(data) {
              // Aktionen bei Erfolg
              console.log('done: '+data);
             setTimeout(function(){
                  document.location.href = "http://localhost/dokumentenFreigabe-frontend/admin/newUserData.html"
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
    this.model.getData( function(data){
      obj.view.displayData(data)
    });
    this.view.updateUserData();
  }
}

const app = new Controller(new Model(),new View() );
         
         
  


 