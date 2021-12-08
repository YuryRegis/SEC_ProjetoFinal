# HDT - HASH DEVELOPER TOOL 

Este projeto-desafio teve como finalidade alinhar os estudos adquiridos em sala de aula, para entrega do trabalho avaliativo de conclusão da disciplina "Segurança e Criptografia de Dados", do curso de Ciência da Computação, da Universidade Católica de Minas Gerais (PUC-MG), unidade de Poços de Caldas/MG, tendo como orientador o professor João Benedito dos Santos Junior. 

<hr style="border:2px solid gray"> </hr>

## Objetivos:
- Gerar uma aplicação/ferramenta, de fácil manuseio, que auxilie nas tarefas de análise forense, à fim de aplicar o conhecimento adquiridos em sala de aula;
- Alinhar os conhecimentos adquiridos no seminário de React, ofertado na semana da Ciência da Computação, com o conteúdo da disciplina de "Segurança e Criptografia de Dados";
- Transformar uma aplicação Web em uma aplicação desktop; 

## Desafio proposto:
Gerar uma aplicação de interface gráfica que possibilite um usuário a realizar tarefas rotineiras sem o uso de comandos no terminal. Dentre os recursos que pretende-se implementar na aplicação destacam-se:
    - Gerar uma hash a partir de um arquivo ou diretório do mesmo;
    - Verificar se uma hash é válida ou não;

## Desafios futuros:
Dentre os recursos que pretende-se implementar em versões futuras, destacam-se:
    - Listar dispositivos Android conectados ao computador;
    - Realizar extração de arquivos de um dispositivo Android selecionado;

 
<p align="center">
  <img src="https://i.ibb.co/sHwnXz9/HASHDEVTOOL.png">
</p>

### Gerador de Hash
Nesta tela o usuário será capaz de gerar uma hash SHA256 de um arquivo, passando sua referência local (diretório) ou selecionando o mesmo através de uma caixa de diálogo nativa do seu sistema operacional;

### Verificador de Hash
Nesta tela o usuário será capaz de validar uma hash SHA256 de um arquivo, passando sua referência local (diretório) ou selecionando o mesmo através de uma caixa de diálogo nativa do seu sistema operacional;


<hr style="border:2px solid gray"> </hr>

## Instruções para gerar Build:

Antes de iniciar o processo de build, instale as dependências do projeto com o gerenciador de pacotes yarn ou npm. \
Na raiz do projeto, abra o terminal e execute o comando:
```$ yarn```

### Windows
Na raiz do projeto, abra o terminal e execute o comando:
```$ yarn build```

### Linux
Em breve...

### MacOS
Em breve...

## Instruções para gerar aplicação executável [Documentação](https://www.electron.build/cli):

Certifique-se que já tenha realizado o build do projeto antes de executar os comandos abaixo. \
Uma pasta com o nome da aplicação será criada na raiz do diretório aberto no terminal.

## Windows 
Abra o terminal na pasta de destino da aplicação e execute o comando:
```$ electron-packager <diretorio-do-projeto> <nome-do-app> --platform=win32 --arch=x64```

## Linux
Abra o terminal na pasta de destino da aplicação e execute o comando:
```$ electron-packager <diretorio-do-projeto> <nome-do-app> --platform=linux```

## MacOS
Abra o terminal na pasta de destino da aplicação e execute o comando:
```$ electron-packager <diretorio-do-projeto> <nome-do-app> --platform=darwin```

### DOWNLOAD (v0.1.0)

- Windows   [Google Drive]()
- Linux     [Google Drive]()
- MacOS     [Google Drive]()
