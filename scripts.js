const expense = document.getElementById("expense");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const form = document.querySelector("form");

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
}