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
Please follow below steps to run the example locally:

### Clone the repo on your local machine.
Clone the repo on your local machine

### Build two *java* services and run them
```shell
cd ./auth-svc
mvnw spring-boot:run

cd ../user-resource-svc
mvnw spring-boot:run
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

## Useful Links
* [Guideline for implementing authorization server for public & confidential client](https://github.com/spring-projects/spring-authorization-server/issues/297#issue-896744390)
* [React hook to manage OAuth2 flow](https://github.com/tasoskakour/react-use-oauth2)
* [Guide to implement spring authorization server implementation](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/index.html)
* [Guid to implement OAuth2 resource implementation](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html) 

## TODOs
- [ ] Mapping scopes and authorities into token.
- [ ] Custom authorization i.e. Dynamic permissions for user which can't be embedded into token.
- [ ] Introducing JPA into both *auth-svc* and *user-resource-svc* and deal with real database.
- [ ] Search functionality on UI
- [ ] BFF pattern for *refresh_token* for SPA.
- [ ] Improve state management on UI side & improve UI (less priority).
