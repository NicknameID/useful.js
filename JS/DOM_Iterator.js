// 作用：用于循环对应节点下的所有子节点
// 有四个参数 root：开始遍历的子节点；whatToShow：表示要访问哪些节点的数字代码；
// filter:传入一个函数作为过滤器，过滤出要显示的节点，第四个参数无用，用false代替
export default function(root,filter=null){
  var walker = document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,filter,false);
  var node = walker.nextNode();
  var result = [];
  while (node !== null) {
    result.push(node);
    node = walker.nextNode();
  }
  return result;
}