(function() {
  if (!("Proxy" in window)) {
    console.log("Your browser doesn't support Proxies.");
    return;
  }
  // our backing array
  //var array = ["a", "b", "c", "d"];
  // a proxy for our array
  let txt = "";
  let ar = [];
  let proxy = new Proxy(ar, {
    apply: function(target, thisArg, argumentsList) {
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty: function(target, property) {
      //console.log("Deleted %s", property);
      handleRender()
      return true;
    },
    set: function(target, property, value, receiver) {      
      target[property] = value;
      //console.log("Set %s to %o", property, value);
      handleRender()
      return true;
    }
  });
//console.log("Set a specific index..");
//proxy[0] = "x";
// console.log("Add via push()...");
// proxy.push("z");
// console.log("Add/remove via splice()...");
//  proxy.splice(1, 3, "y");
//console.log("Current state of array: %o", ar);
///////////////////////////////////////-/////////////////////////////////////////////////
let handleRender = ()=>{
  txt = "";
  ar.forEach(item => {
  txt += `<p>${item.text} <button class="btn-remove" target-id="${item.id}">Xóa</button></p>`;
  });
  document.querySelector("#list-wrapper").innerHTML = txt;
  let btnArr = [...document.querySelectorAll(".btn-remove")];
  btnArr.forEach(item => {
    item.addEventListener("click", e => {
      let idTarget = e.target.getAttribute("target-id"); //  string
            proxy.splice(
            proxy.findIndex(o => {
            return o.id == idTarget;
            }),
            1
            );
    });
  });
}
document.querySelector("#myForm").addEventListener("submit", e => {
  e.preventDefault();
  let target = document.querySelector("#input");
  let list = document.querySelector("#list-wrapper");
  let value = target.value;
  target.value = "";
  proxy.push({
    text: value,
    id: new Date().getTime(), // number
  });
});
///////////////////////////////////////-/////////////////////////////////////////////////











})();

