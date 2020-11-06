const express = require('express');
const app = express()

var url = require('url');
// var adr = "http://localhost:8080/default.htm('01')";
//Parse the address:
// var q = url.parse(adr, true);

/*The parse method returns an object containing url properties*/
// console.log(q.host);
// console.log(q.pathname);
// console.log(q.search);

/*The query property returns an object with all the querystring parameters as properties:*/
// var qdata = q.query;
// console.log(qdata.month);



app.get('/products', function(req, res){ 
   const auth = req.headers.authorization || ''
   const user = Buffer.from(auth.substring(6), "base64").toString('utf8') 
   var q = url.parse(req.url, true).query;
   console.log(q.number);
   console.log("User: " + user)
   if(user === 'john:secret'){ // simulating basic auth
      res.json([{Id: "HT-1000", name: "Broken Laptop"}]);
   }else{
      res.status(401).send('Forbidden: invalid user or password');   
   }
});

app.listen(8080, () => {
   console.log('server running')
})