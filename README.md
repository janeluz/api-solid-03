#App

GymPass style app.

## RFs(REQUISITOS FUNCIONAIS)
- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível usuário obter seu histórico de check-ins;
- [] Deve ser possível usuário buscar academias próximas;
- [] Deve ser possível usuário buscar academias pelo nome;
- [] Deve ser possível usuário realizar check-in  de um usuário;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;


## RNs (REGRAS DE NEGÓCIOS)
- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer  2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto(100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser cadastrada por administradores;

## RNFs (REQUISITOS NÃO FUNCIONAIS)
- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um jwt(Jason web token)