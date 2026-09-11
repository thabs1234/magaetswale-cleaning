# 📦 Best ChatGPT Desktop Bridge Configuration

**Repository:** `thabs1234/chatgpt-bridge-config`  
**Purpose:** Connect ChatGPT Desktop to 9router/Hermes proxy for free AI models

## 🔧 Configuration Files

### hub.json (Core Settings)
```json
{
  "provider": "openai_compatible",
  "baseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-66744af0d443ba1c-92ki5m-20dbc012",
  "defaultModel": "myCombo",
  "modelMapping": {
    "gpt-4": "myCombo",
    "gpt-3.5-turbo": "gc/gemini-3.1-flash-lite-preview",
    "auto": "myCombo"
  },
  "bridgeEnabled": true
}
```

### bridge-router.yaml (Model Routing)
```yaml
version: "1.0"
bidirectional: true
auto_fallback: true
routes:
  - model: myCombo
    provider: openai
    endpoint: http://localhost:20128/v1
    fallback: true
```

## 🚀 Installation

```bash
# Clone
git clone https://github.com/thabs1234/chatgpt-bridge-config.git
cd chatgpt-bridge-config

# Copy config
cp hub.json ~/.config/ChatGPT-Desktop/hub.json  # Linux/macOS
# OR
copy hub.json "%APPDATA%\ChatGPT-Desktop\hub.json"  # Windows
```

## 📋 Usage

1. Start 9router: `9router start`
2. Copy `hub.json` to ChatGPT Desktop config
3. Restart ChatGPT Desktop
4. Enjoy free AI access via `myCombo` model

## ✅ Features

- ✅ 658 free models available
- ✅ Auto model selection (myCombo)
- ✅ Bidirectional routing
- ✅ Auto-healing bridge scripts
- ✅ Self-healing Python scripts included

## 🛠️ Troubleshooting

```bash
# Verify 9router
curl http://localhost:20128/v1/models

# Test connection
python test_bridge.py
```

## 📄 Files in Repo

- `hub.json` - Main ChatGPT Desktop configuration
- `bridge-router.yaml` - Model routing rules
- `test_bridge.py` - Connection verification script
- `README.md` - This documentation