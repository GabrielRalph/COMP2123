var list = ['A1', 'A2', 'ACOVID'];
var html = ''

for(var i in list){
  html += '<h1 onclick = "window.open(`./'+list[i]+'.html`)">'+list[i]+'</h1>\n'
    console.log(html);
}
document.getElementById('app').innerHTML = html
