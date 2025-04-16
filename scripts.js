const expense = document.getElementById("expense");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const form = document.querySelector("form");
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");


function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return value;
}

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "");
    value = Number(value)/100;
    amount.value = formatCurrencyBRL(value);
}

function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");
        
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        expenseInfo.append(expenseName, expenseCategory);

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        const removeIcon = document.createElement("img");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt", "remover");
        removeIcon.classList.add("remove-icon");

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        expenseList.append(expenseItem);

        updateTotals();

    } catch (error) {
        console.error("Error adding expense:", error);
        alert("Não foi possível adicionar a despesa. Tente novamente mais tarde.");
    }
}

function updateTotals() {
    try {
        const items = expenseList.children;  
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ?
            "despesas" : "despesa"
        }`;
        
        let total = 0;

        for (let index = 0; index < items.length; index++) {
            const itemAmount = items[index].querySelector(".expense-amount");
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

            value = parseFloat(value);

            if(isNaN(value)){
                return alert("Não foi possível calcular o total de despesas. Tente novamente mais tarde.");
            }

            total += Number(value);
        }

        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
        expensesTotal.innerHTML = "";
        expensesTotal.append(symbolBRL, total);

    } catch (error) {
        console.error("Error updating totals:", error);
        alert("Não foi possível atualizar o total de itens. Tente novamente mais tarde.");
    }
}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    console.log(newExpense);
    expenseAdd(newExpense);
}