const axios = require('axios')
const express = require('express')
var url = require('url')
const app = express()
var queryParam;
var str, res0, res1, res2;

const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);
const destSrvCred = VCAP_SERVICES.destination[0].credentials;
const conSrvCred = VCAP_SERVICES.connectivity[0].credentials;

app.listen(process.env.PORT, function () {
    console.log('CloudToOnprem application started')
})

app.get('/callonprem', async function (req, res) {
    // call destination service
	const destJwtToken = await _fetchJwtToken(destSrvCred.url, destSrvCred.clientid, destSrvCred.clientsecret)
	const destiConfi = await _readDestinationConfig('s14_sales_order', destSrvCred.uri, destJwtToken)
    queryParam = url.parse(req.url, true).query;
        
    // call onPrem system via connectivity service and Cloud Connector
	const connJwtToken = await _fetchJwtToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret)
    try{
        const result =  await _callOnPrem(conSrvCred.onpremise_proxy_host, conSrvCred.onpremise_proxy_http_port, connJwtToken, destiConfi)
        
        str = result.d.vdatu;
        res0 = str.split("(");
        res1 = res0[1].split(")");   
        res2 = new Date(parseInt(res1[0]));
        result.d.vdatu = res2;
        
        str = result.d.erdat;
        res0 = str.split("(");
        res1 = res0[1].split(")");
        res2 = new Date(parseInt(res1[0]));
        result.d.erdat = res2;

        // console.log(result);
        res.json(result);
    }
    catch(e) {
        console.log('Catch an error: ', e)
        res.json({"d":{"error": "error"}})
    }
})

const _fetchJwtToken = async function(oauthUrl, oauthClient, oauthSecret) {
	return new Promise ((resolve, reject) => {
		const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'  
        const config = {
			headers: {
			   Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
			}
        }
		axios.get(tokenUrl, config)
        .then(response => {
		   resolve(response.data.access_token)
        })
        .catch(error => {
		   reject(error)
        })
	})   
}

// Call Destination Service. Result will be an object with Destination Configuration info
const _readDestinationConfig = async function(destinationName, destUri, jwtToken){
	return new Promise((resolve, reject) => {
        const destSrvUrl = destUri + '/destination-configuration/v1/destinations/' + destinationName  
        const config = {
			headers: {
               Authorization: 'Bearer ' + jwtToken
			}
        }
		axios.get(destSrvUrl, config)
        .then(response => {
           resolve(response.data.destinationConfiguration)
        })
        .catch(error => {
	      reject(error)
        })
	})
}

const _callOnPrem = async function(connProxyHost, connProxyPort, connJwtToken, destiConfi){
    return new Promise((resolve, reject) => {
        // console.log(q.number);
        const targetUrl = destiConfi.URL + "/zabibot01('" + queryParam.number + "')"
        const encodedUser = Buffer.from(destiConfi.User + ':' + destiConfi.Password).toString("base64")
    
        const config = {
            headers: {
                Authorization: "Basic " + encodedUser,
                'Proxy-Authorization': 'Bearer ' + connJwtToken,
                'SAP-Connectivity-SCC-Location_ID': destiConfi.CloudConnectorLocationId        
            },
            proxy: {
				host: connProxyHost, 
				port: connProxyPort 
            }              
        }
		axios.get(targetUrl, config)
        .then(response => {
           resolve(response.data)
        })
        .catch(error => {
	      reject(error)
        })
	})    
}

app.get('/podetails', async function (req, res) {
    // call destination service
	const destJwtToken = await _fetchJwtToken(destSrvCred.url, destSrvCred.clientid, destSrvCred.clientsecret)
	const destiConfi = await _readDestinationConfig('s14_purchase_order', destSrvCred.uri, destJwtToken)
    queryParam = url.parse(req.url, true).query;
        
    // call onPrem system via connectivity service and Cloud Connector
	const connJwtToken = await _fetchJwtToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret)
    try{
        const result =  await _poDetails(conSrvCred.onpremise_proxy_host, conSrvCred.onpremise_proxy_http_port, connJwtToken, destiConfi)
        
        str = result.d.CreationDate;
        res0 = str.split("cf(");
        res1 = res0[1].split(")");   
        res2 = new Date(parseInt(res1[0]));
        result.d.CreationDate = res2;

        res.json(result)
    }
    catch(e) {
        console.log('Catch an error: ', e)
        res.json({"d":{"error": "error"}})
    }
})

const _poDetails = async function(connProxyHost, connProxyPort, connJwtToken, destiConfi){
    return new Promise((resolve, reject) => {
        // console.log(q.number);
        const targetUrl = destiConfi.URL + "/C_PurchaseOrderTP(PurchaseOrder='" + queryParam.number + "',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)"
        const encodedUser = Buffer.from(destiConfi.User + ':' + destiConfi.Password).toString("base64")
    
        const config = {
            headers: {
                Authorization: "Basic " + encodedUser,
                'Proxy-Authorization': 'Bearer ' + connJwtToken,
                'SAP-Connectivity-SCC-Location_ID': destiConfi.CloudConnectorLocationId        
            },
            proxy: {
				host: connProxyHost, 
				port: connProxyPort 
            }              
        }
		axios.get(targetUrl, config)
        .then(response => {
           resolve(response.data)
        })
        .catch(error => {
	      reject(error)
        })
	})    
}

// app.get('/sodetails', async function (req, res) {
//     // call destination service
// 	const destJwtToken = await _fetchJwtToken(destSrvCred.url, destSrvCred.clientid, destSrvCred.clientsecret)
// 	const destiConfi = await _readDestinationConfig('s14_so_fe', destSrvCred.uri, destJwtToken)
//     queryParam = url.parse(req.url, true).query;
        
//     // call onPrem system via connectivity service and Cloud Connector
// 	const connJwtToken = await _fetchJwtToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret)
// 	const result =  await _poDetails(conSrvCred.onpremise_proxy_host, conSrvCred.onpremise_proxy_http_port, connJwtToken, destiConfi)
//     res.json(result)
// })

// const _poDetails = async function(connProxyHost, connProxyPort, connJwtToken, destiConfi){
//     return new Promise((resolve, reject) => {
//         // console.log(q.number);
//         const targetUrl = destiConfi.URL + "/C_PurchaseOrderTP(PurchaseOrder='" + queryParam.number + "',DraftUUID=guid'00000000-0000-0000-0000-000000000000',IsActiveEntity=true)"
//         const encodedUser = Buffer.from(destiConfi.User + ':' + destiConfi.Password).toString("base64")
    
//         const config = {
//             headers: {
//                 Authorization: "Basic " + encodedUser,
//                 'Proxy-Authorization': 'Bearer ' + connJwtToken,
//                 'SAP-Connectivity-SCC-Location_ID': destiConfi.CloudConnectorLocationId        
//             },
//             proxy: {
// 				host: connProxyHost, 
// 				port: connProxyPort 
//             }              
//         }
// 		axios.get(targetUrl, config)
//         .then(response => {
//            resolve(response.data)
//         })
//         .catch(error => {
// 	      reject(error)
//         })
// 	})    
// }