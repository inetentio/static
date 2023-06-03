
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
Spaces.insert_html = function(el){
    var mhtml = Spaces.list[el.getAttribute('data-space')]
    el.insertAdjacentHTML('afterbegin', mhtml);
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
