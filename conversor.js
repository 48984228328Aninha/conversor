let taxaDolar = null;
fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
        }
        return response.json();
    })
    .then(data => {
        taxaDolar = data.rates.BRL;
        document.getElementById("taxaCambio").innerText = `Taxa de câmbio USD/BRL: R$ ${taxaDolar}`;
        document.getElementById("inputBase").value = "Real";
    })
    .catch(error => {
        document.getElementById("taxaCambio").innerText = "Erro ao buscar taxa de câmbio.";
        console.error("Erro ao buscar taxa de câmbio:", error);
    });

function conversao() {
    const inputNumber = document.getElementById("inputNumber").value;
    const inputBase = document.getElementById("inputBase").value;
    const resultado = document.getElementById("resultado");
    if (inputNumber === "" || isNaN(inputNumber)) {
        resultado.innerText = "Insira um número válido.";
        return;
    }
    if (!taxaDolar) {
        resultado.innerText = "Taxa de câmbio não carregada.";
        return;
    }
    let valorConvertido = 0;
    if (inputBase === 'Real') {
        valorConvertido = (parseFloat(inputNumber) / taxaDolar).toFixed(2);
        resultado.innerText = `US$ ${valorConvertido}`;
    } else if (inputBase === 'Dolar') {
        valorConvertido = (parseFloat(inputNumber) * taxaDolar).toFixed(2);
        resultado.innerText = `R$ ${valorConvertido}`;
    } else {
        resultado.innerText = "Base inválida.";
    }
}

window.onload = function() {
    const btn = document.getElementById("btnConverter");
    if (btn) {
        btn.addEventListener("click", conversao);
    }
};