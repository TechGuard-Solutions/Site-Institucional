function changeRegister() {
    var cadastroEmpresa = document.getElementById("cadastro-empresa");
    var cadastroTeste = document.getElementById("cadastro-teste");

    cadastroTeste.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
    cadastroTeste.style.opacity = "0";
    cadastroTeste.style.visibility = "hidden";

    setTimeout(function () {
        cadastroTeste.style.display = "none";
        cadastroEmpresa.style.display = "flex";

        setTimeout(function () {
            cadastroEmpresa.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
            cadastroEmpresa.style.opacity = "1";
            cadastroEmpresa.style.visibility = "visible";
        }, 10);
        setTimeout(function () {
            cadastroTeste.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
            cadastroTeste.style.opacity = "1";
            cadastroTeste.style.visibility = "visible";
        }, 10);
    }, 500);
}

function mandarParaTela() {
    window.location.href = "login.html";
}

function cadastrarUsuario() {
    var nome_usuario = nomeUsuario.value;
    var email_usuario = emailUsuario.value;
    var cpf_usuario = cpfUsuario.value;
    var tel_usuario = telUsuario.value
    var senha_usuario = senhaUsuario.value;
    var confirmarsenha_usuario = confirmarSenhaUsuario.value;

    fetch("/usuarios/cadastrarUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeUsuarioServer: nome_usuario,
            emailUsuarioServer: email_usuario,
            cpfServer: cpf_usuario,
            telUsuarioServer: tel_usuario,
            senhaServer: senha_usuario,
            confirmarSenhaServer: confirmarsenha_usuario
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert('Usuario Cadastrado');
                mandarParaTela();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;

}

function cadastrarEmpresa() {
    var nome_empresa = nomeEmpresa.value;
    var email_empresa = emailCorporativo.value;
    var cep_empresa = cep.value;
    var cnpj_empresa = cnpj.value;
    var tel_empresa = telefoneEmpresa.value;

    var arroba = email_empresa.indexOf('@');
    var ponto = email_empresa.indexOf('.');

    if (nome_empresa < 3) {
        alert("Nome da empresa muito curto!");
        console.log(nome_empresa);
    } else if (arroba == -1 || ponto == -1) {
        alert("Email Inválido!");
        console.log(email_empresa);
    } else if (cep_empresa.length < 9) {
        alert("CEP Inválido! Por favor verifique novamente");
        console.log(cep_empresa);
    } else if (tel_empresa < 8) {
        alert("Telefone Inválido");
    } else if (cnpj_empresa.length < 18) {
        alert("CNPJ Inválido!");
        console.log(cnpj_empresa);
    } else {
        fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeEmpresaServer: nome_empresa,
                emailCorporativoServer: email_empresa,
                cepServer: cep_empresa,
                cnpjServer: cnpj_empresa,
                telEmpresaServer: tel_empresa
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    alert('Empresa Cadastrada');
                    console.log("cnpj fetch empresa: " + cnpj_empresa)
                    identificarEmpresa(cnpj_empresa);
                    // mandarParaTela();

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro da empresa!";
                }
            })
            .catch(function (erro) {
                console.log(`#ERRO: ${erro}`);
            });

        return false;
    }

}

function identificarEmpresa(cnpj) {
    fetch("/usuarios/identificarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnpj: cnpj })
    })
        .then(function (resposta) {
            console.log("empresa identificada: ", resposta);

            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json[0].idEmpresa);
                    sessionStorage.idEmpresa = json[0].idEmpresa;
                });
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}
