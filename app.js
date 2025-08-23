const express = require('express');
const ConnectDB = require('./config/db');
require('dotenv').config();
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//  Serve static files from uploads
app.use("/uploads", express.static("uploads"));

//  Routes
app.use(require("./routes/project.routes"));
app.use(require("./routes/admin.routes"));
app.use(require("./routes/employee.routes"));
app.use(require("./routes/adminlogin.routes"));
// app.use(require("./routes/employeesuggestion.routes"));
app.use(require("./routes/addleaverequest.routes"));
app.use(require("./routes/assigntaskadmin.routes"))
app.use(require("./routes/notification.routes"))
app.use(require("./routes/stock.routes"))

app.use(require("./routes/requirement.routes"))






const PORT = 3004;
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server start successfully");
    console.log("connected to server", PORT);
  });
});
