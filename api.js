function cargarClima(){

    var clima = new XMLHttpRequest();
    var ciudadReq= 'Santiago';
    var ciudadInput = $('#CiudadInput').val();

    clima.open('GET','http://api.openweathermap.org/data/2.5/weather?q='+ ciudadInput +',cl&units=metric&appid=91c788a49db9caa24bac27d33cbea061',false);
    clima.send(null);

    var datos = JSON.parse(clima.response);

    var ciudad = datos.name;
    var temperatura = datos.main.temp;
    var humedad = datos.main.humidity;

    var icon = datos.weather[0].icon;
    var clima = datos.weather[0].main;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

    $('#ubicacion').html(ciudad);
    $('#temperatura').html(temperatura);
    $('#humedad').html(humedad);
    $('#icon').attr('src', iconurl);

    '/',
    '/accounts/login',
    '/static/core/CSS/HojaDeEstiloPP.css',
    '/static/core/CSS/Menu.css',
    'static/core/CSS/Nosotros.css',
    'static/core/CSS/Climas.css',
    'static/core/CSS/Lugares.css',
    'static/core/CSS/Contacto.css',
    'static/core/CSS/Login.css',
    'static/core/CSS/fontello.css',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .then(function(result){
            return caches.open(CACHE_NAME)
            .then(function(c){
                c.put(event.request.url, result.clone())
                return result;
            })
        })
        .catch(function(e){
            return caches.match(event.request)
        })
    );
});
}
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/static/core/css/estilos.css',
    '/static/core/img/logo.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {

          return fetch(event.request)
          .catch(function(rsp) {
             return response; 
          });
          
          
        })
    );
});


//solo para cachear todo reemplazar por esta versión del Fetch


self.addEventListener('fetch', function(event) {
    event.respondWith(

      fetch(event.request)
      .then((result)=>{
        return caches.open(CACHE_NAME)
        .then(function(c) {
          c.put(event.request.url, result.clone())
          return result;
        })
        
      })
      .catch(function(e){
          return caches.match(event.request)
      })
  

     
    );
});

importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


