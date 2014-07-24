#Meteor.js no OpenShift
Publique [meteor.js](http://meteor.com/) application bundles no [OpenShift](http://openshift.com/)

<a href='https://www.openshift.com/blogs/cloudy-with-a-chance-of-meteorjs'><img src='https://www.openshift.com/sites/default/files/meteorshift_1.png'/></a>

Se esta é a sua primeira vez usando [Getup Cloud OpenShift](http://getupcloud.com/) ou [Meteor](http://meteor.com/), pule para a seção [Notas de Setup Básico](https://github.com/getupcloud/openshift-meteorjs-quickstart#basic-setup-notes) abaixo.

## Configure seu gear OpenShift
Crie uma nova aplicação OpenShift com [Node.js](http://nodejs.org), [MongoDB](http://www.mongodb.org/) e [o básico para ajudar o meteor.js conectar nas portas corretas](https://github.com/getupcloud/openshift-meteorjs-quickstart). Este exemplo usa o nome de aplicação "**meteor**"

    rhc app create meteor nodejs-0.10 mongodb-2.2 --from-code=https://github.com/getupcloud/openshift-meteorjs-quickstart.git

O comando acima irá produzir uma cópia local do código fonte de sua aplicação OpenShift em uma pasta com o mesmo nome da aplicação. Certifique-se de rodar esse comando em um diretório onde você gostaria de manter seus projetos.

## Crie um projeto exemplo do Meteor.js
Para ver a lista de todos os projetos de exemplo do meteor.js, digite `meteor create --list`.

Neste guia, usaremos o exemplo "leaderboard":

    meteor create --example leaderboard

Veja [http://meteor.com/examples/](http://meteor.com/examples/) para conhecer todos os exemplo disponíveis. Sinta-se a vontade para testar todos eles.

## Empacote seu código meteor.js
Empacote seu código meteor.js:

    cd leaderboard # se voce escolheu o exemplo leaderboard
    meteor bundle bundle.tar.gz # preparar para a publicação

Em seguida, você precisa extrair o código resultante dentro do diretório de sua aplicação OpenShift (menos o diretório "bundle/" que o Meteor irá incluir automaticamente). Use a flag -k quando extrair para evitar que o código de conexão ao banco seja sobrescrito no processo de merge.

Se estiver desenvolvendo no Linux, ou usando o tar da GNU, este comando deve servir:

    tar -xvf bundle.tar.gz --transform 's|^bundle/||' -C ../meteor/

Para Mac ou sistemas BSD-based:

    tar -xvf bundle.tar.gz -s '/^bundle//' -C ../meteor/

O exemplo acima assume que você nomeou sua aplicação OpenShift de "meteor", como mostrado no passo `rhc app create`.  Além disso, que o código de sua aplicação OpenShift está disponível neste caminho relativo: `../meteor`

Adcione estes novos arquivos no repositório Git de sua aplicação OpenShift:

    cd ../meteor
    git add .
    git commit -am "Adding a meteor.js application bundle"

## Deploy no OpenShift
Por fim, publique o novo código no OpenShift:

    git push

É isso! Confira sua nova aplicação Meteor.js em:

    http://meteor-$yournamespace.getup.io

## Notas de Setup Básico
Você precisa de uma conta OpenShift na Getup Cloud, além do comando de terminal `rhc` para seguir os passos desse guia. Você também precisa do [Node.js](http://nodejs.org), [MongoDB](http://mongodb.org), e **Meteor** disponíveis em seu ambiente de desenvolvimento local.

### Instalando meteor.js

    curl https://install.meteor.com | sh

### Conta Getup Cloud
Acesse http://getupcloud.com/#/sign-up e faça seu cadastro. Você recebe gratuitamente 750hs para testar a plataforma.

Veja as instruções para instalar o `rhc` em [nosso fórum](https://getup.zendesk.com/entries/23056511-Instalando-o-RHC).

Se precisar de qualquer ajuda, procure-nos no [chat do site](http://getupcloud.com), em [nosso forums](http://getup.zendesk.com/forums) ou através do email suporte@getupcloud.com
