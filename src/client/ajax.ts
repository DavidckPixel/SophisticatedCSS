async function DynamicloadDoc(url : string, func : Function) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {                         
    if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(xhttp.responseText)

        func(obj);
    }
  };
  xhttp.open("GET","/group24" + url, true);
  xhttp.send();
}

async function PostDynamicloadDoc(url : string, body : string, func : Function, param? : any[]) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {                         
    if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(xhttp.responseText)

        func(obj,param);
    }
  };
  xhttp.open("POST","/group24" + url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({value : body}));
}

async function AsyncDynamicloadDoc(url : string, method : string, body: string | null = null) {
  return await Promise.race([
    new Promise<any>((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
          if (this.status == 200) {
            resolve(JSON.parse(xhttp.responseText));
          } else {
            reject(this.status);
          }
        }
      };
      xhttp.open(method,"/group24" + url, true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(body);
    }),
    new Promise((resolve,reject) => {
      setTimeout(resolve, 500, null);
    })]).then((value) => {
      return value;
    })
}


