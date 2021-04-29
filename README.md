# Dokumenten- Freigabe frontend: Beschreibung

Das Frontend der Dukmenten-Freigabe bsteht komplett aus nativ geschriebenen HTML5, CSS3 und Jvascript-Modulen. Im js-Ordner sind die Javascript-Dateien angelegt, wobei jede HTML-View mindestens eine Javascript-Datei importiert und somit eine kleine Bibliothek an Frontend-Dateien entsteht.

Hier wurde in Javascript, um die Übersicht besser zu gewährleisten, mit einer MVC-Struktur gearbeitet. Das heißt, ich habe ein Model, welches (unter anderem) Daten holt un dann, ggfs per callback, an die View weiterleitet, wobei dies konkret im Controller passiert. Stellenweise kann es vorkommen, das Datenabfragen an das Backend auch direkt in der View passieren, sofern sie in einem Prozess stattfinden, der direkt an die Präsenation gekoppelt ist, wie zum Beispiel die User aus der Datenbank für das Contextmenü einer Content-Freigabe:

{
     span.addEventListener('contextmenu' , event  => {
          event.preventDefault(); 
          objekt.div   = objekt.createElement('div');
          objekt.div2  = objekt.createElement('div');
          objekt.div2.style.position = 'absolute';
          const ul_0 = objekt.createElement('ul');
          const li_1 = this.createElement('li');
          objekt.div2.style.position = 'relative';
          objekt.div2.style.margin = 0;
          li_1.style.margin = 0;
          ul_0.style.margin = 0;
          li_1.style.background = '#fff2df';
          li_1.style.borderBottom = '1px solid #dd0074';
          const span_1 = objekt.createElement('span','span_1');
          span_1.textContent = 'PDF löschen';
          li_1.append(span_1);
          ul_0.append(li_1);
          objekt.div2.append(ul_0);
          objekt.div.append(objekt.div2);
          span_1.addEventListener('click', event => {
            event.preventDefault();
            var baseURL = "http://localhost/dokumentenFreigabe-backend/";
            var url  = baseURL+ "admin/deletePDF"
            var params = { 
                pdfName: pdfName
            };
            console.log(params);
            var posting = $.post(url, params);
            posting.done(function(){
                setTimeout(function(){
                  document.location.reload();
                },2000);
            });
          }); // end of delete PDF vevent
          this.getUserlist(function(data){
            event.preventDefault();
            var cmenu = true;
            if(!cmenu || cmenu === null) return true;
            
          
            const ul = objekt.createElement('ul');
           
            data.forEach(values => {
            const li_0 = objekt.createElement('li');
            const span_0 = objekt.createElement('span', 'span_0');
            span_0.textContent= values.name;
}

Die Model-View-Controller-Struktur erlaubt es, das Daten-Managment und die jeweilige View voneinander zu trennen, was die Wartbarkeit des Codes leichter macht.

Im Model wird hier über eine HTTP-Methode wie GET eine Datenstruktur vom Backend geholt. Das kann ein JSON-Objekt oder eine XML- oder PDF-Datei sein. Letzere wird häufig erst in der View angefordert.

In der View werden DOM-Elemente erzeugt, die direkt an das DIV-root-Element in der HTML-Datei embedded werden. Dadurch bin ich in der Lage, die View jeweils individuell zu layouten, zu designen und mit Logik zu versehen, ohne dabei immer erst alles in HTML zu schreiben. Die Daten, die aus dem Model kommen, können hier dann verarbeitet und präsentiert werden. Das macht die Aufteilung in eine MVC -Struktur so sinnvoll.

Aus Sicherheitsgründen wird ganz am Anfang auf der ersten index.html, welche die script.js einbndet, ein streng geheimer Token ans Backend gesendet und mit einem dort gespeichertem Token abgeglichen. Sind die Token nicht identisch, d.h. hat ein Angreifer versucht, mit einem curl-GET-Request Daten vom Backend in der indexAction auf dem IndexController zu bekommen, wird dieser mit einem http-resonse-code 503 "Forbidden" zurückgewiesen, d.h. ohne den jeweilgen Token in diesem Frontend ist man nicht in der Lage, die Schnittstelle im Backend zu adressieren. Sind die Token jedoch identisch, wird die indexAction freigegeben und man kann den Server mit einem curl-GET-Request adressieren. Diese Technik kann insofern noch ausgereift werden, das man mit einem Service-Worker den Token dann cached und bei jedem HTTP-Request erst prüft, ob die Token identisch sind.

{
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

# Die einzelnen Views für die Benutzergruppen:

Da wir in der Datenbank verschiedene Benutzergruppen haben, die beim Login ausgelesen werden, war es von Vorteil, wenn diese auch ihre eigene View bekommen.
Employee und Customers View sind aktuell noch in Bearbeitung. Der eigentliche Unterscheid bei den entsprechenden Views liegt im Contextmenü der jeweiligen Startseite, so dass ein Admin vielmehr Optionen im Contextmenü hat, wie z.B. User anzeigen, ändern, anlegen oder löschen.

# Das Design

Das Design wird jeweils über CSS3 Stylesheets erstellt. Zusätzlich werden einzelne Design Elemente noch per Javascript-Funktion 'style' verändert, da einzelne DOM-Elemente, wie bspw. das Contextmenü erst im Prozess erzeugt werden.

{
    

contextmenue(cmenu,e){

//build the dom-elements here:
if(!cmenu || cmenu === null) return true;

this.div = this.createElement('div', 'absolute');
this.div.setAttribute("id", "context");

const ul = this.createElement('ul');

const li_0 = this.createElement('li');
const span_0 = this.createElement('span', 'span_0');
span_0.textContent= 'Get-PDF-List';
li_0.append(span_0);
li_0.style.margin = 0;
li_0.style.background = '#fff2df';
li_0.style.borderBottom = '1px solid #dd0074';


const li_1 = this.createElement('li');
const span_1 = this.createElement('span', 'span_1');
span_1.textContent= 'User-Liste';
li_1.append(span_1);
li_1.style.margin = 0;
li_1.style.background = '#fff2df';
li_1.style.borderBottom = '1px solid #dd0074';


const li_2 = this.createElement('li');
const span_2 = this.createElement('span', 'span_2');
span_2.textContent= 'Get XML-Object';
li_2.append(span_2);
li_2.style.margin = 0;
li_2.style.background = '#fff2df';
li_2.style.borderBottom = '1px solid #dd0074';

const li_3 = this.createElement('li');
const span_3 = this.createElement('span', 'span_3');
span_3.textContent= 'Get Video List';
li_3.style.background = '#fff2df';
li_3.style.margin =0;
li_3.style.borderBottom = '1px solid #dd0074';
li_3.append(span_3);

}