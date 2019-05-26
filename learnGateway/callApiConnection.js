// https://www.ibm.com/support/knowledgecenter/SS9H2Y_7.7.0/com.ibm.dp.doc/apisforobjects.htmls
// A session object represents a transaction flow in a GatewayScript application to access input, output, and other contexts that are visible to the service.
// Because a session object is a property of the Global object, you can use session objects, through the session variable, 
// without requiring a particular module (like service metadata).
// No require('session') statement is required.


import { APIConnection }  from './APIConnection'

const APIConn =  new APIConnection();


// define the urlopen options
const serverOptions = {
    target: 'http://127.0.0.1:42410/echo',
    // if target is https, supply a sslClientProfile
    // target: 'https://127.0.0.1:42409/echo',
    // sslClientProfile: 'alice-sslClient',
    method: 'post',
    headers: { 'X-My-Header1' : 'value1', 'X-My-Header2' : 'value2' },
    contentType: 'application/json',
    timeout: 60,
    data: "Hello DataPower GatewayScript",
};

APIConn.OpenConnection(serverOptions)
.then((response) => {
    if(response && response.statusCode == 200){
        response.readAsJSON((error, responseData) => {
            if (error) {
                // error while reading response or transferring data to JSON
                session.output.write("readAsJSON error: " + JSON.stringify(error));
            } else {
                session.output.write(responseData);
            } 
        });
    }
})
.catch((error) => {
    console.log(error);
    session.output.write ("urlopen connect error: " + JSON.stringify(error));
});


// define the urlopen options
const fileOptions = {
    // the target URL
    target: 'local:///mylocal_directory/mylocal_file.xml',
    // method is optional, default is GET
    method: 'GET'
};

APIConn.OpenConnection(fileOptions)
.then((response) => {
    if(response && response.statusCode == 200){
        response.readAsBuffer((error, responseData) => {
            if (error) {
                // error while reading response or transferring data to Buffer
                session.output.write("read file error: " + JSON.stringify(error));
            } else {
                session.output.write(responseData);
            } 
        });
    }
})
.catch((error) => {
    console.log(error);
    session.output.write ("urlopen connect error: " + JSON.stringify(error));
});

