import os
from groq import Groq
from dotenv import load_dotenv
from domain_config import DOMAIN_CONFIG
from prompt_template import build_system_prompt

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_chat_response(domain: str, user_message: str):

    if domain not in DOMAIN_CONFIG:
        return {
            "answer": "Invalid domain selected.",
            "confidence": "low",
            "related_topics": [],
            "suggested_next_action": ""
        }

    description = DOMAIN_CONFIG[domain]["description"]

    system_prompt = build_system_prompt(domain, description)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.3,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    )

    return response.choices[0].message.content