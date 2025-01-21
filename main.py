from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    id: Optional[int] = None
    content: str
    sender: str

messages: List[Message] = []
m_id_counter = 1

@app.get("/")
def root():
    data = {"message": "Hello World"}
    return JSONResponse(content=data)

@app.get("/api/messages")
def get_messages():
    print("fetched msgs", messages)
    return messages

@app.post("/api/messages", response_model=List[Message])
def send_message(message: Message):
    global m_id_counter
    print("this is the content", message)
    new_message = Message(id=m_id_counter, content=message.content, sender="user")
    messages.append(new_message)
    m_id_counter += 1
    print(type(messages))
    chatbot_message = get_chatbot_message(new_message.content)
    print(type(chatbot_message), type(new_message))
    return [new_message, chatbot_message]

@app.delete("/api/messages/{m_id}")
def delete_message(m_id: int):
    for m in messages:
        if m.id == m_id and m.sender == "user":
            messages.remove(m)
    data = {"message": "Successfully deleted message"}
    return JSONResponse(content=data)

@app.put("/api/messages/{m_id}")
def edit_message(m_id: int, message: Message):
    print(m_id, message)
    for m in messages:
        if m.id == m_id and m.sender == "user":
            m.content = message.content
        return {"message": "Edited message"}
    return JSONResponse({"message": "Message not found"}, status_code=404)

def get_chatbot_message(user_message: str):
    global m_id_counter
    chatbot_message = Message(id=m_id_counter, content=user_message, sender="chatbot")
    messages.append(chatbot_message)
    m_id_counter += 1
    return chatbot_message

if __name__ == '__main__':
    app.run(debug=True)