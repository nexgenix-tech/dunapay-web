# dunaPay Traffic Fine Payment Platform - Frontend

This repository contains the frontend application for the dunaPay traffic fine payment platform. It is built using Next.js and serves as the user interface for motorists to interact with the system.



## Data Handling

**Important Note:** This is purely the frontend application. All sensitive data, including traffic fine information and user authentication details, are handled by a separate backend API. 

For development and demonstration purposes, data is currently simulated using `lib/dummy-data.ts`. This means that any fine searches or user logins will only work with the predefined dummy data. Actual API URLs will be integrated once the backend development is complete.



## Authentication

Similar to data handling, user authentication is managed by the backend. If you attempt to log in with credentials not defined in `lib/dummy-data.ts`, the login will fail. This will be replaced with actual API authentication once the backend is ready.



## Project Functionality

Motorists can:

*   **Search for Traffic Fines:** Enter details to search for outstanding traffic fines. If a fine was issued by a supported municipality, it will be displayed.
*   **Pay Fines:** Click to pay displayed fines, redirecting to PayFast for secure payment processing.
*   **Register an Account:** Create an account for a personalized dashboard experience, allowing them to view their fine history and manage their details.



## Attribution

**Owner:** dunaPay (Contractor)

**Authors:** NexGenix Technologies

For any inquiries, please contact:
*   Phone: 0715867165
*   Email: valiant@nexgx.co.za or refiloevaliant@gmail.com




---

### A little joke for your day:

Why did the traffic light turn red? Because it saw the car coming and didn't want to be embarrassed!



## Technical Details

### State Management
This project utilizes `AppContext` for global state management, providing a centralized way to manage and access application-wide data.

### API Integration
All interactions with the backend RESTful API are centralized within `lib/api.ts`. This file will contain the necessary functions to consume the backend endpoints once they are available. For now, data is mocked using `lib/dummy-data.ts`.

### Installation and Running

To set up and run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

    You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

4.  **Build for production:**
    ```bash
    npm run build
    # or yarn build
    ```

5.  **Start the production server:**
    ```bash
    npm start
    # or yarn start
    ```


