//We're going to import all the routes from this folder
import UserManagementRoutes from "./userManagement.js"
import InvitationRoutes from "./invitation.js"
import resourceRoutes from "./resourceRoutes.js";
import commentRoutes from './commentRoute.js';


//WE're then going to export all the routes from this folder
console.log(commentRoutes);
console.log(resourceRoutes);
export {UserManagementRoutes, InvitationRoutes, resourceRoutes, commentRoutes};

//This should (hopefully) allow us to do hot module reloading with routes\

