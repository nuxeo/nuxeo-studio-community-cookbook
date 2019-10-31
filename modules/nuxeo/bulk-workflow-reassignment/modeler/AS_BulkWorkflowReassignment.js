function run(input, params) {
  var user_tasks,i,numberOftasks,currentTask,endpoint,URL,resultBlob,resultObject,taskId,result;
  var initialActor = params.initialActor;
  var newActors = params.newActors.split(",");
  var comment   = "Bulk Task Reassignment";
  user_tasks=Workflow.GetOpenTasks(
    input, {
      'username': initialActor
    }
  );
  if(user_tasks && user_tasks.length){
    numberOftasks = user_tasks.length;
    Console.log("numberOftasks: "+numberOftasks);
    for(i=0; i<numberOftasks; i++){
      currentTask = user_tasks[i];
      Console.log("currentTask: "+currentTask.title);
      var taskService = new org.nuxeo.ecm.platform.task.core.service.TaskServiceImpl();
      Console.info("    taskService    : '" + taskService + "' (" + typeof(taskService) + ")");
      taskId    = currentTask.id;
      Console.info("    Session    : '" + Session + "' (" + typeof(Session) + ")");
      result = taskService.reassignTask(Session, taskId, newActors, comment);
      Console.info("    result    : '" + result + "' (" + typeof(result) + ")");
      return result;
    }
  }
}
