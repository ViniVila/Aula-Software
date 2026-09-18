function calcularTotal(itens, cupom) {
  // Validação inicial: carrinho vazio ou inválido
  if (!itens || itens.length === 0) {
    throw new Error("Carrinho inválido");
  }

  let subtotal = 0;

  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    
    // Correção do BUG 1: Valida quantidade e preço
    if (item.quantidade <= 0 || item.preco < 0) {
      throw new Error("Carrinho inválido");
    }
    
    subtotal += item.preco * item.quantidade;
  }

  // Validação de segurança para subtotal negativo (embora já coberto acima)
  if (subtotal < 0) {
    throw new Error("Carrinho inválido");
  }

  let desconto = 0;
  if (cupom === "PROMO10") {
    // Correção do BUG 2: Desconto de 10% em vez de R$ 10 fixos
    desconto = subtotal * 0.10;
  }

  let frete = 15;
  // Correção do BUG 3: Condição '>=' para frete grátis a partir de R$ 100
  if (subtotal >= 100) {
    frete = 0;
  }

  let total = subtotal - desconto + frete;

  // Correção do BUG 4: Arredondar para duas casas decimais
  return Number(total.toFixed(2));
}

module.exports = { calcularTotal };