const state = {
    earnings : 0,
    expence : 0,
    net : 0,
    transactons : [
        
        
  ],
};

const transactionFormEl = document.getElementById("transactionForm");

const renderTransaction = () => {
    const transactionContainerEl = document.querySelector(".transactions")
    const netAmountEl = document.getElementById("netAmount");
    const earningEl = document.getElementById("earning");
    const expenceEl = document.getElementById("expence");
    
    const transactions = state.transactons

    let earning = 0;
    let expence = 0;
    let net = 0;
    transactionContainerEl.innerHTML = "";
    transactions.forEach((transaction) =>{
        const {id,amount,text,type} = transaction;
        const isCredit = type == "credit" ? true : false;
        const sign = type == "credit" ? "+" : "-";
        
        const transactionEl = ` 
        <div class="transaction" id="${id}">
        <div class="left">
            <p>${text}</p>
            <p>${sign} ₹${amount}</p>
        </div>
        <div class="status ${isCredit? "credit" :"debit"}">${
            isCredit ? "C" : "D"}
        </div>
    </div>`;

    earning += isCredit ? amount : 0;
    expence += !isCredit ? amount : 0;
    net = earning - expence;

    transactionContainerEl.insertAdjacentHTML("afterbegin",transactionEl);
    });

     netAmountEl.innerHTML = `₹ ${net}`;
    earningEl.innerHTML = `₹ ${earning}`;
     expenceEl.innerHTML = `₹ ${expence}`;
};

const addTRansaction = (e)=>{
e.preventDefault();
    
const isEarn = e.submitter.id  == "earnbtn" ? true:false;
   
const formData = new FormData(transactionFormEl);
const tData = {};

formData.forEach((value,key)=> {
tData [key] = value;
});
    const{text,amount} = tData;

    const transaction = {
        id :Math.floor(Math.random()*1000),
        text : text,
        amount : +amount,
        type : isEarn ? "credit":"debit",
    };
state.transactons.push(transaction );
renderTransaction()



    console.log({state});
}

transactionFormEl.addEventListener('submit',addTRansaction);