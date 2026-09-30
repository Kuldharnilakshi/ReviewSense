import { useEffect, useState } from "react";

function Dashboard() {

  const [history, setHistory] = useState([]);


  // ================= LOAD HISTORY =================

  useEffect(() => {

    const savedHistory =
      JSON.parse(
        localStorage.getItem("reviewHistory")
      ) || [];

    setHistory(savedHistory);

  }, []);


  // ================= STATISTICS =================

  const total = history.length;


  const positive =
    history.filter(
      (item) =>
        item.sentiment === "Positive"
    ).length;


  const neutral =
    history.filter(
      (item) =>
        item.sentiment === "Neutral"
    ).length;


  const negative =
    history.filter(
      (item) =>
        item.sentiment === "Negative"
    ).length;


  // ================= AVERAGE CONFIDENCE =================

  const averageConfidence =
    total === 0
      ? 0
      : (
          history.reduce(
            (sum, item) =>
              sum +
              Number(
                item.confidence || 0
              ),
            0
          ) / total
        ).toFixed(2);


  // ================= PERCENTAGE =================

  const percentage = (value) => {

    if (total === 0) {
      return 0;
    }


    return (
      (value / total) * 100
    ).toFixed(1);

  };


  return (

    <main className="page">

      {/* ================= PAGE HEADER ================= */}

      <div className="page-title">

        <div className="badge">
          ✦ INSIGHTS
        </div>


        <h1>
          Sentiment Dashboard
        </h1>


        <p>
          Understand your review analysis
          through meaningful statistics.
        </p>

      </div>


      {/* ================================================= */}
      {/* ================= STAT CARDS ==================== */}
      {/* ================================================= */}

      <div className="stats-grid">


        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>


          <span>
            Total Reviews
          </span>


          <h2>
            {total}
          </h2>

        </div>


        {/* POSITIVE */}

        <div className="stat-card">

          <div className="stat-icon">
            😊
          </div>


          <span>
            Positive Reviews
          </span>


          <h2 className="sentiment-positive">

            {positive}

          </h2>


          <small>
            {percentage(positive)}%
          </small>

        </div>


        {/* NEUTRAL */}

        <div className="stat-card">

          <div className="stat-icon">
            😐
          </div>


          <span>
            Neutral Reviews
          </span>


          <h2 className="sentiment-neutral">

            {neutral}

          </h2>


          <small>
            {percentage(neutral)}%
          </small>

        </div>


        {/* NEGATIVE */}

        <div className="stat-card">

          <div className="stat-icon">
            😞
          </div>


          <span>
            Negative Reviews
          </span>


          <h2 className="sentiment-negative">

            {negative}

          </h2>


          <small>
            {percentage(negative)}%
          </small>

        </div>

      </div>


      {/* ================================================= */}
      {/* ============ SENTIMENT DISTRIBUTION ============= */}
      {/* ================================================= */}

      <div className="dashboard-section">

        <h2>
          Sentiment Distribution
        </h2>


        <p className="section-description">

          Distribution of sentiments across
          all analyzed reviews.

        </p>


        {/* DISTRIBUTION BAR */}

        <div className="dashboard-bar">


          <div
            className="dashboard-positive"
            style={{
              width:
                `${percentage(positive)}%`
            }}
          ></div>


          <div
            className="dashboard-neutral"
            style={{
              width:
                `${percentage(neutral)}%`
            }}
          ></div>


          <div
            className="dashboard-negative"
            style={{
              width:
                `${percentage(negative)}%`
            }}
          ></div>

        </div>


        {/* LEGEND */}

        <div className="legend">

          <span>

            🟢 Positive

            <strong>
              {percentage(positive)}%
            </strong>

          </span>


          <span>

            🟡 Neutral

            <strong>
              {percentage(neutral)}%
            </strong>

          </span>


          <span>

            🔴 Negative

            <strong>
              {percentage(negative)}%
            </strong>

          </span>

        </div>

      </div>


      {/* ================================================= */}
      {/* ============ AVERAGE CONFIDENCE ================= */}
      {/* ================================================= */}

      <div className="dashboard-section">

        <h2>
          Average Model Confidence
        </h2>


        <div className="confidence-big">

          {averageConfidence}%

        </div>


        <p className="section-description">

          Average prediction confidence across
          all analyzed reviews.

        </p>

      </div>


      {/* ================================================= */}
      {/* ================= SUMMARY ======================= */}
      {/* ================================================= */}

      <div className="dashboard-section">

        <h2>
          Analysis Summary
        </h2>


        {total === 0 ? (

          <p className="section-description">

            Analyze some reviews to generate
            dashboard insights.

          </p>

        ) : (

          <div className="summary-grid">


            <div>

              <strong>
                {positive}
              </strong>

              <span>
                Positive
              </span>

            </div>


            <div>

              <strong>
                {neutral}
              </strong>

              <span>
                Neutral
              </span>

            </div>


            <div>

              <strong>
                {negative}
              </strong>

              <span>
                Negative
              </span>

            </div>


          </div>

        )}

      </div>

    </main>

  );
}

export default Dashboard;