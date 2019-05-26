// https://www.ibm.com/support/knowledgecenter/en/SS9H2Y_7.7.0/com.ibm.dp.doc/urlopen_js.html#urlopen.openforcommunicationwithservers
// urlopen module provides APIs to establish a non-streaming connection with target servers 
// by HTTP, HTTPS, or IBM® MQ protocol and open files in the DataPower file system. 
// The APIs can also send and receive IBM MQ messages within a GatewayScript action.

import  { urlopen } from 'urlopen';

export class APIConnection {
    constructor(){}
    OpenConnectionWithServer(option){
        return new Promise((resolve, reject) => {
            if(!option || !option.target){
                reject(new Error('specify the error properyl.'))
            }else{
                urlopen.open(option, (error, response) => {
                    if(error)
                        reject(new Error(error));
                    else
                        resolve(response);
                });
            }
        })    
    }
}

