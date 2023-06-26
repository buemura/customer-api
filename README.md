# Stone Customer API

- [Project Overview](#project-overview)
- [Installation](#installation)
  - [Repositories](#repositories)
- [Run locally](#run-locally)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Architecture Diagram](#architecture-diagram)
- [Author](#author)

## Project Overview

This project is a customer API for Stone challenge. Where the main goal is to allow customers management.

## Installation

### Repositories

- Clone the repository:

```bash
git clone https://github.com/buemura/stone-customer-api.git
```

- After cloned the repository, install all the dependencies using the commands below:

```bash
npm install
```

- Create a `.env` file in the root of the project. You can copy from `.env.example`.

## Run locally

- To run the API in the local environment, use the command below:

```bash
npm run docker:up
```

- This command will start the redis, as well as the API.

## Usage

- After the API is up and running, go to your browser and access the URL `http://127.0.0.1:8080/docs` to see the Swagger API Documentation.

## Features

- As an user you can create a new customer.
- As an user you can update a customer by its Id.
- As an user you get a customer details by its Id.

## Technologies Used

- NodeJS
- NestJS
- Axios
- TypeScript
- Redis

### Architecture Diagram

![Architecture Diagram](docs/arch.png)

## Author

Bruno Hideki Uemrua

- [LinkedIn](https://www.linkedin.com/in/bruno-uemura/)
