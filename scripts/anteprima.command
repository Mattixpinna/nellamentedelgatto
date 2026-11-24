#!/bin/bash
# Avvia un server locale per vedere il sito in public/ su http://localhost:8765
# Per fermarlo chiudi questa finestra del Terminale (o premi Ctrl+C).
cd "$(dirname "$0")/../public" || exit 1
echo "Anteprima del sito: http://localhost:8765"
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server 8765 --bind 127.0.0.1
else
  exec ruby -run -e httpd . -p 8765 -b 127.0.0.1
fi
