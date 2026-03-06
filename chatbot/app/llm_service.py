import os
import json
from dotenv import load_dotenv
from google import genai
from app.prompt_template import build_system_prompt
# Load environment variables
load_dotenv()
# Read API key
api_key = os.getenv("GEMINI_API_KEY")
# Initialize Gemini client
client = genai.Client(api_key=api_key)

def generate_chat_response(domain: str, user_message: str, learner_name: str = "Learner"):
   # Build system prompt
   system_prompt = build_system_prompt(domain, learner_name)
   # Combine prompt
   prompt = f"""
{system_prompt}
User Question:
{user_message}
Rules:
Return the answer ONLY as JSON in the following format:
{{
 "answer": "string",
 "confidence": "high | medium | low",
 "related_topics": [],
 "suggested_next_action": ""
}}
Do not include markdown.
Do not include explanation outside JSON.
"""
   try:
       # Call Gemini model
       response = client.models.generate_content(
           model="gemini-2.5-flash",
           contents=prompt,
           config={
               "response_mime_type": "application/json"
           }
       )
       # Convert JSON string → Python dict
       parsed = json.loads(response.text)
       return parsed
   except Exception as e:
       print("Gemini Error:", e)
       return {
           "answer": f"Hi {learner_name}, I'm facing a temporary issue connecting to the AI service.",
           "confidence": "low",
           "related_topics": [],
           "suggested_next_action": "Retry your question."
       }