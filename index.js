const {calcularTotal} = require('./Carrinho');

console.log("=== EXECUTANDO TESTES MANUAIS (CAIXA PRETA) ===\n");
// CT01: Teste de cálculo de total com produtos válidos
try {
    const res1 = calcularTotal([ { preco: 100, quantidade: 1 } ],null);
    console.log(`[CT01] Esp: 100 | Obtido: ${res1} -> ${res1 === 100 ? 'PASSOU' : 'ERRO'}`);
} catch (e) {
    console.log(`[CT01] ERRO: ${e.message}`);
}

// CT02: Teste de cálculo de total com produtos inválidos (preço negativo)
try {
    const res2 = calcularTotal([ {preco: 50, quantidade: 1}],"PROMO10");
    console.log(`[CT02] Esp: 60 | Obtido: ${res2} -> ${res2 === 60 ? 'PASSOU' : 'ERRO'}`);
} catch (e) {
    console.log(`[CT02] ERRO: ${e.message}`);
}

// CT03: Teste de cálculo de total com produtos inválidos (quantidade negativa)
try{
    const res3 = calcularTotal([ {preco: 10, quantidade: -2} ],null);
    console.log(`[CT-03] Esp: Erro | Obtido: ${res3} -> Falhou (Não gerou erro)`);
} catch (e) {
    console.log(`[CT03] Esp: Erro: ${e.message}`);
}

// CT04: Teste de cálculo de total com produtos válidos e cupom de desconto

try {
    const res4 = calcularTotal([ {preco: 33.333, quantidade: 1}],null);
    console.log(`[CT04] Esp: 33.33 | Obtido: ${res4} -> ${res4 === 48.33 ? 'PASSOU' : 'ERRO'}`);
} catch (e) {
    console.log(`[CT04] ERRO: ${e.message}`);
}

// CT05: Teste de cálculo de total com produtos válidos e cupom de desconto
try {
    calcularTotal([],null);
    console.log(`[CT05] Esp: 0 | Obtido: Sem Erro -> FALHOU`);
} catch (e) {
    console.log(`[CT05] Esp: Erro: 0| Obtido: Erro (${e.message}) -> PASSOU`);
}

// CT-06: Frete Pago (Subtotal < 100)
try {
    const res6 = calcularTotal([{ preco: 80, quantidade: 1 }], null);
    console.log(`[CT-06] Esp: 95 | Obtido: ${res6} -> ${res6 === 95 ? 'PASSOU' : 'FALHOU'}`);
} catch (e) {
    console.log(`[CT06] Esp: Erro | Obtido: ${e.message}`);


}