from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm_service import generate_chat_response
from validators import safe_json_parse
from models import ChatRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
def chat(request: ChatRequest):

    raw_output = generate_chat_response(
        request.domain,
        request.message
    )

    parsed_output = safe_json_parse(raw_output)

    return parsed_output