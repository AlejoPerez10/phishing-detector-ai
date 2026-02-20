from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Cargar modelo y vectorizador
model = joblib.load("../models/model_phishing.pkl")
vectorizer = joblib.load("../models/vectorizer.pkl")

app = FastAPI()

class EmailRequest(BaseModel):
    message: str

@app.post("/predict")
def predict_email(request: EmailRequest):
    text_vectorized = vectorizer.transform([request.message])
    prediction = int(model.predict(text_vectorized)[0])
    probability = float(model.predict_proba(text_vectorized)[0][1])

    return {
        "prediction": prediction,
        "probability": probability
    }