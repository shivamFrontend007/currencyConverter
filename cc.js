// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// const dropdown = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");




// for(let select of dropdown){
//     for (currCode in countryList) {
//         // console.log(currCode, countryList[currCode]);
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if(select.name === "from" && currCode === "USD"){
//             newOption.selected = "selected";
//         }
//         else if(select.name === "to" && currCode === "INR"){
//             newOption.selected = "selected";
//         }
//         select.append(newOption);
//     }

//     select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     });
// }

// const updateExchangeRate = async() =>{
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if(amtVal === "" || amtVal < 1){
//         amtVal = 1;
//         amount.value = "1";
//     }

//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = date[toCurr.value.toLowerCase()];

//     let finalAmount = amtVal*rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
// }

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countryCode = countryList[currCode];  
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// };

// btn.addEventListener("click",(evt) => {
//     evt.preventDefault();
//     updateExchangeRate();
// });

// window.addEventListener("load", () =>{
//     updateExchangeRate();
// });



const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_3028e9OIjdNdXPOlbW52cZm1IWrYI1ONyzUeottx";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".result");  // This is the element to display the result

// Loop to populate the currency dropdowns
for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update exchange rate using the new API
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // Construct URL for the new API
    const URL = `${BASE_URL}&base_currency=${fromCurr.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();

    // Get the exchange rate from the response (we get all currencies in `data.data`)
    let rate = data.data[toCurr.value.toUpperCase()].value;

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Update flag image based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];  
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
