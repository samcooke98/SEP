//We're going to import all the routes from this folder
import UserManagementRoutes from "./userManagement.js"
import InvitationRoutes from "./invitation.js"
import resourceRoutes from "./resourceRoutes.js";
import commentRoutes from './commentRoute.js';

import TestRoutes from "./testRoutes.js";

//WE're then going to export all the routes from this folder
export {UserManagementRoutes, InvitationRoutes, resourceRoutes, commentRoutes, TestRoutes};

//This should (hopefully) allow us to do hot module reloading with routes\

