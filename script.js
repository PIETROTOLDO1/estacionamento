document.addEventListener("DOMContentLoaded", function() {
    // Array para armazenar os cadastros de vagas de estacionamento
    var cadastros = [];

    // Função para exibir as vagas ocupadas na tela
    function exibirVagasOcupadas() {
        var vagasListDiv = document.getElementById('vagas-list');

        if (!vagasListDiv) {
            console.error("Elemento 'vagas-list' não encontrado no DOM.");
            return;
        }

        vagasListDiv.innerHTML = ''; // Limpa o conteúdo anterior

        cadastros.forEach(function(cadastro) {
            if (cadastro.horarioDisponivel !== 'livre') {
                var vagaDiv = document.createElement('div');
                vagaDiv.classList.add('vaga');
                vagaDiv.innerHTML = `
                    <p>Placa do Veículo: ${cadastro.placaVeiculo}</p>
                    <p>Nome do Proprietário: ${cadastro.nomeProprietario}</p>
                    <p>Número do Apartamento: ${cadastro.numeroApartamento}</p>
                    <p>Bloco do Apartamento: ${cadastro.blocoApartamento}</p>
                    <p>Modelo do Veículo: ${cadastro.modeloVeiculo}</p>
                    <p>Cor do Veículo: ${cadastro.corVeiculo}</p>
                    <p>Número da Vaga de Estacionamento: ${cadastro.numeroVaga}</p>
                    <p>Horário Ocupado: ${cadastro.horarioDisponivel}</p>
                `;
                vagasListDiv.appendChild(vagaDiv);
            }
        });
    }

    // Função para exibir as vagas salvas na tela
    function exibirVagasSalvas() {
        var vagasListDiv = document.getElementById('vagas-list');

        if (!vagasListDiv) {
            console.error("Elemento 'vagas-list' não encontrado no DOM.");
            return;
        }

        vagasListDiv.innerHTML = ''; // Limpa o conteúdo anterior

        var vagasSalvas = JSON.parse(localStorage.getItem('cadastros')) || [];

        vagasSalvas.forEach(function(cadastro, index) {
            var vagaDiv = document.createElement('div');
            vagaDiv.classList.add('vaga');
            vagaDiv.innerHTML = `
                <p><strong>Placa do Veículo:</strong> ${cadastro.placaVeiculo}</p>
                <p><strong>Nome do Proprietário:</strong> ${cadastro.nomeProprietario}</p>
                <p><strong>Número do Apartamento:</strong> ${cadastro.numeroApartamento}</p>
                <p><strong>Bloco do Apartamento:</strong> ${cadastro.blocoApartamento}</p>
                <p><strong>Modelo do Veículo:</strong> ${cadastro.modeloVeiculo}</p>
                <p><strong>Cor do Veículo:</strong> ${cadastro.corVeiculo}</p>
                <p><strong>Número da Vaga de Estacionamento:</strong> ${cadastro.numeroVaga}</p>
                <button class="ediButton" onclick="editarVaga(${index})">Editar</button>
                <button class="excButton" onclick="excluirVaga(${index})">Excluir</button>
                <hr>
            `;
            vagasListDiv.appendChild(vagaDiv);
        });
    }

    // Função para validar e cadastrar uma nova vaga
    function cadastrarVaga() {
        var placaVeiculo = document.getElementById('placa_veiculo').value;
        var nomeProprietario = document.getElementById('nome_proprietario').value;
        var numeroApartamento = document.getElementById('numero_apartamento').value;
        var blocoApartamento = document.getElementById('bloco_apartamento').value;
        var modeloVeiculo = document.getElementById('modelo_veiculo').value;
        var corVeiculo = document.getElementById('cor_veiculo').value;
        var numeroVaga = document.getElementById('numero_vaga').value;

            console.log('Placa do Veículo:', placaVeiculo);
            console.log('Nome do Proprietário:', nomeProprietario);
            console.log('Número do Apartamento:', numeroApartamento);
            console.log('Bloco do Apartamento:', blocoApartamento);
            console.log('Modelo do Veículo:', modeloVeiculo);
            console.log('Cor do Veículo:', corVeiculo);
            console.log('Número da Vaga de Estacionamento:', numeroVaga);

        if (placaVeiculo.trim() === '' || nomeProprietario.trim() === '' || numeroApartamento.trim() === '' || blocoApartamento.trim() === '' || modeloVeiculo.trim() === '' || corVeiculo.trim() === '' || numeroVaga.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        var cadastro = {
            placaVeiculo: placaVeiculo,
            nomeProprietario: nomeProprietario,
            numeroApartamento: numeroApartamento,
            blocoApartamento: blocoApartamento,
            modeloVeiculo: modeloVeiculo,
            corVeiculo: corVeiculo,
            numeroVaga: numeroVaga
            
        };

        cadastros.push(cadastro);

        document.getElementById('form-vaga').reset();

        alert('Cadastro de vaga realizado com sucesso!');

        localStorage.setItem('cadastros', JSON.stringify(cadastros));

        exibirVagasSalvas();
    }

    // Função para editar uma vaga
    function editarVaga(index) {
        var vagasSalvas = JSON.parse(localStorage.getItem('cadastros')) || [];

        var novoCadastro = prompt("Edite os dados da vaga separados por vírgula na ordem: Placa do Veículo, Nome do Proprietário, Número do Apartamento, Bloco do Apartamento, Modelo do Veículo, Cor do Veículo, Número da Vaga de Estacionamento", Object.values(vagasSalvas[index]).join(','));

        if (novoCadastro !== null) {
            var novoCadastroArray = novoCadastro.split(',');
            vagasSalvas[index] = {
                placaVeiculo: novoCadastroArray[0],
                nomeProprietario: novoCadastroArray[1],
                numeroApartamento: novoCadastroArray[2],
                blocoApartamento: novoCadastroArray[3],
                modeloVeiculo: novoCadastroArray[4],
                corVeiculo: novoCadastroArray[5],
                numeroVaga: novoCadastroArray[6]
            };

            localStorage.setItem('cadastros', JSON.stringify(vagasSalvas));

            exibirVagasSalvas();
        }
    }

    // Função para excluir uma vaga
    function excluirVaga(index) {
        var vagasSalvas = JSON.parse(localStorage.getItem('cadastros')) || [];

        vagasSalvas.splice(index, 1);

        localStorage.setItem('cadastros', JSON.stringify(vagasSalvas));

        exibirVagasSalvas();
    }
    

    // Exibe as vagas salvas ao carregar a página
    exibirVagasSalvas();

    // Adiciona um listener para o formulário de cadastro
    document.getElementById('form-vaga').addEventListener('submit', function(event) {
        event.preventDefault();
        cadastrarVaga();
    });
});