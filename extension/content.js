let lastEmailId = null;

function getEmailText() {
    const emailBody = document.querySelector("div.a3s");
    return emailBody ? emailBody.innerText : null;
}

function getCurrentEmailId() {
    const match = window.location.href.match(/#.*\/([^/]+)$/);
    return match ? match[1] : null;
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
        alert(`⚠️ Precaución: Posible Phishing.\n\tRiesgo: ${percentage}%`);
    }
}

const observer = new MutationObserver(() => {
    const emailId = getCurrentEmailId();
    const text = getEmailText();

    if (emailId && text && emailId !== lastEmailId) {
        lastEmailId = emailId;
        analyzeEmail(text);
    }
});

observer.observe(document.body, { childList: true, subtree: true });