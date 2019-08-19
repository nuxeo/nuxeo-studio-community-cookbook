// Generate semi-random data so that we have metrics.
function run(input, params) {

  // ==  Set these values to fit your use case =================================
  var titlePrefix = "DOC-";
  var docType = "File";

  // For dc:nature
  var DOC_CATEGORIES = ['article', 'certificate', 'report', 'memo'];
  var DOC_CATEGORIES_MAX = DOC_CATEGORIES.length - 1;

  var MAX_DOCS = 200;

  // ==  Don't modify these unless you know what you're doing... ===============
  var DUE_DATE_OFFSETS = ['-5', '-4', '-3', '-2', '-1', '0', '0', '0', '0', '0', '1', '2', '3', '4', '5'];
  var DUE_DATE_OFFSETS_MAX = DUE_DATE_OFFSETS.length - 1;

  Console.log("Generating metrics data...");

  var existingDocs;

  // Create docs in this folder if they don't already exist.
  do {
    existingDocs = Document.GetChildren(input, {});
    if (existingDocs.length < MAX_DOCS) {
      var docsToCreate = MAX_DOCS - existingDocs.length;
      var i = 0;
      for (i = 1; i <= docsToCreate; i++) {
        var title = titlePrefix + Fn.getNextId(titlePrefix);
        var doc = Document.Create(
          input, {
            'type': docType,
            'name': title,
            'properties': {
              'dc:title': title
            }
          });
      }
    }
  } while (existingDocs.length < MAX_DOCS);

  // Create date offsets...
  var totalDocs = existingDocs.length;

  // Create a range of decreasing offsets to calculate start dates.
  // Start dates are beteen 2 weeks and 1 year ago...
  // Now - (14 - 365 days)
  var startDateOffsets = [];
  var jj = 0;
  for (jj = 0; jj < totalDocs; jj++) {
    startDateOffsets.push(randomForIntegers(14, 365));
  }
  startDateOffsets.sort(function(a, b) {
    return b - a;
  });

  // Create a range of decreasing offsets to calculate end dates.
  // End dates are 21 to 42 days after the start date, but decreasing over time
  // exponentially.
  // Start date + 21 to 42 days but decreasing over time.
  var durationMax = 42;
  var durationMin = 21;
  var denominator = Math.pow(totalDocs, 2) / (durationMax - durationMin);
  var endDateOffsets = [];
  for (jj = totalDocs; jj > 0; jj--) {
    var offset = Math.pow(jj, 2) / denominator + durationMin;
    // +/- 7 days
    offset = offset + randomForIntegers(-7, 7);
    endDateOffsets.push(offset);
  }

  // Update metrics data for each doc.
  for (jj = 0; jj < totalDocs; jj++) {
    if ((jj % 20) === 0) {
      Console.log("Updating Doc " + jj + "/" + totalDocs);
    }

    var currentDoc = existingDocs[jj];

    currentDoc = Document.AddFacet(
      currentDoc, {
        'facet': 'HiddenInNavigation',
        'save': false
      }
    );

    currentDoc = Document.AddFacet(
      currentDoc, {
        'facet': 'Metrics',
        'save': false
      }
    );

    var properties = {};

    // Set start date
    var startDate = CurrentDate.days(0 - startDateOffsets[jj]);
    properties['trk:completion_start'] = startDate.format("yyyy-MM-dd");
    // Set end date
    var endDate = startDate.days(endDateOffsets[jj]);
    properties['trk:completion_end'] = endDate.format("yyyy-MM-dd");
    // Set due date
    var dueDateOffset = randomValueInArray(DUE_DATE_OFFSETS, DUE_DATE_OFFSETS_MAX);
    var dueDate = endDate.days(dueDateOffset);
    properties['trk:due_date'] = dueDate.format("yyyy-MM-dd");
    // Set duration
    var duration = endDate.time - startDate.time;
    properties['trk:completion_duration'] = duration;

    // == Add other properties you'd like to generate... =======================
    // random amount
    var amount = randomForIntegers(1, 50) * 100;
    properties['dc:description'] = "This File cost " + amount;
    // random type
    var docCategory = randomValueInArray(DOC_CATEGORIES, DOC_CATEGORIES_MAX);
    properties['dc:nature'] = docCategory;

    currentDoc = Document.Update(
      currentDoc, {
        'properties': properties,
        'save': true
      }
    );

  }

  Console.log("Finished generating metrics data.");

  return input;
}

function randomForIntegers(inMin, inMax) {
  return Math.round(inMin + (Math.random() * (inMax - inMin)));
}

function randomValueInArray(inArray, inMax) {
  return inArray[randomForIntegers(0, inMax)];
}
