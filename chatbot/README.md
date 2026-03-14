## ⚙️ Setup Instructions

### Clone Repository
```
git clone https://github.com/YOUR_USERNAME/ai-learning-mentor.git

cd ai-learning-mentor
```

### Create Virtual Environment
```
python -m venv venv
```
### Activate virtual environment
```
venv\Scripts\activate
```
### Upgarde pip
```
python -m pip install --upgrade pip
```
### Install requirements
```
pip install -r requirements.txt
```
### Start FAstAPI
```
uvicorn app.main:app --reload
```
### Navigate to this page and check
```
http://127.0.0.1:8000/docs
```
---


---

## 🎯 API Endpoint

### POST `/chat`

Request body:

```json
{
  "domain": "GenAI",
  "message": "Explain transformers",
  "learner_name": "Om"
}
```
Response format:
```
{
  "answer": "...",
  "confidence": "high",
  "related_topics": [],
  "suggested_next_action": ""
}
```


# 🚀 After Creating README

Run:
```
git add README.md
git commit -m "docs: add project README with setup instructions"
```

Then push:
```
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-learning-mentor.git
git push -u origin main
```
---



