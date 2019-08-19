function run(input, params) {
  var startDate = input["dc:created"];
  // Need a DateWrapper to convert to milliseconds, use Fn.calendar() to get a DateWrapper.
  var start = Fn.calendar(startDate).time;

  // CurrentDate is a DateWrapper, use `date` to get the date.
  var endDate = CurrentDate.date;
  // CurrentDate is already a DateWrapper, just get milliseconds.
  var end = CurrentDate.time;

  var duration_ms = end - start;

  var properties = {
    'trk:completion_start': startDate,
    'trk:completion_end': endDate,
    'trk:completion_duration': duration_ms
  };

  input = Document.Update(
    input, {
      'properties': properties,
      'save': true
    }
  );
}
