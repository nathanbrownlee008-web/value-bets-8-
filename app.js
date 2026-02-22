let currentTab="value-bets";

const valueBets=[{Date:"2026-02-22",League:"Premier League",Home:"Arsenal",Away:"Chelsea",Pick:"Over 2.5",Probability:0.72,Odds:1.95}];

function switchTab(tab){currentTab=tab;render();}

function render(){
const content=document.getElementById("content");
content.innerHTML="";

if(currentTab==="value-bets"){
valueBets.forEach(bet=>{
const card=document.createElement("div");
card.className="card";
card.innerHTML=`<h3>${bet.Home} vs ${bet.Away}</h3>
<p>${bet.League} • ${bet.Date}</p>
<p>${bet.Pick} | P=${bet.Probability} | Odds=${bet.Odds}</p>`;

const btn=document.createElement("button");
btn.className="add-btn";
btn.textContent="Add to History";
btn.onclick=()=>addToHistory(bet);
card.appendChild(btn);
content.appendChild(card);
});
}

if(currentTab==="bet-history"){
const history=JSON.parse(localStorage.getItem("betHistory")||"[]");

history.forEach((bet,index)=>{
const card=document.createElement("div");
card.className="card";

card.innerHTML=`<h3>${bet.Home} vs ${bet.Away}</h3>
<p>${bet.League} • ${bet.Date}</p>
<p>${bet.Pick} | Odds=${bet.Odds}</p>
<p><strong>Profit:</strong> ${bet.Profit||0}</p>`;

const controls=document.createElement("div");
controls.className="controls";

const result=document.createElement("select");
["Pending","Won","Lost"].forEach(r=>{
const o=document.createElement("option");
o.value=r;o.textContent=r;
if(bet.Result===r)o.selected=true;
result.appendChild(o);
});

result.onchange=()=>{bet.Result=result.value;calculateProfit(bet);saveHistory(history);render();};

const stake=document.createElement("input");
stake.type="number";
stake.placeholder="Stake";
stake.value=bet.Stake||0;

stake.onchange=()=>{bet.Stake=Number(stake.value);calculateProfit(bet);saveHistory(history);render();};

controls.appendChild(result);
controls.appendChild(stake);
card.appendChild(controls);

content.appendChild(card);
});
}
}

function addToHistory(bet){
const history=JSON.parse(localStorage.getItem("betHistory")||"[]");
history.push({...bet,Result:"Pending",Stake:0,Profit:0});
saveHistory(history);
alert("Added to history");
}

function calculateProfit(bet){
if(bet.Result==="Won"){bet.Profit=bet.Stake*(bet.Odds-1);}
else if(bet.Result==="Lost"){bet.Profit=-bet.Stake;}
else{bet.Profit=0;}
}

function saveHistory(history){
localStorage.setItem("betHistory",JSON.stringify(history));
}

render();