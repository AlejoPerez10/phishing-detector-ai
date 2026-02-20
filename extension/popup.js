document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const text = document.getElementById("emailText").value;

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (data.prediction === 1) {
        document.getElementById("result").innerText =
            "Most Probably Phishing (Probability: " + data.probability.toFixed(2) + ")";
    } else {
        document.getElementById("result").innerText =
            "Most Probably Safe (Probability: " + data.probability.toFixed(2) + ")";
    }
});