// https://www.ibm.com/support/knowledgecenter/en/SS9H2Y_7.7.0/com.ibm.dp.doc/urlopen_js.html#urlopen.openforcommunicationwithservers
// urlopen module provides APIs to establish a non-streaming connection with target servers 
// by HTTP, HTTPS, or IBM® MQ protocol and open files in the DataPower file system. 
// The APIs can also send and receive IBM MQ messages within a GatewayScript action.

import  { urlopen } from 'urlopen';

export class APIConnection {
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

