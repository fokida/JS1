const incomeForm = document.getElementById("incomeForm");
const incomeList = document.getElementById("incomeList");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const balanceMessage = document.getElementById("balanceMessage");
const incomeTotalElement = document.getElementById("incomeTotal");
const expenseTotalElement = document.getElementById("expenseTotal");

const incomeTransactions = [];
const expenseTransactions = [];

function addIncomeTransaction(name, amount) {
  const transaction = { name, amount: parseFloat(amount) };
  incomeTransactions.push(transaction);
  updateIncomeList();
  updateIncomeTotal();
  calculateBalance();
}

function addExpenseTransaction(name, amount) {
  const transaction = { name, amount: parseFloat(amount) };
  expenseTransactions.push(transaction);
  updateExpenseList();
  updateExpenseTotal();
  calculateBalance();
}

function updateIncomeList() {
  incomeList.innerHTML = "";

  incomeTransactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");
    listItem.className = "transaction-item";
    listItem.innerHTML = `
      <span>${transaction.name}</span>
      <span>${transaction.amount.toFixed(2)} zł</span>
      <button onclick="editIncomeTransaction(${index})">Edytuj</button>
      <button onclick="deleteIncomeTransaction(${index})">Usuń</button>
    `;
    incomeList.appendChild(listItem);
  });
}

function updateExpenseList() {
  expenseList.innerHTML = "";

  expenseTransactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");
    listItem.className = "transaction-item";
    listItem.innerHTML = `
      <span>${transaction.name}</span>
      <span>${transaction.amount.toFixed(2)} zł</span>
      <button onclick="editExpenseTransaction(${index})">Edytuj</button>
      <button onclick="deleteExpenseTransaction(${index})">Usuń</button>
    `;
    expenseList.appendChild(listItem);
  });
}

function editIncomeTransaction(index) {
  const transaction = incomeTransactions[index];
  const newName = prompt("Wprowadź nową nazwę:", transaction.name);
  const newAmount = parseFloat(
    prompt("Wprowadź nową kwotę (PLN):", transaction.amount)
  );

  if (newName && !isNaN(newAmount)) {
    transaction.name = newName;
    transaction.amount = newAmount;
    updateIncomeList();
    updateIncomeTotal();
    calculateBalance();
  }
}

function editExpenseTransaction(index) {
  const transaction = expenseTransactions[index];
  const newName = prompt("Wprowadź nową nazwę:", transaction.name);
  const newAmount = parseFloat(
    prompt("Wprowadź nową kwotę (PLN):", transaction.amount)
  );

  if (newName && !isNaN(newAmount)) {
    transaction.name = newName;
    transaction.amount = newAmount;
    updateExpenseList();
    updateExpenseTotal();
    calculateBalance();
  }
}

function deleteIncomeTransaction(index) {
  incomeTransactions.splice(index, 1);
  updateIncomeList();
  updateIncomeTotal();
  calculateBalance();
}

function deleteExpenseTransaction(index) {
  expenseTransactions.splice(index, 1);
  updateExpenseList();
  updateExpenseTotal();
  calculateBalance();
}

function updateIncomeTotal() {
  const totalIncome = incomeTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);
  incomeTotalElement.textContent = `Suma przychodów: ${totalIncome.toFixed(
    2
  )} PLN`;
}

function updateExpenseTotal() {
  const totalExpenses = expenseTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);
  expenseTotalElement.textContent = `Suma wydatków: ${totalExpenses.toFixed(
    2
  )} PLN`;
}

function calculateBalance() {
  const totalIncome = incomeTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  const totalExpenses = expenseTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  const balance = totalIncome - totalExpenses;
  const balanceMessageElement = document.getElementById("balanceMessage");

  if (balance > 0) {
    balanceMessageElement.textContent = `Możesz jeszcze wydać ${balance.toFixed(
      2
    )} złotych`;
  } else if (balance === 0) {
    balanceMessageElement.textContent = "Bilans wynosi zero";
  } else {
    balanceMessageElement.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance
    ).toFixed(2)} złotych`;
  }
}

incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("incomeName").value;
  const amount = document.getElementById("incomeAmount").value;
  addIncomeTransaction(name, amount);
  incomeForm.reset();
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("expenseName").value;
  const amount = document.getElementById("expenseAmount").value;
  addExpenseTransaction(name, amount);
  expenseForm.reset();
});
