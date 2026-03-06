import json

def safe_json_parse(output: str):
    try:
        return json.loads(output)
    except Exception:
        return {
            "answer": output,
            
        }