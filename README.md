# React SPA with OAuth2 using Spring Security

## Introduction
Example showcasing the SPA developed using reach to integrate with Spring security using [Spring Authorization Server Implementation](https://github.com/spring-projects/spring-authorization-server)
and Spring OAuth2 Resource server implementation on resources side to validate the *access_tokens* issued by the OAuth2
flow. Since it is demonstrating using public client (SPA - Web client), it tries to use OAuth2 with PKCE flow.

## Components
* *auth-svc* : Service which handles the OAuth2 flows i.e. authorize client, authenticate user and issuing token.
* *user-resource-svc* : Service which gives our resources i.e. users, authentication/authorize requests from *auth-svc*.
* *user-admin-ui* : Demo UI which triggers the whole flow.

## Run Locally

First make sure that you have `mysql` running locally on your machine, and you should create a schema/database into it,
which will be
used by `auth-svc` and then follow below steps to run the example locally(**assuming schema name `auth-db` running
on `localhost` on port `3306`**):

### Clone the repo on your local machine.
Clone the repo on your local machine

### Build two *java* services and run them

> Right now the `iss` value is hardcoded into `SecurityConfig` of `auth-svc`, please change that
> to `http://localhost:9000`
> or remove the `jwtTokenCustomizer`. See, the issues section for issue around it.
```shell
cd ./auth-svc
# These are env variables, you can set these however you like
DB_URL="jdbc:mysql://localhost:3306/auth-db"
DB_USER="urdbusername"
DB_PASS="urdbuserpassword"
./mvnw spring-boot:run

cd ../user-resource-svc
# This env variable is the url for auth-svc above, which is issuer
JWT_ISSUER_URL=http://localhost:9000
./mvnw spring-boot:run
```
You may also import the whole project into Intelij Idea or Spring studio or eclipse as well and run from there. Import using
the parent project i.e. *oauth2-idp-spa*

### Run the UI app 
#### Prerequisites
* Node & npm installed
* Install vite using `npm install vite@latest`
* And run using below commands
```shell
cd ./user-admin-ui
npm run dev
```

## Run Inside Docker

Running inside docker is straightforward, there is a shell utility which will make the job easy, you just need to have
`docker` and `docker-compose` installed on your machine. Follow below steps to run using docker:

1. In root folder, run `./util.sh build`.
2. `./util.sh rebuild-image all`
3. `./util.sh run`

Above will only run both the svc inside docker, but you have to run the UI the same way as mentioned above, currently
there is a bug when running UI in docker behind `nginx` proxy. See the issues section for more detail.

To stop the running containers, run below:
`./util.sh down`

Once, you are done you should clean the temporary directories created in code repo using below command:
`./util.sh clean`
## Useful Links
* [Guideline for implementing authorization server for public & confidential client](https://github.com/spring-projects/spring-authorization-server/issues/297#issue-896744390)
* [React hook to manage OAuth2 flow](https://github.com/tasoskakour/react-use-oauth2)
* [Guide to implement spring authorization server implementation](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/index.html)
* [Guid to implement OAuth2 resource implementation](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html) 

## TODOs - Which might not be completed ever :-)
- [ ] Mapping scopes and authorities into token.
- [ ] Custom authorization i.e. Dynamic permissions for user which can't be embedded into token.
- [x] Introducing JPA into *auth-svc* with read database.
- [ ] Introducing JPA into *user-resource-svc* and deal with real database.
- [ ] BFF pattern for *refresh_token* for SPA.
- [ ] Improve state management on UI side & improve UI (less priority).
- [ ] Search functionality on UI
