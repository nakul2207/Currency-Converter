let BaseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown = document.querySelectorAll(".all select");
let btn = document.querySelector("button");
let from = document.querySelector("#fr");
let to = document.querySelector("#too");
let msg = document.querySelector("#msg");



for (let select of dropdown){
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.value = currcode;
        newoption.innerText = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
          } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
          }
        select.append(newoption);
    }

    select.addEventListener("change", (e) => {
        updateflag(e.target);
    })
}


const exchangerate = () => {
    let amount = document.querySelector("input");
    if(amount.value===" " || amount.value < 1){
        msg.innerText = "Enter a Valid Amount";
        return; 
    }
    let fromcurrency = from.value;
    let tocurrency = to.value;
    if (fromcurrency === tocurrency) {
        msg.innerText = "Choose Different Currency";
    } else {
        let url = `${BaseURL}/${fromcurrency.toLowerCase()}/${tocurrency.toLowerCase()}.json`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let rate = data[tocurrency.toLowerCase()];
            let result = rate * amount.value;
            msg.innerText = `${amount.value} ${fromcurrency} = ${result.toFixed(2)} ${tocurrency}`;
        })
    }

}

const  updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let flagurl = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flagurl;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    exchangerate();
  });