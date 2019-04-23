import {callApi} from "./API.js";

// // obtaining data from html
// const btn = document.getElementById("send");
// const var1 = document.getElementById("var1");
// const var2 = document.getElementById("var2");
// const var3 = document.getElementById("var3");
// const title = document.getElementById("title");


// // asigning function to button
// btn.onclick=()=>{
//     // disables button
//     btn.disabled = true;
//     title.innerHTML="Loading...";
//     // Creating the JSON that is going to be sent
//     const dataToSend = JSON.stringify({ "var1": var1.value, "var2":var2.value, "var3":var3.value });
//     // Execute promise
//     callApi(dataToSend)
//     .then((value)=>{
//         // If the request is succesfull
//         console.log(value.split("\\n"));
//     })
//     .catch((error)=>{
//         // If there was an error on the request
//         console.log(error)
//     })
//     .finally(()=>{
//         btn.disabled = false;
//         title.innerHTML="Solve cuadratic equations";
//     });
// }