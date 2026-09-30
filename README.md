# ReviewSense – AI-Powered Review Sentiment Analyzer

ReviewSense is a web-based sentiment analysis application that uses Natural Language Processing (NLP) and Machine Learning to analyze customer reviews and classify them as **Positive, Neutral, or Negative**.

The application provides sentiment confidence scores, sentiment probability distribution, analysis reasons, and a history/dashboard to help users understand previously analyzed reviews.

---

## 🚀 Features

- 🧠 NLP-based sentiment analysis
- 🤖 Machine Learning classification using Logistic Regression
- 📊 TF-IDF feature extraction
- 😊 Positive, 😐 Neutral, and 😞 Negative sentiment classification
- 📈 Confidence score and sentiment probability scores
- 💡 Explanation of detected sentiment
- 📋 Analysis history using browser localStorage
- 📊 Sentiment dashboard with statistics
- 🌙 Dark and ☀️ Light mode
- ⚡ Fast and simple React interface
- 🔗 React frontend with Flask REST API backend

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- React Router
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### Machine Learning & NLP
- Scikit-learn
- NLTK
- TF-IDF Vectorization
- Logistic Regression
- Joblib

### Data Processing
- Pandas
- NumPy

---

## 🏗️ Project Architecture

```text
ReviewSense
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── History.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── backend/
    ├── dataset/
    │   └── reviews.csv
    ├── models/
    │   ├── sentiment_model.pkl
    │   └── tfidf_vectorizer.pkl
    ├── app.py
    ├── preprocess.py
    ├── train_model.py
    ├── generate_dataset.py
    └── requirements.txt
