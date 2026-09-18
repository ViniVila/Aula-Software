Teste de Carrinho de Compras

Projeto de testes de software para o módulo de checkout de um E-Commerce em Node.js. O foco é validar a função calcularTotal(itens, cupom), que calcula o valor final de uma compra aplicando desconto de cupom, regra de frete, arredondamento e validação de entradas inválidas.

O projeto acompanha um Plano de Testes de Software & GOT (Guia de Ordem de Testes), com a matriz de rastreabilidade entre regras de negócio e casos de teste.

Sumário
Estrutura do projeto
Requisitos
Instalação
Como executar
Regras de negócio
Uso da função
Casos de teste (GOT)
Bugs corrigidos
Solução de problemas
Autor
Estrutura do projeto
.
├── Carrinho.js                                # Função calcularTotal (código sob teste)
├── carrinho.test.js                           # Testes automatizados (Jest)
├── index.js                                   # Testes manuais (caixa preta) via console
├── Plano_de_Testes_de_Software.docx           # Plano de testes e matriz GOT
├── package.json
└── package-lock.json
Arquivo	Descrição
Carrinho.js	Implementa e exporta calcularTotal(itens, cupom).
carrinho.test.js	Suíte automatizada com 6 casos de teste (CT-01 a CT-06) usando Jest.
index.js	Script que executa os mesmos cenários manualmente e imprime PASSOU/ERRO no terminal.
Plano_de_Testes_de_Software.docx	Documento de planejamento: identificação, escopo, regras de negócio e matriz GOT.
Requisitos
Node.js 18 ou superior (o plano de testes foi elaborado com Node.js v24.12.0)
npm (instalado junto com o Node.js)
Instalação
bash
npm install

Isso instala a única dependência de desenvolvimento, o Jest (^30.5.2).

Como executar
Testes automatizados (Jest)
bash
npm test

Saída esperada:

PASS ./carrinho.test.js
  Suite de Testes do Carrinho de Compras
    ✓ CT-01: Deve conceder frete grátis para compras de exatamente R$ 100
    ✓ CT-02: Deve aplicar 10% de desconto com o cupom PROMO10
    ✓ CT-03: Deve lançar erro se houver item com quantidade negativa ou zero
    ✓ CT-04: Deve arredondar o valor final para duas casas decimais
    ✓ CT-05: Deve lançar erro para carrinho vazio
    ✓ CT-06: Deve cobrar frete de R$ 15 para compras abaixo de R$ 100

Tests: 6 passed, 6 total
Testes manuais (caixa preta)
bash
node index.js

O script imprime, para cada caso, o resultado esperado, o obtido e se passou ou falhou.

Regras de negócio
Regra	Descrição
Subtotal	Soma de preco × quantidade de cada item.
Validação de entrada	Carrinho vazio ([]), item com quantidade <= 0 ou preco < 0 lança o erro "Carrinho inválido".
Cupom	O cupom "PROMO10" aplica 10% de desconto sobre o subtotal.
Frete	Subtotal >= R$ 100,00 → frete grátis. Subtotal < R$ 100,00 → frete de R$ 15,00.
Arredondamento	O total final possui exatamente 2 casas decimais.

Fórmula: total = subtotal - desconto + frete

Uso da função
js
const { calcularTotal } = require('./Carrinho');

calcularTotal([{ preco: 100, quantidade: 1 }], null);      // 100   (frete grátis)
calcularTotal([{ preco: 50, quantidade: 1 }], 'PROMO10');  // 60    (50 - 5 + 15)
calcularTotal([{ preco: 80, quantidade: 1 }], null);       // 95    (80 + 15)
calcularTotal([{ preco: 33.333, quantidade: 1 }], null);   // 48.33 (arredondado)

calcularTotal([], null);                                   // Error: Carrinho inválido
calcularTotal([{ preco: 10, quantidade: -2 }], null);      // Error: Carrinho inválido

Parâmetros

itens (Array<{ preco: number, quantidade: number }>): itens do carrinho.
cupom (string | null): código do cupom de desconto (apenas "PROMO10" é reconhecido).

Retorno: number, o total da compra com 2 casas decimais.

Exceção: lança Error("Carrinho inválido") para entradas inválidas.

Casos de teste (GOT)

A matriz abaixo relaciona cada caso de teste com a regra validada e o comportamento observado na versão inicial (1.0.0-bugged), antes das correções.

ID	Cenário / Regra	Entrada	Esperado	Obtido (versão inicial)
CT-01	Frete grátis exato na borda	Item 100,00 × 1, sem cupom	100	115
CT-02	Cupom de 10%	Item 50,00 × 1, PROMO10	60 (50 − 5 + 15)	55 (50 − 10 + 15)
CT-03	Quantidade negativa	Item 10,00 × −2, sem cupom	Erro "Carrinho inválido"	-5
CT-04	Arredondamento de centavos	Item 33,333 × 1, sem cupom	48.33	48.333333333333336
CT-05	Carrinho vazio	[], sem cupom	Erro "Carrinho inválido"	Erro "Carrinho inválido"
CT-06	Frete pago (< 100)	Item 80,00 × 1, sem cupom	95 (80 + 15)	95

Os casos CT-05 e CT-06 já passavam na versão inicial e servem de referência para garantir que as correções não causaram regressão. Após as correções, os 6 casos passam.

Bugs corrigidos

Quatro defeitos foram identificados pelos testes e corrigidos em Carrinho.js:

Bug	Caso que revelou	Problema	Correção
BUG 1	CT-03	Quantidades zero/negativas e preços negativos eram aceitos.	Validação de quantidade <= 0 e preco < 0, lançando "Carrinho inválido".
BUG 2	CT-02	Cupom PROMO10 descontava R$ 10 fixos em vez de 10%.	desconto = subtotal * 0.10.
BUG 3	CT-01	Frete grátis só valia acima de R$ 100 (>), excluindo o valor exato.	Condição alterada para subtotal >= 100.
BUG 4	CT-04	O total era retornado sem arredondamento.	Number(total.toFixed(2)).
Solução de problemas

No tests found, exiting with code 1

O Jest só reconhece arquivos de teste com o padrão *.test.js ou *.spec.js. Se o arquivo de testes estiver com outro nome (por exemplo, carrinho_test.js), renomeie-o:

bash
mv carrinho_test.js carrinho.test.js

Cannot find module './Carrinho'

O require diferencia maiúsculas e minúsculas em sistemas Linux e macOS. Confirme que o arquivo se chama exatamente Carrinho.js.

Autor

Vinícius Vila Nova
