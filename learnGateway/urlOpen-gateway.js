import  { urlopen } from 'urlopen';

class APIConnection {
    constructor(){}
    /**
     * 
     * @param option 
     * Format 
     * {
     *      // The URL of the target server as a string.
            target: 'http://127.0.0.1:42410/echo',
            // The HTTP method as a string: get, delete, head, patch, post, or put.
            method: 'post',    
            // A JSON object that contains the headers that are sent to the target
            headers: { 'X-My-Header1' : 'value1', 'X-My-Header2': 'value2' },
            // The data content type as a string.
            contentType: 'application/json',
            // An integer timeout for the attempt to establish the connection in seconds. For a successful connection, this time includes the time for the read API to take place. 
            timeout: 60,    
            // The SSL client profile as a string, as defined on the DataPower Gateway. This parameter is required for requests to handle the client side of the SSL handshake with the HTTPS server.
            sslClientProfile: 'sslClientProfileName',
            // The data sent to the target when the method is POST or PUT. For other methods, the data property is ignored. 
            data: "Hello DataPower GatewayScript",
            // A UserAgent user agent object or an HTTP-specific HttpUserAgent user agent object that can initiate a request for a local service to establish a connection to the specified target server dynamically.
            agent: HttpUserAgent
        };
     OR
        {
            // the target URL
            target: 'local:///mylocal_directory/mylocal_file.xml',
            // method is optional, default is GET
            method: 'GET'
        }
     */
    OpenConnection(option){
        return new Promise((resolve, reject) => {
            if(!option || !option.target){
                reject(new Error('specify the error properyl.'))
            }else{
                urlopen.open(option, (error, response) => {
                    if(error)
                        reject(new Error(`Unable to open connection, error : ${error}`));
                    else
                        resolve(response);
                });
            }
        })    
    }
}


const APIConn =  new APIConnection();


// define the urlopen options
const serverOptions = {
    target: 'http://postman-echo.com/get?foo1=bar1&foo2=bar2',
    // if target is https, supply a sslClientProfile
    // target: 'https://127.0.0.1:42409/echo',
    // sslClientProfile: 'alice-sslClient',
    method: 'get',
    //headers: { 'X-My-Header1' : 'value1', 'X-My-Header2' : 'value2' },
    contentType: 'application/json',
    timeout: 60,
    //data: "",
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