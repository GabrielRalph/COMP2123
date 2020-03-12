class Queue {
  constructor(n){
    this.size = 0;
    this.head = null;
    this.tail = this.head;
    this.runningAverage = 0;
  }
  enqueue(n){

    if(this.head){
      this.tail.next = new Node(n);
      this.tail = this.tail.next;
    }else{
      this.head = new Node(n);
      this.tail = this.head;
    }
    this.runningAverage += parseInt(n==0?0:n);
    this.size ++;
  }
  dequeue(){
    if(this.size){
      var temp = this.head.element;
      this.head = this.head.next;
      this.size --;
      this.runningAverage -= parseInt(temp==0?0:temp);
      return temp;
    }else{
      this.head = this.tail = null;
      return 'empty'
    }
  }

  getAverage(){
    return this.runningAverage/this.size;
  }
}
class Node{
  constructor(e, next){
    this.element = e;
    this.next = next?next:this;
  }
}

function question3(array, k){
  var some = [];
  var total = 0;
  var o = 0;
  for(var i in array){
    var elem = array[i]
    if(some.length > 0){
      while(some[some.length -1] < elem){
        some.pop();
        o++;
      }
      total += some.length
    }
    some.push(k/array[i])
  }
  console.log(o);
  return total
}
function question32(array, k){
  var l = 0;
  var r = array.length -1;
  var results = 0;
  while(l < r){
    if(array[l]*array[r] <= k){
      results += (r - l)
      l++;
    }else{
      r--;
    }
  }
  return results
}
myqueue = new Queue();
log = '';
document.getElementById('add').addEventListener("click", () => {
  var value = document.getElementById('value').value
  myqueue.enqueue(value);
  log += '<p style = "color: #0cc322">enqueue - '+value+'</p><br /> ';
  document.getElementById('value').value = null;
  document.getElementById('logs').innerHTML = log;
})

document.getElementById('minus').addEventListener("click", () => {
  log += '<p style = "color: #efa011">dequeue - ' +myqueue.dequeue()+'</p><br /> ';
  document.getElementById('logs').innerHTML = log;


})
document.getElementById('AVG').addEventListener("click", () => {
  log += '<p style = "color: #7f43e0">average - ' + Math.round(myqueue.getAverage()*10000)/10000+'</p><br /> ';
  document.getElementById('logs').innerHTML = log;
})
document.getElementById('run').addEventListener("click", () => {
  var value = document.getElementById('array').value
  var k = parseInt(document.getElementById('k').value)
  value = JSON.parse('['+value+']');
  if(!value){
    log += '<p style = "color: #ff5722">No Array, or incorrect format</p><br /> ';
  }else if(!k){
    log += '<p style = "color: #ff5722">No Array, or incorrect format</p><br /> ';
  }else{
    log += '<p style = "color: #ff5722">Q3 Result - ' + question32(value, k)+'</p><br /> ';
  }
  document.getElementById('logs').innerHTML = log;
})
