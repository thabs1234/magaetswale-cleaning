#!/usr/bin/env python3
"""Test ChatGPT Desktop bridge connection to 9router."""

import urllib.request
import json

ROUTER_URL = "http://localhost:20128/v1"
API_KEY = "sk-66744af0d443ba1c-92ki5m-20dbc012"

print("Testing bridge connection...")

# Test models endpoint
req = urllib.request.Request(f"{ROUTER_URL}/models", headers={'Authorization': f'Bearer {API_KEY}'})
resp = urllib.request.urlopen(req, timeout=5)
models = json.loads(resp.read().decode())
print(f"✅ Models available: {len(models.get('data', []))}")

# Test chat
data = json.dumps({
    "model": "myCombo",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 20,
    "stream": False
}).encode()

req = urllib.request.Request(
    f"{ROUTER_URL}/chat/completions",
    data=data,
    headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'},
    method='POST'
)
resp = urllib.request.urlopen(req, timeout=30)
result = json.loads(resp.read().decode())
print(f"✅ Chat works: {result['choices'][0]['message']['content'][:30]}")