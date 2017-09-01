import { Router } from "express";
import * as ExampleController from "../controllers/eg.js";
const router = new Router();

//Create a new Example Entity
router.route('/eg').post(ExampleController.createEg);

router.route('/get').get((req,res) => { res.send("Hot module  reloaded on the server!")})


export default router; 