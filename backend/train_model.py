import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from preprocess import preprocess_text


# ==========================================
# 1. Load Dataset
# ==========================================

data = pd.read_csv("dataset/reviews.csv")

print("Dataset loaded successfully!")
print("Total reviews:", len(data))

print("\nSentiment distribution:")
print(data["sentiment"].value_counts())


# ==========================================
# 2. Preprocess Reviews
# ==========================================

print("\nPreprocessing reviews...")

data["clean_review"] = data["review"].apply(preprocess_text)


# ==========================================
# 3. Separate Input and Output
# ==========================================

X = data["clean_review"]
y = data["sentiment"]


# ==========================================
# 4. Train-Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining reviews:", len(X_train))
print("Testing reviews:", len(X_test))


# ==========================================
# 5. TF-IDF
# ==========================================

print("\nCreating TF-IDF features...")

vectorizer = TfidfVectorizer(
    max_features=10000,
    ngram_range=(1, 2)
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

print("TF-IDF features created!")


# ==========================================
# 6. Train Logistic Regression
# ==========================================

print("\nTraining Logistic Regression model...")

model = LogisticRegression(
    max_iter=1000
)

model.fit(X_train_tfidf, y_train)

print("Model training completed!")


# ==========================================
# 7. Prediction
# ==========================================

predictions = model.predict(X_test_tfidf)


# ==========================================
# 8. Evaluation
# ==========================================

accuracy = accuracy_score(y_test, predictions)

print("\n======================================")
print("MODEL PERFORMANCE")
print("======================================")

print(
    "Accuracy:",
    round(accuracy * 100, 2),
    "%"
)

print("\nClassification Report:")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, predictions))


# ==========================================
# 9. Save Model
# ==========================================

joblib.dump(
    model,
    "models/sentiment_model.pkl"
)

joblib.dump(
    vectorizer,
    "models/tfidf_vectorizer.pkl"
)


print("\n======================================")
print("MODEL SAVED SUCCESSFULLY!")
print("======================================")
print("sentiment_model.pkl")
print("tfidf_vectorizer.pkl")