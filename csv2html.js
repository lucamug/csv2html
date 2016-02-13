var CSV2HTML = (function(d) {
  "use strict";
  // http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
  var CSVToArray = function(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
      (
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );
    var arrData = [
      []
    ];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
      var strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
        arrData.push([]);
      }
      var strMatchedValue;
      if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );
      } else {
        strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
  };
  var elem = document.getElementById('csv-data');
  var csvData = elem.innerHTML;
  elem.parentNode.removeChild(elem);
  var a = new CSVToArray(csvData);
  var html = "";
  var index1, index2;
  html += "<table border='1'>";
  for (index1 = 0; index1 < a.length; ++index1) {
    html += "<tr>";
    // console.log(a[index]);
    for (index2 = 0; index2 < a[index1].length; ++index2) {
      html += "<td>" + a[index1][index2] + "</td>";
    }
  }
  document.getElementById('csv-table').innerHTML = html;
}(document));
