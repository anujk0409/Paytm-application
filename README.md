# Paytm-like Application

This is a dummy Paytm-like application built with React and Node.js, providing a signup/signin functionality, JWT-based authentication, and a mock payment system. After a successful signup or signin, users are redirected to a dashboard where they can view and make payments using a randomly generated balance.

## Features

-   **User Signup and Signin**: Create an account with your name, email, and password.
-   **JWT Authentication**: Users are authenticated with JSON Web Tokens (JWT) stored in `localStorage`.
-   **Validation with Zod**: Input validation is performed using the Zod library to ensure data integrity.
-   **Mock Payment System**: Users are given a random dummy balance upon signup and can simulate making payments.
-   **Dashboard**: After logging in, users are redirected to the dashboard where they can manage their balance and payments.

## Technologies Used

-   **Frontend**: React, Axios, TailwindCSS
-   **Backend**: Node.js, Express, MongoDB, JWT, Zod
## Usage

1.  **Signup**:
    
    -   Enter your first name, last name, email, and password to sign up.
    -   Your account will be created, and you'll receive a random balance.
    -   You’ll be redirected to the dashboard upon successful signup.
2.  **Signin**:
    
    -   Enter your credentials to log in.
    -   On successful login, you'll be redirected to the dashboard where you can make payments.
3.  **Dashboard**:
    
    -   View your dummy balance.
    -   Make mock payments using the available balance.

## API Endpoints

### User Routes

-   **POST /api/v1/user/signup**: Registers a new user and generates a JWT token.
-   **POST /api/v1/user/signin**: Logs in an existing user and returns a JWT token.
-   **PUT /api/v1/user**: Updates user information (authenticated route).
-   **GET /api/v1/user/bulk**: Retrieves a list of users based on a filter.

### Account Routes

-   **GET /api/v1/account/balance**: Retrieves the user's account balance (authenticated route).
-   **POST /api/v1/account/transfer**: Transfers money to another user's account (authenticated route).

## Validation

Input validation is managed with **Zod** to ensure:

-   Email is in the correct format.
-   Password meets security criteria.
-   Other user input fields are properly validated before submission.

## JWT Authentication

The authentication uses **JWT tokens**:

-   Upon signup or login, a JWT token is returned and stored in `localStorage`.
-   The token is used for authenticating protected routes like the dashboard.

## Mock Payment

-   Users are assigned a random balance during signup.
-   Payments can be made using this balance, though it is a dummy feature and no actual transactions occur.