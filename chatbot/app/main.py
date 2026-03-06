from fastapi import FastAPI
from app.llm_service import generate_chat_response
from app.models import ChatRequest


app = FastAPI()

@app.post("/chat")
def chat(request: ChatRequest):

    raw_output = generate_chat_response(
        request.domain,
        request.message,
        request.learner_name
    )

    return raw_output