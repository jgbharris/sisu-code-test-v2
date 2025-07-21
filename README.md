#SISU code test

## Demo

- **[Video: Full User Flow](https://github.com/user-attachments/assets/45fa3834-d743-47a7-93f3-6c2dc3570a7d)**
https://github.com/user-attachments/assets/45fa3834-d743-47a7-93f3-6c2dc3570a7d

- **[Video: Back Functionality & Answer Pruning](https://github.com/user-attachments/assets/59c6c6b2-a581-4d99-b9e7-6b7bfd7a7112)**  
https://github.com/user-attachments/assets/59c6c6b2-a581-4d99-b9e7-6b7bfd7a7112

---

## Tech Stack

- **Framework:** Next.js
- **State Management:** React Context API
- **Styling:** CSS Modules

---

## Getting Started

For the BloodPressure simulator, the port will need to be changed to 8080.

To run this project locally:

1. **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3. **Start the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Approach

The survey json was edited to get the labels and values correct.
This is being imported from an adjacent file.

### Survey

- **Single-route multi-step form:**  
  All survey questions handled in one route, with navigation logic for forward/back.
- **Conditional questions:**  
  Follow-up questions appear only if their preconditions are met.
- **Answer pruning:**  
  If a user navigates back and changes an answer, dependent answers are automatically updated/removed.

### Blood Pressure

- **Streaming via EventSource:**  
  Switched from Axios to EventSource for real-time blood pressure data.
- **User feedback:**  
  Progress bar indicates initialization; animated heart rate loader displays during reading.

### Results

- **Combined summary:**  
  Survey answers and blood pressure readings are stored in React Context and displayed together on a results page.


