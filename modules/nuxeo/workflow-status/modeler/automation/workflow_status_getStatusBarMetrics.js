// Turn log messages on or off globally.
var loggingEnabled = true;

function run(input, params) {
  var genericQuery = "SELECT * FROM RoutingTask WHERE ecm:currentLifeCycleState = 'opened'";
  var dateFilterPrefix = " AND nt:dueDate";

  var query_totalTasks = genericQuery;

  var allTasks = Repository.Query(
    input, {
      'query': query_totalTasks
    }
  );

  var query_tasksOnSchedule = genericQuery + dateFilterPrefix + " > DATE '" + CurrentDate.days(1).format("yyyy-MM-dd")+ "'";
  var query_tasksDue = genericQuery + dateFilterPrefix + " BETWEEN DATE '" + CurrentDate.format("yyyy-MM-dd") + "' AND DATE '" + CurrentDate.days(1).format("yyyy-MM-dd") + "'";
  var query_tasksPastDue = genericQuery + dateFilterPrefix + " < DATE '" + CurrentDate.format("yyyy-MM-dd")+ "'";

  var tasksOnSchedule = Repository.Query(
    input, {
      'query': query_tasksOnSchedule
    }
  );
  var tasksDue = Repository.Query(
    input, {
      'query': query_tasksDue
    }
  );
  var tasksPastDue = Repository.Query(
    input, {
      'query': query_tasksPastDue
    }
  );

  var results = {
    "tasksOnSchedule": tasksOnSchedule.length / allTasks.length,
    "tasksDue": tasksDue.length / allTasks.length,
    "tasksPastDue": tasksPastDue.length / allTasks.length
  };

  results = JSON.stringify(results);

  return results;

}

function logHelper(message) {
  if (loggingEnabled)
    Console.warn(message);
}
