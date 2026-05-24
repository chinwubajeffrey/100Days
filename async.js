// const btn = document.getElementById("btn");
// const text = document.getElementById("text");
// let price = document.getElementById("price");

// function btnClick() {
//   console.log(text.value);
//   let coin = text.value.trim().toLowerCase();

//   FetchApi(coin);
// }

// async function FetchApi(coin) {
//   console.log(coin + "Let's see");

//   try {
//     res = await fetch(
//       `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,
//     );
//     const data = await res.json();
//     if (!data[coin]) {
//       price.innerHTML = "Nigga search for an existing coin";
//     }
//     price.innerHTML = "Price:" + data[coin].usd;
//   } catch (err) {
//     console.log("There was an error");
//   }
// }

const myPromise = new Promise((resolve, reject) => {
  ok = true;

  if (ok) {
    resolve("This is true");
  } else {
    reject("Fahhhh");
  }

  myPromise.then(
    function (value) {
      console.log(value);
    },
    function (value) {
      console.log(value);
    },
  );
});
