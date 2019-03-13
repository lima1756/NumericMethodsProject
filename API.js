function callApi(input){
    const promise = new Promise((resolve, reject)=>{
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost/numericMethods/api.php');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = function() {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject("Couldn't obtain web");
                }
        };
        req.send(input);
    });
    return promise;
}

export {callApi};