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
      <span>${transaction.amount.toFixed(2)} PLN</span>
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
      <span>${transaction.amount.toFixed(2)} PLN</span>
      <button onclick="editExpenseTransaction(${index})">Edytuj</button>
      <button onclick="deleteExpenseTransaction(${index})">Usuń</button>
    `;
    expenseList.appendChild(listItem);
  });
}

function editIncomeTransaction(index) {
  const transaction = incomeTransactions[index];
  const originalName = transaction.name;
  const originalAmount = transaction.amount;
  const editContainer = document.createElement("div");
  editContainer.innerHTML = `
    <input id="editIncomeName" type="text" placeholder="Nowa nazwa" value="${originalName}">
    <input id="editIncomeAmount" type="number" step="0.01" min="0.01" placeholder="Nowa kwota" value="${originalAmount}">
    <button onclick="confirmEditIncomeTransaction(${index})">Zatwierdź</button>
    <button onclick="cancelEditIncomeTransaction(${index}, '${originalName}', ${originalAmount})">Anuluj</button>
  `;

  incomeList.replaceChild(editContainer, incomeList.childNodes[index]);

  const deleteButton = editContainer.querySelector("button:last-child");
  deleteButton.disabled = false;
}

function confirmEditIncomeTransaction(index) {
  const newName = document.getElementById("editIncomeName").value;
  const newAmount = parseFloat(
    document.getElementById("editIncomeAmount").value
  );

  const errorContainer = document.getElementById("editIncomeError");

  if (newName && !isNaN(newAmount) && newAmount >= 0.01) {
    incomeTransactions[index].name = newName;
    incomeTransactions[index].amount = newAmount;
    updateIncomeList();
    updateIncomeTotal();
    calculateBalance();
    errorContainer.textContent = "";
  } else {
    errorContainer.textContent = "Kwota musi być większa lub równa 0.01 PLN";
  }

  if (newAmount <= 0.01) {
    return;
  }

  const editContainer = incomeList.childNodes[index];
  const deleteButton = editContainer.querySelector("button:last-child");
  deleteButton.disabled = false;
  updateIncomeList();
}

function cancelEditIncomeTransaction(index, originalName, originalAmount) {
  incomeTransactions[index].name = originalName;
  incomeTransactions[index].amount = originalAmount;
  updateIncomeList();
}

function editExpenseTransaction(index) {
  const transaction = expenseTransactions[index];
  const originalName = transaction.name;
  const originalAmount = transaction.amount;
  const editContainer = document.createElement("div");
  editContainer.innerHTML = `
    <input id="editExpenseName" type="text" placeholder="Nowa nazwa" value="${originalName}">
    <input id="editExpenseAmount" type="number" step="0.01" min="0.01" placeholder="Nowa kwota" value="${originalAmount}">
    <button onclick="confirmEditExpenseTransaction(${index})">Zatwierdź</button>
    <button onclick="cancelEditExpenseTransaction(${index}, '${originalName}', ${originalAmount})">Anuluj</button>
  `;

  expenseList.replaceChild(editContainer, expenseList.childNodes[index]);

  const deleteButton = editContainer.querySelector("button:last-child");
  deleteButton.disabled = false;
}

function confirmEditExpenseTransaction(index) {
  const newName = document.getElementById("editExpenseName").value;
  const newAmount = parseFloat(
    document.getElementById("editExpenseAmount").value
  );

  const errorContainer = document.getElementById("editExpenseError");

  if (newName && !isNaN(newAmount) && newAmount >= 0.01) {
    expenseTransactions[index].name = newName;
    expenseTransactions[index].amount = newAmount;
    updateExpenseList();
    updateExpenseTotal();
    calculateBalance();
    errorContainer.textContent = "";
  } else {
    errorContainer.textContent = "Kwota musi być większa lub równa 0.01 PLN";
  }

  if (newAmount <= 0.01) {
    return;
  }

  const editContainer = expenseList.childNodes[index];
  const deleteButton = editContainer.querySelector("button:last-child");
  deleteButton.disabled = true;
  updateExpenseList();
}

function cancelEditExpenseTransaction(index, originalName, originalAmount) {
  expenseTransactions[index].name = originalName;
  expenseTransactions[index].amount = originalAmount;
  updateExpenseList();
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
