const express = require("express");
const { enquiryInsert, enquiryList, enquiryDelete, enquirySingle, enquiryUpdate } = require("../../controller/web/enquiryController");
const enquiryRoutes = express.Router();

enquiryRoutes.post("/enquiryinsert", enquiryInsert);
enquiryRoutes.get("/enquirylist", enquiryList);
enquiryRoutes.delete("/enquiryremove/:id", enquiryDelete);
enquiryRoutes.get("/enquiryedit/:id", enquirySingle);
enquiryRoutes.put("/enquiryupdate/:id", enquiryUpdate);

module.exports = enquiryRoutes;