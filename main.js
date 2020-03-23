var list = ['A1', 'A2'];
var html = ''

for(var i in list){
  html += '<h1 onclick = "window.open(\'https://'+list[i].toLowerCase()+'.galetora.com\')">'+list[i]+'</h1>\n'
}
document.getElementById('app').innerHTML = html
