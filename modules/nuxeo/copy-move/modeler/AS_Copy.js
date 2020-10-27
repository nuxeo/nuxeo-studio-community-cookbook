function run(input, params) {
  var i;
  var targetfolders_list = params.targetfolders;
  Console.log(targetfolders_list.length);
  if(targetfolders_list.length > 0){
    for(i=0; i<targetfolders_list.length; i++){
      input = Document.Copy(
        input, {
          'target': targetfolders_list[i],
        }
      );
    }
  }
  return input;
}
