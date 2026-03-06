from fastapi import FastAPI
from app.llm_service import generate_chat_response
from app.validators import safe_json_parse
from app.models import ChatRequest


app = FastAPI()

@app.post("/chat")
def chat(request: ChatRequest):

    raw_output = generate_chat_response(
        request.domain,
        request.message,
        request.learner_name
    )

    parsed_output = safe_json_parse(raw_output)

    return parsed_output