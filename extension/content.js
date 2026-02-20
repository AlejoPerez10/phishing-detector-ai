let lastEmailText = null;

function getEmailText() {
    const emailBody = document.querySelector("div.a3s");
    return emailBody ? emailBody.innerText : null;
}

async function analyzeEmail(text) {
    const response = await fetch("https://phishing-detector-ai-qjz7.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    if (data.prediction === 1) {
        const percentage = (data.probability * 100).toFixed(2);
        alert(`⚠️ Warning: Possible phishing.\nRisk: ${percentage}%`);
    }
}

const observer = new MutationObserver(() => {
    const text = getEmailText();

    if (text && text !== lastEmailText) {
        lastEmailText = text;
        analyzeEmail(text);
    }
});

observer.observe(document.body, { childList: true, subtree: true });