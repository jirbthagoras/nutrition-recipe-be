# Basic Guide

## Overview

A Backend Project implementing some technologies such as ExpressJS with Typescript. To support the development side further, Prisma ORM will be considered to use.

## API Specification

This time we will be using JWT to secure communication between client and server. This is the API docs that will be updated regularly:

<a href="/">REDACTED</a>

# How to run?

As we mention before, we use TypeScript (Superset of JavaScript) that needs to be compiled to JavaScript first.

<br>

Clone the repository
```shell
git clone https://github.com/jirbthagoras/nutrition-recipe-be.git
```


Install dependencies
```shell
npm install
```

Build the code, the result will be in the **dist/** folder.
```shell
npm run build
```

To run it for **production** you can use:
```shell
npm run start
```

For **development**, nodemon dependencies will be providing a robust development process
```shell
npm run dev
```