async function DynamicloadDoc(url : string, func : Function, param? : any[]) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {                         
    if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(xhttp.responseText)

        func(obj,param);
    }
  };
  xhttp.open("GET", url, true);
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
  xhttp.open("POST", url, true);
  xhttp.send(JSON.stringify({value : body}));
}


