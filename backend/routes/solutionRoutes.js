const express = require("express");
const router = express.Router();
const controller = require("../controllers/solutionController");
const auth=require('../middleware/auth')

router.post("/",auth, controller.createSolution);
router.get("/:id", controller.getSolutionsByProblem);
router.put("/:id",auth,controller.updateSolution);
router.delete("/:id",auth,controller.deleteSolution);

router.put('/:id/like',auth,controller.toggleLike)
router.put("/:id/dislike", auth, controller.toggleDislike);


module.exports = router;
