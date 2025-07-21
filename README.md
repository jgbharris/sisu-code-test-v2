SISU code test

## Demo

Video of whole flow
https://github.com/user-attachments/assets/0c58990b-3f5a-4550-8e73-dc93a23f6a93

Video of flow with question answers being changed - logging in console
https://github.com/user-attachments/assets/3b114f84-779a-43b8-a78c-517707c35653



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


