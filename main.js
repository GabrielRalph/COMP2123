var list = ['A1', 'A2'];
var html = ''

for(var i in list){
  html += '<h1 onclick = "window.open("https://comp2123.galetora.com/'+list[i]+'.html")>'+list[i]+'</h1>\n'
}
document.getElementById('app').innerHTML = html
