function getEmailText() {
    const emailBody = document.querySelector("div.a3s"); 
    if (emailBody) {
        return emailBody.innerText;
    }
    return null;
}

async function analyzeEmail(text) {
    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (data.prediction === 1) {
        alert("⚠️ Warning: This email may be phishing. Probability: " + data.probability.toFixed(2));
    }
}

const observer = new MutationObserver(() => {
    const text = getEmailText();
    if (text) {
        analyzeEmail(text);
    }
});

observer.observe(document.body, { childList: true, subtree: true });