function run(input, params) {
  var user_tasks,i,numberOftasks,currentTask,taskId;
  var initialActor = params.initialActor;
  var newActors = params.newActors.split(",");
  var comment   = "Bulk Task Reassignment";
  var taskService = new org.nuxeo.ecm.platform.task.core.service.TaskServiceImpl();
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
      Console.info("    taskService    : '" + taskService + "' (" + typeof(taskService) + ")");
      taskId    = currentTask.id;
      Console.info("    Session    : '" + Session + "' (" + typeof(Session) + ")");
      taskService.reassignTask(Session, taskId, newActors, comment);
    }
  }
}
