import { APIConnection }  from './APIConnection'

// define the urlopen options
const options = {
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

const APIConn =  new APIConnection();
APIConn.OpenConnection(options)
.then((response) => {
    if(response && response.statusCode == 200){
        response.readAsBuffer((error, responseData) => {
            if (error) {
                // error while reading response or transferring data to Buffer
                session.output.write("readAsBuffer error: " + JSON.stringify(error));
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




