function run(input, params) {
  var targetfolder = params.targetfolder;
  Console.log(targetfolder);
  input = Document.Move(
    input, {
      'target': targetfolder,
    }
  );
  return input;
}
