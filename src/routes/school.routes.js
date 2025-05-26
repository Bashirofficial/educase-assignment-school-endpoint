import { Router } from "express";

import {
  addSchool,
  sortedSchoolLists,
} from "../controllers/school.controllers.js";

const router = Router();

router.post("/addSchool", addSchool);
router.get("/listSchools", sortedSchoolLists);

export default router;
