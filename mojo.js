/* ===== mojo.js – interaksi Portal Mojolaban ===== */
var DESA = ["Bekonang","Cangkol","Demakan","Dukuh","Gadingan","Joho","Klumprit","Laban","Mojolaban","Palur","Plumbon","Sapen","Tegalmade","Triyagan","Wirun"];

// Grid desa
document.getElementById("gd").innerHTML = DESA.map(function(n){
  var h=["Palur","Gadingan","Plumbon"].indexOf(n)>-1?"desa-"+n.toLowerCase()+".html":"#";
  return '<a class="d" href="'+h+'"><div class="ph">'+n[0]+'</div><p>'+n+'</p></a>';
}).join("");

// Kartu berita (placeholder)
document.getElementById("nw").innerHTML = [1,2,3].map(function(i){
  return '<a class="n" href="#"><div class="ph">Foto</div><div class="t"><small>dd/mm/yyyy</small><h3>Judul Berita '+i+'</h3><p>Cuplikan singkat berita akan tampil di sini.</p></div></a>';
}).join("");

// Menu HP
document.getElementById("tg").onclick = function(){
  document.getElementById("nv").classList.toggle("open");
};
