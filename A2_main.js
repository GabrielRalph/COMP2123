runMyScript = function(python_file_name, callback){
  fetch('http://localhost:3000/run/'+ python_file_name).then((response, err) => {
    if (err) throw err
    return response.json()
  }).then((responseJson) => {
    if(responseJson.error){
      console.error('SQL ERROR: ' + responseJson.error)
    }else{
      callback(responseJson)
    }
  }).catch((err) => {
    console.log(err);
  });
}


// runMyScript('test.py', (jsontree)=>{
//   var nodeGraph = new NodeGraphs(jsontree, 'app');
// })
window.addEventListener('load', ()=> {
  var nodeGraphOG = new NodeGraphs(JSON.parse('{"a": 0, "b": 28, "children": [{"a": 1, "b": 6, "children": [{"a": 4, "b": 4, "children": []},{"a": 5, "b": 5, "children": []},{"a": 6, "b": 6, "children": []}]},{"a": 2, "b": 28, "children": [{"a": 7, "b": 7, "children": []},{"a": 28, "b": 28, "children": []},{"a": 9, "b": 9, "children": []}]},{"a": 3, "b": 12, "children": [{"a": 10, "b": 10, "children": []},{"a": 11, "b": 11, "children": []},{"a": 12, "b": 12, "children": []}]}]}'), 'app');
  document.getElementById('jsonTreeText').value = '{"a": 0, "b": 28, "children": [{"a": 1, "b": 6, "children": [{"a": 4, "b": 4, "children": []},{"a": 5, "b": 5, "children": []},{"a": 6, "b": 6, "children": []}]},{"a": 2, "b": 28, "children": [{"a": 7, "b": 7, "children": []},{"a": 28, "b": 28, "children": []},{"a": 9, "b": 9, "children": []}]},{"a": 3, "b": 12, "children": [{"a": 10, "b": 10, "children": []},{"a": 11, "b": 11, "children": []},{"a": 12, "b": 12, "children": []}]}]}';
  document.getElementById('button').addEventListener('click', () => {
    var treejson = document.getElementById('jsonTreeText').value
    treejson = JSON.parse(treejson);
    var nodeGraph = new NodeGraphs(treejson, 'app');
  })
})
function testyFunction(e){
  console.log(e);
}
