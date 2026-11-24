#!/bin/bash
# Avvia l'anteprima del sito su http://localhost:8765
# Per fermarla chiudi questa finestra del Terminale (o premi Ctrl+C).
exec python3 "$(dirname "$0")/anteprima.py"
