
var Spaces ={}
console.log('blocked', blocked)
var d = document
Spaces.init = function(){
window.removeEventListener("DOMContentLoaded", Spaces.init);
print_time('Spaces init')
    Spaces.load()
}

Spaces.load = function(e){

    print_time('Spaces load')
    var els = d.querySelectorAll('[data-space]');
    var spaces = []
    for(var i=0; i < els.length; i++){
        spaces.push(els[i].getAttribute('data-space'))
    }
    var data = {
        'spaces': spaces,
        'url': window.location.pathname,
        'blocked': blocked
    }

    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/fmhmoc', requestOptions)
      .then(response => response.json())
      .then(data => {
        Spaces.load_done(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
}

Spaces.load_done = function(data){
    console.log('Spaces.load_done')
    console.log(data)
    print_time('Spaces load_done')
    Spaces.list = data['spaces']
    console.log(Spaces.list)
    const els = d.querySelectorAll('[data-space]');
    Spaces.check_visible(els);
    var spaces = []
}
function addResponseCodeToPage(responseCode, space) {
  var container = document.createElement('div');
  container.innerHTML = responseCode;

  // Append the container element to the desired location in your HTML document
  var targetElement = document.querySelector('[data-space="'+space+'"]');
  targetElement.appendChild(container);

  // Execute the JavaScript code within the response
  var scriptElements = container.getElementsByTagName('script');
  for (var i = 0; i < scriptElements.length; i++) {
    eval(scriptElements[i].innerHTML);
  }
}

Spaces.insert_html = function(el){
    var space = el.getAttribute('data-space')
    var mhtml = Spaces.list[el.getAttribute('data-space')]
//    el.insertAdjacentHTML('afterbegin', mhtml);
    addResponseCodeToPage(mhtml, space)
    el.removeAttribute('data-space')
    console.log('insert_html')
}
Spaces.check_visible = function(elements){
  const options = {
    rootMargin: '150px 0px',
  };
  function handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Spaces.insert_html(entry.target)
        observer.unobserve(entry.target);
      }
    });
  }
  const observer = new IntersectionObserver(handleIntersect, options);
  elements.forEach(element => {
    observer.observe(element);
  });}


//Spaces.init()
window.addEventListener("DOMContentLoaded", Spaces.init);
