from pydantic import BaseModel

class ChatRequest(BaseModel):
    domain: str
    message: str
    learner_name: str 