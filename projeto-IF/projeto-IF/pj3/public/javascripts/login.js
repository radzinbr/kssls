var log = document.getElementById("login");
var reg = document.getElementById("register");
var button = document.getElementById("btn")

function register() {
  log.style.left = "-400px"
  reg.style.left = "50px"
  button.style.left = "110px"
}

function login() {
  log.style.left = "50px"
  reg.style.left = "450px"
  button.style.left = "0"
}

// pegar dados do usuario

async function getUserData() {
  try {
    const response = await fetch('http://localhost:3200/users'); // Substitua pela sua rota real
    const userData = await response.json();

    // Atualize os elementos HTML com os dados do usuário
    document.getElementById('profileImage').src = userData.photo;
    document.getElementById('profileName').innerText = userData.username;

  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
  }
}

// enviar form
function enviarform(event) {
  event.preventDefault();

  // Obtém os valores dos campos do formulário
  var nome = document.getElementById("register").elements["username"].value;
  var email = document.getElementById("register").elements["Email"].value;
  var senha = document.getElementById("register").elements["senha"].value;

  // Obtém o país selecionado
  var paisSelecionado = getSelectedCountry();

  // Aqui você pode adicionar a lógica para enviar esses dados ao servidor, por exemplo, usando uma solicitação AJAX.

  // Exemplo de como você pode usar a função fetch para enviar os dados para um servidor (substitua a URL pelo seu endpoint real):
  fetch('http://localhost:3200/auth/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: nome,
      email: email,
      senha: senha,
      pais: paisSelecionado,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Aqui você pode lidar com a resposta do servidor, por exemplo, exibir uma mensagem de sucesso
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}

// Função para obter o país selecionado
function getSelectedCountry() {
  const selectedIcon = document.querySelector('.icon.selected img');
  if (selectedIcon) {
    return selectedIcon.alt;
  } else {
    // Tratar caso nenhum ícone seja selecionado
    return 'País não selecionado';
  }
}

// editar usuario

const editarUser = async (event) => {
  event.preventDefault()
  console.log("ta funcionando")
  const editUser = {
    username: event.target.nome.value,
    email: event.target.profissao.value,
    senha: event.target.localizacao.value,
    photo: event.target.nomeExibicao.value
  }

  const response = await fetch('http://localhost:3200/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editUser)
  })

  if (response.ok) {
    const data = await response.json()
    alert(data.success)
    setShowModal(false)
    setUsers([...users, data.user])
  }
}

// autenticar login
async function fazerLogin(event) {
  event.preventDefault();

  // Obtém os valores dos campos do formulário
  var email = document.getElementById("login").elements["Email"].value;
  var senha = document.getElementById("login").elements["senha"].value;

  // Obtém o país selecionad

  // Aqui você pode adicionar a lógica para enviar esses dados ao servidor, por exemplo, usando uma solicitação AJAX.

  // Exemplo de como você pode usar a função fetch para enviar os dados para um servidor (substitua a URL pelo seu endpoint real):
  fetch('http://localhost:3200/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
    // ... restante do código ...
  })
  .then(response => {
    if (response.ok) {
        // Redireciona para a página desejada após uma resposta bem-sucedida
        window.location.href = '/';
        return response.json();
    } else {
        // Se o status da resposta não for OK, verifica se a senha está incorreta
  
            // Exibe um alerta para indicar senha incorreta
            alert('Senha incorreta');
        }})
    .then(data => {
      // Aqui você pode lidar com a resposta do servidor, por exemplo, exibir uma mensagem de sucesso
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}


async function verificarToken() {
  const response = await fetch('http://localhost:3200/auth/loginToken', {
    method: 'GET',
    credentials: 'include', // Para incluir cookies na solicitação
  });

  const data = await response.json();
  console.log(data);
}

async function fazerLogout() {
  const response = await fetch('http://localhost:3200/auth/logout', {
    method: 'POST',
    credentials: 'include', // Para incluir cookies na solicitação
  });

  const data = await response.json();
  console.log(data);
}