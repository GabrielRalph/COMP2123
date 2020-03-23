//  Node graph is an object that handles rendering tree's of nodes
class NodeGraphs{

  /*
    Params:

      jsonTree: a tree represented as a json object in the format
        node = {
          "a": interger_value,
          "b": interger_value,
          children: [node1, node2, ...] or [] if leaf,
        }
  */
  constructor(jsonTree, id, node_margin = {x: 20, y:100}, node_size = 50){
    this.tree = jsonTree;
    this.margin = node_margin;
    this.size = node_size;
    this.html = '';
    this.height = 0;
    this.width = 0;
    this.renderNodes(id)
  }


  // rendres nodes to the element with id = elementID

  renderNodes(elementID){
    this.width = this.positionNodes(this.tree);
    this.html = this.drawHTMLnodes(this.tree);
    this.html = '<svg style = "margin: '+ this.margin.y/2 +'px 0"  width = "'+(this.width*(this.margin.x + this.size) + this.size)+'" height = "'+(this.height*(this.margin.y + this.size)+ this.size)+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+this.html+'</svg>';
    document.getElementById(elementID).innerHTML = this.html;
    this.height = 0;
  }

  // Creates the svg path for a single node and a connection to its parent
  drawSVGnode(x, y, a, b, parent){
    var path = '<svg width = "'+this.size+'" height = "'+this.size+'" x = "'+x*(this.size + this.margin.x)+'" y = "'+y*(this.size + this.margin.y)+'" id = "node"><path d = "m 0 '+this.size/2+' l '+this.size+' 0 a '+this.size/2+' '+this.size/2+' 0 0 1 -'+this.size+' 0"/><path d = "m '+this.size+' '+this.size/2+' l -'+this.size+' 0 a '+this.size/2+' '+this.size/2+' 0 0 1 '+this.size+' 0"/><text x = "'+this.size/2+'" y = "'+this.size*0.3+'" dominant-baseline="middle" text-anchor="middle">'+a+'</text><text x = "'+this.size/2+'" y = "'+this.size*0.75+'" dominant-baseline="middle" text-anchor="middle">'+b+'</text></svg>\n'
    if(parent){
      path += '<path d = "M '+(parent.x*(this.size + this.margin.x) + this.size/2)+' '+(parent.y*(this.size + this.margin.y) + this.size)+' C '+(parent.x*(this.size + this.margin.x) + this.size/2)+' '+((parent.y*(this.size + this.margin.y) + y*(this.size + this.margin.y) + this.size)/2)+', '+(x*(this.size + this.margin.x)+this.size/2)+' '+((parent.y*(this.size + this.margin.y) + y*(this.size + this.margin.y) + this.size)/2)+', '+(x*(this.size + this.margin.x)+this.size/2)+' '+y*(this.size + this.margin.y)+'" stroke = "red" fill = "transparent" stroke-width = "'+this.size/15+'px"/>'
    }
    return path
  }

  //Creates svg node and parent connection paths for each node in the tree
  drawHTMLnodes(tree, parent){
    if(tree.children.length > 0){
      var html = ''
      for(var i in tree.children){
        html += this.drawHTMLnodes(tree.children[i], tree);
      }
      return html + this.drawSVGnode(tree.x, tree.y, tree.a, tree.b, parent);
    }else{
      console.log();
      return this.drawSVGnode(tree.x, tree.y, tree.a, tree.b, parent);
    }
  }

  //Calculates the horizontal (x) and vertical (y) position to render tree with children going down from parents
  positionNodes(tree, level=0, lastWidth = 0){

    this.height = this.height < level? level:this.height;
    if(tree.children.length > 0){
      var width = 0;
      for(var i in tree.children){
        width += this.positionNodes(tree.children[i], level + 1, width + lastWidth);
      }
      tree.width = width;
      tree.y = level;
      tree.x = lastWidth + width/2;
      return width
    }else{
      tree.y = level;
      tree.width = 1;
      tree.x = lastWidth + 0.5;
      return 1
    }
  }
}
