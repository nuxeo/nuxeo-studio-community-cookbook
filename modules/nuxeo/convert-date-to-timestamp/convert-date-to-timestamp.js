/* Convert a Nuxeo Date to a timestamp that is suitable for NXQL. */
function nuxeoDateToTimestampString(date) {
  var timeMS = date.getTimeInMillis();
  var jsDate = new Date(timeMS);
  return jsDate.getFullYear() + '-' + pad((jsDate.getMonth() + 1), 2) + '-' + pad((jsDate.getDate() + 1), 2) + ' ' + pad(jsDate.getHours(), 2) + ':' + pad(jsDate.getMinutes(), 2) + ':' + pad(jsDate.getSeconds(), 2);

}

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}
