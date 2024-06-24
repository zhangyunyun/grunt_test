(function(){
   var arr = [1, 2, 3, 4];
   var result = arr.map(function(item,index){
      return item + 10;
   });
   console.log(result);
})();