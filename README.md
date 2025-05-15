# 🏠 imobcalc

APP Android para cálculo de financiamentos imobiliários, utilizando as tabelas SAC e PRICE. Baseado em IONIC 6 com Angular, usa capacitor 3.0 para adicionar módulos que fazem conexão com o hardware do smartphone, garantindo diversas funcionalidades e interações com o usuário final.

## 🧠 Visão Geral

O **imobcalc** é uma aplicação desenvolvida para auxiliar no cálculo de financiamentos imobiliários, permitindo a simulação de parcelas e a análise de diferentes condições de pagamento.

---

## 🛠️ Tecnologias Utilizadas

- **Angular** - Framework para aplicações web
- **Ionic 6** - Framework para desenvolvimento de aplicativos móveis
- **TypeScript** - Superset do JavaScript
- **Capacitor** - Ferramenta para construção de aplicativos nativos
- **Karma** - Ferramenta de testes para JavaScript

---

## ✅ Requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente
- [Android Studio](https://developer.android.com/studio) com SDKs e emuladores configurados
- Dispositivo Android com **Depuração USB** ativada (para testes em hardware)

---

## 🚀 Instalação e Teste

1. Clone o repositório:

  ```bash
  git clone https://github.com/detonador31/imobcalc.git
  ```
   
2. Acesse o diretório do projeto:
  ```bash
  cd imobcalc
  ```

3. Instale as dependências:
  ```bash
  npm install
  ```
4. Adicione a plataforma Android:
  ```bash
  ionic capacitor add android
   ```

5. Sincronize as alterações:
  ```bash
  ionic capacitor sync
   ```

6. Execute a aplicação no navegador:
  ```bash
  ionic serve
   ```

---

## 📱 Executando no Android

🔌 **Dispositivo Físico**

1. Conecte seu dispositivo Android ao computador via USB.

2. Ative a Depuração USB nas opções de desenvolvedor do dispositivo.

3. Execute o aplicativo no dispositivo:
  ```bash
  ionic capacitor run android
   ```

📱 **Emulador Android**

1. Abra o Android Studio e configure um emulador (AVD).

2. Execute o aplicativo no emulador:
  ```bash
  ionic capacitor run android --target=<nome_do_emulador>
   ```

  Substitua <nome_do_emulador> pelo nome do seu emulador. Você pode listar os emuladores disponíveis com:
  ```bash
  ionic capacitor run android --list
   ```

🔄 **Live Reload (Opcional)**

Para habilitar o live reload durante o desenvolvimento:
  ```bash
  ionic capacitor run android -l --external
  ```
Certifique-se de que o dispositivo ou emulador esteja na mesma rede que o computador.

---

## ⚙️ Funcionalidades

- **Cadastro de Informações Bancárias:**
  - Taxas bancárias
  - Juros anuais
  - Avaliação de garantia
  - Até 5 taxas adicionais (Ex.: seguro de vida, MRV, MVC, entre outras específicas de cada instituição).

- **Formulário de Entrada de Dados:**
  - Seleção do banco
  - Valor do imóvel
  - Valor da entrada
  - Inclusão ou não de ITBI e escritura
  - Renda familiar mensal
  - Definição do número de parcelas (em meses ou anos)

- **Resultados Gerados:**
  - Valor total dos juros
  - Soma total das prestações
  - Soma das prestações + entrada
  - Total das taxas cobradas
  - Valor discriminado de cada parcela (incluindo taxas e amortização)

- **Cálculo de parcelas utilizando as tabelas SAC e PRICE**

- **Simulação de diferentes condições de financiamento**

---

## 📄 Licença
Este projeto está licenciado sob a MIT License.

---

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

## 📞 Contato

- GitHub: @detonador31
- Email: swat2014@outlook.com
