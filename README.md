# Order portal client

## Overview

This portal is a comprehensive platform designed to streamline the process of creating and managing orders. 
It offers a range of features including real-time order status updates, user management, and localization.

## Features

### Order creation

Users can create orders with ingredients of their choice. 
This feature provides flexibility and personalization to cater to individual preferences.

### Order management

The platform allows users to manage their orders effectively. 
Users can track the status of their orders in real time, providing transparency and enhancing user experience.

### User management

The portal includes a user management system that allows ranking of users. 
This can be used to prioritize orders, offer rewards, or implement any other ranking-based features.

### WebSockets and notification system

The platform uses WebSocket technology for real-time communication between the client and the server. 
This enables instant updates, ensuring users are always informed about the status of their orders. 
The notification system further enhances this by alerting users of any important updates or changes.

### Localization

To cater to a global user base, the portal includes a localization feature. 
This ensures that users from different regions can use the platform in their local language, enhancing accessibility and usability.

### Google authentication

Users can authenticate using their Google accounts. 
This provides a secure and convenient way for users to access the platform.

## Installation and setup

1. **Clone the repository**

    First, you need to clone the  repository to your local machine.
   You can do this using the following command:

    ```bash
    git clone <repository-url>
    ```

    Replace `<repository-url>` with the URL of your Order Portal Client repository.

3. **Install dependencies**

    Navigate into your new site’s directory and install the necessary dependencies.

    ```bash
    cd order-portal-client
    npm install
    ```

4. **Set up environment variables**

    Create a `.env.local` file in the root of your project and add the necessary environment variables:

    ```bash
    NEXT_PUBLIC_WS_URL=<websocket-url>
    NEXT_PUBLIC_API_URL=<api-url>
    ```

    Replace `<websocket-url>` with the URL of your WebSocket server.
    Replace `<api-url>` with the URL of your API server.

5. **Run the development server**

    Start the development server using the following command:

    ```bash
    npm run dev
    ```

    Your site is now running at `http://localhost:3000`!
   
## Getting started

To get started you may need to authenticate with your Google account. 
Once authenticated, you can start creating orders with your preferred ingredients, manage your orders, and track them in real time.
