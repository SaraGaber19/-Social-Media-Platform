const { roles } = require("../../../common/auth");

const ReportedEndPoint={
    addReportedPost:[roles.user],
    ReviewReported:[roles.Admin,roles.SuperAdmin]

}
module.exports=ReportedEndPoint;