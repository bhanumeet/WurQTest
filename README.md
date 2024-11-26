
# React Native User Management Application

This project is a **React Native application** designed to manage user data dynamically. The application consists of three main screens, each offering distinct functionality for interacting with user data fetched from a backend API. The app also features a visually appealing UI and supports dynamic updates to data and charts.

---

## Features

### 1. Home Screen
- Displays a **list of user cards**, one for each user fetched from the API.
- Each card is **color-coded** based on the user's age:
  - **Gray**: Users younger than 30 years.
  - **Red**: Users aged 30–50 years.
  - **Blue**: Users older than 50 years.
- Excludes users with a **negative age**.
- Shows the **total fees paid** by all users at the top of the screen.

### 2. Second Screen
- Features a **real-time timer** that increments every second.
- Fetches and displays **formatted user details** from the API in a scrollable text box.
- **Promise Example**: Creates a promise that resolves after being called three times (every second).
- Provides a visually attractive layout with a clean and modern design.

### 3. Third Screen
- Displays a **dynamic line chart** based on user fee data fetched from the API.
- Includes a form to:
  - Add a new user dynamically (name, age, and fees).
  - Update the chart with new user data upon form submission.
- Features a visually appealing chart built using **react-chartjs-2**.

---

## Technology Stack

### Frontend
- **React Native**: Cross-platform development.
- **Chart.js**: Interactive and customizable data visualization.

### Backend
- Backend API serves user data, including:
  - Name
  - Last Name
  - Age
  - Fees
- Backend endpoint: `http://<your-system-ip>:3000/` or `http://localhost:3000/`.

---

## How to Run the Application

### Prerequisites
- **Node.js** (version 18.18.0 or higher).
- **Expo CLI** (`npm install -g expo-cli`).
- **Backend API** running on `http://<your-system-ip>:3000/` or `http://localhost:3000/`.

### Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/react-native-user-management.git
   cd react-native-user-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   - Ensure the backend API is running.
   - If you are testing on a physical device, replace `localhost` in the API URL with your **system's IP address**. You can find your system IP by running:
     - `ipconfig` (Windows)
     - `ifconfig` (macOS/Linux).

   **Example:**
   - **For your system IP:**
     ```bash
     Backend API: http://<your-system-ip>:3000/
     ```

   - **For localhost:**
     ```bash
     Backend API: http://localhost:3000/
     ```

4. Start the application:
   ```bash
   npm start
   ```
   This will open the Expo Developer Tools in your default browser.

5. Run the app on a device/emulator:
   - **For Android**: Press `a` in the terminal.
   - **For iOS**: Press `i` (requires macOS and Xcode).
   - **For Web**: Press `w`.

---

## API Details

The application fetches user data from the backend API:

- **Endpoint**:  
  `http://<your-system-ip>:3000/` or `http://localhost:3000/`

- **Response Format**:
  ```json
  [
    {
      "id": 1,
      "date": "2023-11-24",
      "location": "GymA",
      "user": {
        "name": "John",
        "lastname": "Doe",
        "age": 25,
        "fee": 5
      }
    },
    ...
  ]
  ```

---

## Code Structure

### Screens

1. **Home Screen:**
   - Displays a list of user cards with age-based color coding.
   - Shows the total fees paid.

2. **Second Screen:**
   - Features a real-time timer with a promise-based interval example.
   - Displays formatted user details in a scrollable text box.

3. **Third Screen:**
   - Includes a form to dynamically add user data.
   - Displays a line chart for user fees using **Chart.js**.

---

### Reusable Components

1. **User Cards:**
   - Color-coded cards based on user age.

2. **Dynamic Chart:**
   - Updates chart data dynamically upon form submission or API fetch.

---

## Features Implemented

### Home Screen:
- Dynamically fetches and displays user data.
- Filters out users with negative ages.
- Displays the total fees paid by all users.

### Second Screen:
- Displays a real-time timer that starts on page load.
- Fetches user data and displays it as formatted text.
- Provides an example of promises resolving after an interval.

### Third Screen:
- Features a dynamic line chart based on user fee data.
- Allows users to add new data through a form.

---

## Styling and Design

1. **Clean, responsive, and modern UI design.**

2. **Timer and Text Box Styling:**
   - Styled for readability with shadows, borders, and subtle colors.

3. **Chart Styling:**
   - Interactive and smooth line charts.

---

## Future Improvements

1. Add state management using **MobX** or **Redux** for scalability.
2. Implement backend validations to ensure consistent and valid user data.
3. Enhance error handling for better user feedback (e.g., network failures).
4. Add pagination or infinite scroll for large datasets.

---

## Important Note on the API Endpoint

- When testing on an emulator or a physical device, always replace `localhost` with your **system's IP address**. For example:
  - Emulator: `http://10.0.2.2:3000/` (for Android Emulator).
  - Device: `http://<your-system-ip>:3000/` (when accessing from another device on the same network).

