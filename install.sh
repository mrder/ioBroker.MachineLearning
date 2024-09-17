#!/bin/bash
# Installationsskript für brain.js

# Repository-URL
REPO_URL="https://github.com/BrainJS/brain.js.git"

# Zielverzeichnis für brain.js
TARGET_DIR="./node_modules/brain.js"

# Klonen des Repositories
if [ ! -d "$TARGET_DIR" ]; then
  echo "Klonen von brain.js aus GitHub..."
  git clone "$REPO_URL" "$TARGET_DIR"
else
  echo "brain.js ist bereits geklont."
fi

# Wechseln in das Verzeichnis
cd "$TARGET_DIR"

# Installieren der Abhängigkeiten
echo "Installieren von Abhängigkeiten für brain.js..."
npm install

# Erstellen der Build-Dateien
echo "Kompilieren von brain.js..."
npm run build

echo "brain.js Installation abgeschlossen."
