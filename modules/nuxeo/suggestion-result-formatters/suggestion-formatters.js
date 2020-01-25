_thumbnailFormatter: function(doc) {

  if (doc && doc.properties && doc.contextParameters && doc.contextParameters.thumbnail) {

    // These values are used in the second row
    var lable1 = "Type";
    var value1 = doc.type;

    var lable2 = "State";
    var value2 = doc.state;

    var lable3 = "Version";
    var value3 = doc.properties["uid:major_version"] + "." + doc.properties["uid:minor_version"];

    var markup = "";

    markup += "<table width='100%'><tbody>";
    markup += "<tr>";
    // Thumbnail
    markup += "<td width='100px' style='text-align: center'>";
    markup += "<img src='" + doc.contextParameters.thumbnail.url + "' style='max-width: 100px; max-height=25px;' >";
    markup += "</td>";
    // Details
    markup += "<td>";
    // First Row
    markup += "<div style='margin-left:15px'><span style='font-weight: bold; font-size: large'>";
    markup += doc.title + "</span>";
    // Second Row
    markup += "<br /> <span style='font-weight: bold;'>" + lable1 + ":</span> " + value1;
    markup += " <span style='font-weight: bold;margin-left:15px;'>" + lable2 + ":</span> " + value2;
    markup += " <span style='font-weight: bold;margin-left:15px;'>" + lable3 + ":</span> " + value3;
    // Third Row
    markup += "<br /> <span style='font-weight: bold;'>Path:</span> " + doc.path;
    markup += "</div>";
    markup += "</td>";
    markup += "</tr>";
    markup += "</tbody></table>";

    return markup;
  }
}
