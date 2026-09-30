import { useEffect, useState } from "react";

function History() {

  const [history, setHistory] = useState([]);


  // ================= LOAD HISTORY =================

  useEffect(() => {

    const savedHistory =
      JSON.parse(
        localStorage.getItem("reviewHistory")
      ) || [];

    setHistory(savedHistory);

  }, []);


  // ================= CLEAR ALL =================

  const clearHistory = () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to clear all analysis history?"
      );


    if (!confirmDelete) {
      return;
    }


    localStorage.removeItem(
      "reviewHistory"
    );


    setHistory([]);

  };


  // ================= DELETE ONE =================

  const deleteItem = (id) => {

    const updatedHistory =
      history.filter(
        (item) => item.id !== id
      );


    setHistory(updatedHistory);


    localStorage.setItem(
      "reviewHistory",
      JSON.stringify(updatedHistory)
    );

  };


  // ================= SENTIMENT ICON =================

  const getIcon = (sentiment) => {

    if (sentiment === "Positive") {
      return "😊";
    }

    if (sentiment === "Negative") {
      return "😞";
    }

    return "😐";

  };


  return (

    <main className="page">

      {/* ================= PAGE HEADER ================= */}

      <div className="page-title">

        <div className="badge">
          ✦ YOUR ACTIVITY
        </div>


        <h1>
          Analysis History
        </h1>


        <p>
          View all your previously analyzed reviews.
        </p>

      </div>


      {/* ================= EMPTY STATE ================= */}

      {history.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📭
          </div>


          <h2>
            No analysis yet
          </h2>


          <p>
            Go to Home and analyze your first
            review to see it here.
          </p>

        </div>

      ) : (

        <>

          {/* ================= HISTORY HEADER ================= */}

          <div className="history-top">

            <h2>

              {history.length}

              {" "}

              {history.length === 1
                ? "Review"
                : "Reviews"}

              {" "}
              Analyzed

            </h2>


            <button
              className="clear-button"
              onClick={clearHistory}
            >

              🗑 Clear History

            </button>

          </div>


          {/* ================= HISTORY LIST ================= */}

          <div className="history-list">

            {history.map((item) => (

              <div
                className="history-card"
                key={item.id}
              >


                {/* CARD TOP */}

                <div className="history-card-top">


                  <div className="history-sentiment">

                    <span className="history-icon">

                      {getIcon(
                        item.sentiment
                      )}

                    </span>


                    <span
                      className={
                        `sentiment-${item.sentiment.toLowerCase()}`
                      }
                    >

                      {item.sentiment}

                    </span>

                  </div>


                  <div className="history-confidence">

                    Confidence:

                    {" "}

                    <strong>
                      {item.confidence}%
                    </strong>

                  </div>

                </div>


                {/* REVIEW */}

                <p className="history-review">

                  "{item.review}"

                </p>


                {/* REASON */}

                <div className="history-reason">

                  <strong>
                    💡 Reason:
                  </strong>


                  <p>
                    {item.reason}
                  </p>

                </div>


                {/* SCORES */}

                <div className="history-scores">

                  <span>
                    🟢 Positive:{" "}
                    {item.scores?.positive || 0}%
                  </span>


                  <span>
                    🟡 Neutral:{" "}
                    {item.scores?.neutral || 0}%
                  </span>


                  <span>
                    🔴 Negative:{" "}
                    {item.scores?.negative || 0}%
                  </span>

                </div>


                {/* BOTTOM */}

                <div className="history-bottom">

                  <small>
                    {item.date}
                  </small>


                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteItem(item.id)
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </main>

  );
}

export default History;