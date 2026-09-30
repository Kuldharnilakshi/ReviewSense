import { useState } from "react";

function Home() {

  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  // ================= ANALYZE REVIEW =================

  const analyzeReview = async () => {

    if (!review.trim()) {
      alert("Please enter a review first.");
      return;
    }

    setLoading(true);

    try {

    const response = await fetch(
  `${import.meta.env.https://reviewsense-f9gm.onrender.com}/predict`
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            review: review,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.error ||
          "Something went wrong."
        );

        return;
      }


      // ================= RESULT OBJECT =================

      const analysisResult = {

        id: Date.now(),

        review: data.review,

        sentiment: data.sentiment,

        confidence: data.confidence,

        reason: data.reason,

        scores: data.scores,

        date: new Date().toLocaleString(),

      };


      // Show result

      setResult(analysisResult);


      // ================= SAVE TO HISTORY =================

      const existingHistory =
        JSON.parse(
          localStorage.getItem("reviewHistory")
        ) || [];


      existingHistory.unshift(
        analysisResult
      );


      localStorage.setItem(
        "reviewHistory",
        JSON.stringify(existingHistory)
      );

    }

    catch (error) {

      console.error(error);

      alert(
        "Unable to connect to the backend. Make sure Flask is running."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ================= SENTIMENT ICON =================

  const getSentimentIcon = () => {

    if (!result) {
      return "😊";
    }

    if (result.sentiment === "Positive") {
      return "😊";
    }

    if (result.sentiment === "Negative") {
      return "😞";
    }

    return "😐";

  };


  return (

    <main id="home">

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="badge">
          ✦ AI-Powered Sentiment Analysis
        </div>


        <h1>

          Understand what people

          <br />

          <span>
            really feel.
          </span>

        </h1>


        <p className="subtitle">

          Analyze customer reviews using Natural Language Processing
          and discover whether the sentiment is positive, negative, or neutral.

        </p>


        {/* ================= ANALYZER ================= */}

        <div
          className="analyzer-card"
          id="analyzer"
        >

          <div className="card-header">

            <div>

              <h2>
                Review Analyzer
              </h2>

              <p>
                Enter a customer review below
              </p>

            </div>


            <div className="status">

              <span></span>

              {loading
                ? "Analyzing..."
                : "Ready"}

            </div>

          </div>


          {/* TEXTAREA */}

          <textarea

            value={review}

            onChange={(e) =>
              setReview(e.target.value)
            }

            placeholder="Example: The product quality is amazing and delivery was very fast..."

            maxLength={1000}

          />


          {/* FOOTER */}

          <div className="card-footer">

            <span>
              {review.length}/1000 characters
            </span>


            <button

              onClick={analyzeReview}

              disabled={loading}

            >

              {loading
                ? "⏳ Analyzing..."
                : "✦ Analyze Review"}

            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* ================= ANALYSIS RESULT =============== */}
        {/* ================================================= */}

        {result && (

          <div className="result-card">


            {/* RESULT HEADER */}

            <div className="result-header">

              <h2>
                Analysis Result
              </h2>

              <span className="result-badge">
                AI Analysis
              </span>

            </div>


            {/* SENTIMENT */}

            <div className="sentiment-main">

              <div className="result-icon">

                {getSentimentIcon()}

              </div>


              <p className="result-label">
                Predicted Sentiment
              </p>


              <h1
                className={
                  `sentiment-${result.sentiment.toLowerCase()}`
                }
              >

                {result.sentiment}

              </h1>


              <p className="confidence">

                Confidence:{" "}

                <strong>
                  {result.confidence}%
                </strong>

              </p>

            </div>


            {/* ================= REASON ================= */}

            <div className="reason-section">

              <h3>
                💡 Why this sentiment?
              </h3>


              <p>
                {result.reason}
              </p>

            </div>


            {/* ================= SCORES ================= */}

            <div className="scores-section">

              <h3>
                Sentiment Scores
              </h3>


              {/* POSITIVE */}

              <div className="score-item">

                <div className="score-info">

                  <span>
                    🟢 Positive
                  </span>

                  <strong>
                    {result.scores?.positive || 0}%
                  </strong>

                </div>


                <div className="score-bar">

                  <div

                    className="score-fill positive-fill"

                    style={{
                      width:
                        `${result.scores?.positive || 0}%`,
                    }}

                  ></div>

                </div>

              </div>


              {/* NEUTRAL */}

              <div className="score-item">

                <div className="score-info">

                  <span>
                    🟡 Neutral
                  </span>

                  <strong>
                    {result.scores?.neutral || 0}%
                  </strong>

                </div>


                <div className="score-bar">

                  <div

                    className="score-fill neutral-fill"

                    style={{
                      width:
                        `${result.scores?.neutral || 0}%`,
                    }}

                  ></div>

                </div>

              </div>


              {/* NEGATIVE */}

              <div className="score-item">

                <div className="score-info">

                  <span>
                    🔴 Negative
                  </span>

                  <strong>
                    {result.scores?.negative || 0}%
                  </strong>

                </div>


                <div className="score-bar">

                  <div

                    className="score-fill negative-fill"

                    style={{
                      width:
                        `${result.scores?.negative || 0}%`,
                    }}

                  ></div>

                </div>

              </div>

            </div>

          </div>

        )}

      </section>


      {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="about"
      >


        {/* FEATURE 1 */}

        <div className="feature">

          <div className="feature-icon">
            🧠
          </div>

          <h3>
            NLP Powered
          </h3>

          <p>

            Uses Natural Language Processing to understand
            review text and identify sentiment.

          </p>

        </div>


        {/* FEATURE 2 */}

        <div className="feature">

          <div className="feature-icon">
            ⚡
          </div>

          <h3>
            Instant Analysis
          </h3>

          <p>

            Get sentiment predictions within seconds
            using our NLP processing pipeline.

          </p>

        </div>


        {/* FEATURE 3 */}

        <div className="feature">

          <div className="feature-icon">
            📊
          </div>

          <h3>
            Clear Insights
          </h3>

          <p>

            Understand customer sentiment through
            simple and visual results.

          </p>

        </div>

      </section>

    </main>

  );
}

export default Home;
