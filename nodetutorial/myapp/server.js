const express = require('express');
const app = express();

var options = {
		protocol: "http:",
		hostname: "172.18.215.55",
		port: 8003,
		path: "/sap/opu/odata/sap/MM_PUR_PO_MAINT_V2_SRV/C_PurchaseOrderTP(PurchaseOrder='4500000041',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)",
		auth: 'c855720:Hello@1234',
	};
	
app.get(options, function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.send();
	res.write('STATUS: ' + rest.statusCode);
	res.write('HEADERS: ' + JSON.stringify(rest.headers));
	  console.log(chunk);
	
});
   

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp is using Node.js version: ' + process.version); //new line
  console.log('myapp listening on port ' + port);
});

