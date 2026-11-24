let expenseForm = document.getElementById("expenseForm");
let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");
let errorMessage = document.getElementById("errorMessage");
let addBtn = document.getElementById("addBtn");
let expenseList = document.getElementById("expenseList");
let totalAmount = document.getElementById("totalAmount");



let expense = []; //empty array to store irems



expenseForm.addEventListener("submit", function (dets) {

    dets.preventDefault();

    if (expenseName.value.trim() === "") {
        errorMessage.textContent = "Enter expense name";
    }

    else if (Number(expenseAmount.value) <= 0) {
        errorMessage.textContent = "Enter a valid amount";
    }
    else {
        errorMessage.textContent = "";
        let object = {
            name: expenseName.value.trim(), amount: Number(expenseAmount.value)
        }
        expense.push(object);
        localStorage.setItem("expense", JSON.stringify(expense));  //storing it in the locl storage
        displayExpenses();  //call the expenses
        calculateTotal();   //call the total amount
        expenseForm.reset();  // the expense name and amount is reset to ""


    }
});

function displayExpenses() {
    expenseList.textContent = "";
    expense.forEach(function (item, index) {
        let expense_item = document.createElement("div");   //created a div with the class-name expense-item
        expense_item.classList.add("expense-item");

        let expense_details = document.createElement("div");   //created a div with the class-name expense-details
        expense_details.classList.add("expense-details");


        let expense_name = document.createElement("span");  //creeated a span  with the the class-name expense-name
        expense_name.classList.add("expense-name");
        expense_name.textContent = item.name;

        let expense_amount = document.createElement("span");  //creeated a span  with the the class-name expense-amount
        expense_amount.classList.add("expense-amount");
        expense_amount.textContent = `₹${item.amount}`;

        let delete_btn = document.createElement("button");   //created a button which will delete the items.
        delete_btn.classList.add("delete-btn");
        delete_btn.textContent = "Delete";


        delete_btn.addEventListener("click", function () {
            expense.splice(index, 1);
            localStorage.setItem("expense", JSON.stringify(expense));
            displayExpenses();
            calculateTotal();
        });


        //appending the child

        expense_details.appendChild(expense_name);
        expense_details.appendChild(delete_btn);
        expense_item.appendChild(expense_details);
        expense_item.appendChild(expense_amount);
        expenseList.appendChild(expense_item);


    });
};

///function to add  total amount.
function calculateTotal() {
    let total = 0;

    expense.forEach(function (item) {
        total = total + item.amount;


    });
    totalAmount.textContent = total.toFixed(2); // adding .00 after the amount
};

// retrieving it from the local storage
let savedExpense = localStorage.getItem("expense");
if (savedExpense !== null) {
    expense = JSON.parse(savedExpense);
    displayExpenses();
    calculateTotal();
};
