
# 🧠 AI-Assisted Text Classification API

## 📌 Overview
This project is a backend service that classifies input text into predefined categories — **Complaint**, **Query**, **Feedback**, or **Other** — using an AI model (Google Gemini).  
The service exposes a REST API endpoint that accepts text input and returns the classified category along with a confidence score.

---

## 🚀 Features
- REST API with a single POST endpoint
- Text classification using **Google Gemini AI**
- Returns category and confidence score
- Manual confidence mapping (as allowed by the assignment)
- Basic error handling
- Postman collection included for testing

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **Google Gemini API**
- **Postman**

---

## 📂 Project Structure
```
ai-text-classifier/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   └── classify.routes.js
│   ├── controllers/
│   │   └── classifyController.js
│   └── services/
│       └── aiService.js
├── AI_Text_Classification_API.postman_collection.json
├── package.json
├── .gitignore
└── README.md

```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <your-github-repo-url>
cd ai-text-classifier
```

---

### 2️⃣ Install Dependencies
```bash
npm install


```

---

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Do not commit `.env` to GitHub.

---

### 4️⃣ Start the Server
```bash
node src/server.js
      OR
npm run dev
```

Server will start on:
```
http://localhost:3000
```

---

## 🔗 API Endpoint

### **POST** `/api/classify`

#### Request Body
```json
{
  "text": "How can I reset my password?"
}
```

#### Response
```json
{
  "category": "Query",
  "confidence": 0.85
}
```

---

## 🧠 How AI Is Used
The application uses **Google Gemini** to analyze the semantic meaning of the input text and determine the most appropriate category.

Since the AI model does not return a confidence score, a **predefined confidence mapping** is applied based on the classification result, as permitted by the assignment.

To ensure reliable API behavior, lightweight fallback logic is used when AI responses are ambiguous.

---

## 📊 Confidence Mapping
| Category   | Confidence |
|-----------|------------|
| Complaint | 0.90 |
| Query     | 0.85 |
| Feedback  | 0.80 |
| Other     | 0.60 |

---

## 🧪 Testing with Postman
A Postman collection is included for easy testing.

### Steps:
1. Open Postman
2. Click **Import**
3. Import `AI_Text_Classification_API.postman_collection.json`
4. Start the backend server
5. Send requests to `/api/classify`

---

## 🧪 Sample Test Inputs
- **Complaint:** “My order arrived damaged”
- **Query:** “How can I reset my password?”
- **Feedback:** “Your app UI is really good”
- **Other:** “Hello”

---

## ⚠️ Error Handling
- Returns `400` if text is missing
- Returns default category `Other` if AI response is invalid
- Handles API failures gracefully

---

## 📌 Assignment Compliance
✔ REST API with POST endpoint  
✔ AI-based text classification  
✔ Category + confidence returned  
✔ Manual confidence mapping used  
✔ Clean backend structure  
✔ Postman collection included  

---

## 👤 Author
**Tanu Priya**  
Final Year B.Tech (IT)

---

## ✅ Final Note
This project demonstrates practical AI integration in a backend service while maintaining reliability, clarity, and clean architecture.
