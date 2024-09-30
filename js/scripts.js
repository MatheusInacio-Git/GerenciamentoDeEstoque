let idProdutoAtual = 1; // Mantém o controle do último ID de produto
let produtoSelecionado;
const imagemPadrao = './img/semFoto.png'; // Caminho da imagem padrão

// Função para alterar o nome do produto
function mudarNomeProduto(idProduto) {
    const novoNome = prompt("Digite o novo nome do produto:");
    if (novoNome) {
        document.getElementById(`nome-produto-${idProduto}`).innerText = novoNome;
    }
}

// Função para ajustar o estoque
function ajustarEstoque(idProduto, quantidade) {
    const elementoEstoque = document.getElementById(`estoque-produto-${idProduto}`);
    let estoqueAtual = parseInt(elementoEstoque.innerText);
    
    estoqueAtual += quantidade;

    if (estoqueAtual < 0) {
        alert("O estoque não pode ser negativo!");
        return;
    }

    elementoEstoque.innerText = estoqueAtual;

    const elementoStatus = document.getElementById(`status-${idProduto}`);
    if (estoqueAtual === 0) {
        elementoStatus.innerHTML = '<span class="badge badge-danger">Esgotado</span>';
    } else {
        elementoStatus.innerHTML = '<span class="badge badge-success">Disponível</span>';
    }
}

// Função para fazer upload da imagem do produto
function uploadImagem(idProduto) {
    const input = document.getElementById(`upload-imagem-${idProduto}`);
    const imagem = document.getElementById(`imagem-produto-${idProduto}`);

    const reader = new FileReader();
    reader.onload = function (e) {
        imagem.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}


// Função para adicionar produtos
function adicionarProduto() {
    const idProduto = document.querySelectorAll('.cartao-produto').length + 1;

    const novoProduto = document.createElement('div');
    novoProduto.classList.add('col-md-4');
    novoProduto.id = `produto-${idProduto}`;

    novoProduto.innerHTML = `
        <div class="cartao-produto mb-4">
            <div class="card">
                <img src="${imagemPadrao}" alt="Produto ${idProduto}" id="imagem-produto-${idProduto}" class="card-img-top img-fluid">
                <div class="card-body">
                    <h5 class="card-title" id="nome-produto-${idProduto}">Produto ${idProduto}</h5>
                    <p class="card-text">Estoque: <span id="estoque-produto-${idProduto}">0</span> unidades</p>
                    <p class="status" id="status-${idProduto}"><span class="badge badge-danger">Esgotado</span></p>

                    <div class="d-flex justify-content-between flex-wrap">
                        <button class="btn btn-outline-secondary mb-2" data-toggle="modal" data-target="#modalMudarNome" onclick="abrirModal(${idProduto})">Mudar Nome</button>
                        <button class="btn btn-outline-primary mb-2" onclick="ajustarEstoque(${idProduto}, 1)">Adicionar +1</button>
                        <button class="btn btn-outline-danger mb-2" onclick="ajustarEstoque(${idProduto}, -1)">Remover -1</button>
                    </div>

                    <div class="d-flex justify-content-between flex-wrap mt-3">
                        <div class="upload">
                            <label for="upload-imagem-${idProduto}" class="btn btn-outline-info mb-2">Alterar Imagem</label>
                            <input type="file" id="upload-imagem-${idProduto}" class="input-file" style="display:none;" onchange="uploadImagem(${idProduto})">
                        </div>
                        <button class="btn btn-danger mb-2" onclick="excluirProduto(${idProduto})">Excluir Produto</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('lista-produtos').appendChild(novoProduto);
}


// Função para excluir um produto
function excluirProduto(idProduto) {
    const produto = document.getElementById(`produto-${idProduto}`);
    produto.remove();
}

// Função para abrir o modal e carregar o ID do produto
function abrirModal(idProduto) {
    produtoSelecionado = idProduto;
    document.getElementById('novo-nome-produto').value = '';  // Limpa o campo ao abrir o modal
}

// Função para salvar o novo nome do produto
function salvarNomeProduto() {
    const novoNome = document.getElementById('novo-nome-produto').value;
    if (novoNome.trim()) {
        document.getElementById(`nome-produto-${produtoSelecionado}`).innerText = novoNome;
        $('#modalMudarNome').modal('hide');  // Fecha o modal após salvar
    } else {
        alert("O nome do produto não pode estar vazio!");
    }
}
