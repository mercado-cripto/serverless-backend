# Instalación

## Credenciales AWS para desarrollo.

Configura tus llaves de acceso.

Estas son necesarias para conectar el codigo y desplegarlo en un ambiente propio de desarrolo serverless.

- Usuario y contraseña AWS console.
- AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY

## Requerimientos

Node JS (nvm recomended) >= 11.15.0

- https://github.com/nvm-sh/nvm

Yarn or NPM

- https://classic.yarnpkg.com/en/docs/install/#debian-stable

Install and configure serverless framework

- https://serverless.com/framework/docs/providers/aws/guide/credentials/

  ```
  npm install -g  serverless

  serverless config credentials --provider aws --key AKIA****** --secret AgE72XN0CXQgT***daada32gw***
  ```

Install and configure aws-cli

- https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html

  ```
  aws configure
  ```

## Desarrollo Local

### Deploy

Para levantar este proyecto, el resultado del siguiente comando, desplegara en la nube de aws todo el proyecto y generara las URL y Configuraciones necesarias para conectar la web app

```
serverless deploy --stage prod --API_KEY tSbCxwTCRQWx6r4dppTxnb9agEDZHjPdMw --ORX_API_KEY 3o5GsDdP95xq9SkQLpBiFH9mJsKuLcGmsN --ORX_SECRET_KEY tSbCxwTCRQWx6r4dppTxnb9agEDZHjPdMw

Output deberia ser similar a :

Serverless: DOTENV: Could not find .env file.
Serverless: Bundling with Webpack...
Serverless: No external modules needed
Serverless: Packaging service...
Serverless: Service files not changed. Skipping deployment...
Service Information
service: mc-serverless-backend
stage: prod
region: us-east-1
stack: mc-serverless-backend-prod
resources: 40
api keys:
  None
endpoints:
  GET - https://55555555.execute-api.us-east-1.amazonaws.com/prod/getData
functions:
  getData: mc-serverless-backend-prod-getData
  cronDataCMC: mc-serverless-backend-prod-cronDataCMC
  cronDataBUDA: mc-serverless-backend-prod-cronDataBUDA
  cronDataCMKT: mc-serverless-backend-prod-cronDataCMKT
  cronDataORX: mc-serverless-backend-prod-cronDataORX
  cronDataSTTG: mc-serverless-backend-prod-cronDataSTTG
layers:
  None
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

Con lo anterior se genera el archivo.env para la web app

```
REACT_APP_apiGateway_REGION=us-east-1
REACT_APP_apiGateway_URL=https://55555555.execute-api.us-east-1.amazonaws.com/prod/getData
```

Se tiene ahora el .env para levantar la web app y conectarla al backend.

# Contribuciones.

Si deseas aportar al proyecto:

- Fork repositorio

- Clonar repositorio

- Cree un branch por cada feature o cambio realizado.

- Realiza tu trabajo y realiza commits con nombres logicos.

- Pushea tu codigo a tu repositorio (fork)

- realiza un nuevo Pull Request a Mercado Cripto.
