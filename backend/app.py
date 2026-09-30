from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

from preprocess import preprocess_text

app = Flask(__name__)
CORS(app)

# Load trained model and vectorizer
model = joblib.load("models/sentiment_model.pkl")
vectorizer = joblib.load("models/tfidf_vectorizer.pkl")


def generate_reason(review, sentiment):
    """
    Generate a simple human-readable explanation
    based on words found in the review.
    """

    positive_words = [
        "love", "loved", "amazing", "excellent", "great",
        "good", "fantastic", "wonderful", "happy", "satisfied",
        "perfect", "recommend", "best", "impressed", "enjoyed"
    ]

    negative_words = [
        "hate", "hated", "terrible", "horrible", "bad",
        "poor", "disappointed", "disappointing", "worst",
        "useless", "regret", "slow", "broken", "waste",
        "unhappy", "problem", "problems"
    ]

    neutral_words = [
        "okay", "average", "normal", "acceptable",
        "decent", "ordinary", "mixed", "fine"
    ]

    words = re.findall(r"\b[a-zA-Z]+\b", review.lower())

    found_positive = [word for word in words if word in positive_words]
    found_negative = [word for word in words if word in negative_words]
    found_neutral = [word for word in words if word in neutral_words]

    if sentiment == "Positive":

        if found_positive:
            keywords = ", ".join(found_positive[:4])

            return (
                f"The review expresses a positive opinion. "
                f"It contains positive expressions such as "
                f"{keywords}, indicating satisfaction with the product or service."
            )

        return (
            "The review has been classified as positive based on "
            "the overall language and patterns learned by the sentiment model."
        )

    elif sentiment == "Negative":

        if found_negative:
            keywords = ", ".join(found_negative[:4])

            return (
                f"The review expresses a negative opinion. "
                f"It contains negative expressions such as "
                f"{keywords}, indicating dissatisfaction with the product or service."
            )

        return (
            "The review has been classified as negative based on "
            "the overall language and patterns learned by the sentiment model."
        )

    else:

        if found_neutral:
            keywords = ", ".join(found_neutral[:4])

            return (
                f"The review appears neutral or mixed. "
                f"It contains expressions such as {keywords}, "
                f"suggesting an average or balanced opinion."
            )

        return (
            "The review has been classified as neutral because "
            "it does not strongly express either positive or negative sentiment."
        )


@app.route("/")
def home():
    return jsonify({
        "message": "ReviewSense Backend API is running!"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        review = data.get("review", "")

        if not review.strip():
            return jsonify({
                "error": "Review cannot be empty"
            }), 400

        # -----------------------------
        # Preprocess review
        # -----------------------------

        cleaned_review = preprocess_text(review)

        # -----------------------------
        # TF-IDF transformation
        # -----------------------------

        review_vector = vectorizer.transform(
            [cleaned_review]
        )

        # -----------------------------
        # Prediction
        # -----------------------------

        prediction = model.predict(
            review_vector
        )[0]

        # -----------------------------
        # Probability of each sentiment
        # -----------------------------

        probabilities = model.predict_proba(
            review_vector
        )[0]

        classes = model.classes_

        scores = {}

        for sentiment, probability in zip(
            classes,
            probabilities
        ):
            scores[sentiment.lower()] = round(
                probability * 100,
                2
            )

        # Make sure all three values exist
        positive_score = scores.get(
            "positive",
            0
        )

        neutral_score = scores.get(
            "neutral",
            0
        )

        negative_score = scores.get(
            "negative",
            0
        )

        # -----------------------------
        # Confidence
        # -----------------------------

        confidence = max(probabilities) * 100

        # -----------------------------
        # Reason
        # -----------------------------

        reason = generate_reason(
            review,
            prediction
        )

        # -----------------------------
        # Final response
        # -----------------------------

        return jsonify({

            "review": review,

            "sentiment": prediction,

            "confidence": round(
                confidence,
                2
            ),

            "reason": reason,

            "scores": {

                "positive": positive_score,

                "neutral": neutral_score,

                "negative": negative_score
            }

        })

    except Exception as e:

        print("Error:", e)

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )