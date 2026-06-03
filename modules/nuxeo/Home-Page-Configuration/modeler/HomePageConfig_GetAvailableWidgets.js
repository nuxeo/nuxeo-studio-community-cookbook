/* Return the list of widgets available for the current user.
   You can put a translation key in the title and the description.
   
   That is what we do in the default implementation. But don't forget to
   add your keys/values in Designer > Translations, of course

   Input: void
   Output: blob
*/
function run(input, params) {
  
  var availableWidgets;
  
  // ========================================
  // Widgets for all users
  // ========================================
  availableWidgets = [
    {
      id: "recentlyEdited",
      title: "home.latestDocumentsEdited", // Available in the platform
      description: "home.ui.latestDocumentsEdited.prompt", // The 15 most recently modified documents.
      widgetName: "nuxeo-home-recently-edited"
    },
    {
      id: "recentlyCreated",
      title: "home.ui.latestCreated", // Recently Created'
      description: "home.ui.latestCreated.prompt", // The 15 most recently created documents.
      widgetName: "nuxeo-home-recently-created"
    },
    {
      id: "recentlyViewed",
      title: "app.recentlyViewed", // Available in the platform
      description: "home.ui.recentlyViewed.prompt", // The 15 most recently opened documents by the current user.
      widgetName: "nuxeo-home-recently-viewed"
    },
    {
      id: "tasks",
      title: "home.tasks", // Available in the platform
      description: "home.ui.tasks.prompt", // All open tasks for the current user.
      widgetName: "nuxeo-home-tasks"
    },
    {
      id: "favorites",
      title: "home.favorites", // Available in the platform
      description: "home.ui.favorites.prompt", // Favorite documents of the current user.
      widgetName: "nuxeo-home-favorites"
    },
    {
      id: "quickSearch",
      title: "home.ui.quickSearch", // Quick Search
      description: "home.ui.quickSearch.prompt", // Fulltext search and compact result table.
      widgetName: "nuxeo-home-quick-search"
    },
    {
      id: "approved",
      title: "home.ui.approved", // Latest 'Approved'
      description: "home.ui.approved.prompt", // Latest approved documents
      widgetName: "nuxeo-home-search-state"
    },
    {
      id: "published",
      title: "home.ui.published", // Latest 'Published'
      description: "home.ui.published.prompt", // Latest published documents.
      widgetName: "nuxeo-home-search-state"
    },
    {
      id: "expired",
      title: "home.ui.expired", // Expired'
      description: "home.ui.expired.prompt", // Expired assets/documents.
      widgetName: "nuxeo-home-expired"
    }
  ];
  
  // ========================================
  // Widgets for administrators
  // ========================================
  if(currentUser.groups.indexOf("administrators") > -1) {
    availableWidgets.push({
      id: "workflows",
      title: "home.ui.workflows", // Workflows'
      description: "home.ui.workflows.prompt", // Workflow dashboard.
      widgetName: "nuxeo-home-workflows"
    });
    availableWidgets.push({
      id: "repositoryOverview",
      title: "home.ui.repositoryOverview", // Repository Overview
      description: "home.ui.repositoryOverview.prompt", // Small dashboard, info. about the repository.
      widgetName: "nuxeo-home-repository-overview"
    });
  }

  return org.nuxeo.ecm.core.api.Blobs.createJSONBlob(JSON.stringify(availableWidgets));
}