
const { auth } = require("../../../common/auth");
const validation = require("../../../common/validation")
const { addReportedPost, ReviewReported } = require("../controller/reported.controll")
const ReportedEndPoint = require("../endpoints/repoted.endpoints")
const { addReportedPostValidation, ReviewReportedValidation } = require("../validation/reported.validation")


const reported_route=require("express").Router();

reported_route.post("/reportedPost",validation(addReportedPostValidation),auth(ReportedEndPoint.addReportedPost),addReportedPost)
reported_route.patch("/reportedPost",validation( ReviewReportedValidation),auth(ReportedEndPoint.ReviewReported),ReviewReported)

module.exports=reported_route