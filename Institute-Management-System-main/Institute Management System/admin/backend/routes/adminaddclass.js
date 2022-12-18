
const GetClass = require("../models/GetClassModel");
const router = require("express").Router();

//get data route
router.route("/getAddClass").get((req,res)=>{
    GetClass.find().then((getclass)=>res.json(getclass))
})

// delete route
router.route("/deleteAddClass/:SubjectNo").delete(async (req, res) => {
  let GNumber = req.params.SubjectNo;

  GetClass.findOneAndDelete({ SubjectNo: GNumber })
    .then((getclass) => res.send(getclass))

    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;