# -*- mode: python ; coding: utf-8 -*-
#
# PyInstaller-Spec für XJustiz-Tools
# Zielplattform: Windows (folder/onedir mode)
#
# Build-Befehl (im Projektverzeichnis, Windows-Umgebung):
#   pyinstaller xjustiz_tools.spec
#
# LGPL-Compliance (folder mode):
# Der folder mode (onedir, kein onefile) ist für Qt/PySide6 unter LGPL
# erforderlich, weil:
#   1. Qt-Bibliotheken als separate .dll-Dateien im dist-Ordner liegen,
#      sodass Nutzer sie austauschen können (LGPL-Pflicht).
#   2. QtWebEngineProcess.exe als eigenständiger Prozess starten kann
#      (Chromium-Architektur erfordert separaten Prozess).
#   3. Chromium-Ressourcen (icudtl.dat, *.pak, resources/) korrekt
#      gefunden werden.
#
# WICHTIG – Qt.conf (LGPL):
# Die mitgelieferte qt.conf teilt Qt mit wo seine Plugins und Bibliotheken
# liegen. Das ist nötig damit Nutzer Qt-Bibliotheken ersetzen können.

import sys
from pathlib import Path

block_cipher = None

# ---------------------------------------------------------------------------
# Pfade
# ---------------------------------------------------------------------------
PROJECT_DIR = Path(SPECPATH)
ASSETS_DIR  = PROJECT_DIR / "assets"

# ---------------------------------------------------------------------------
# Daten: HTML-Anwendungen als Assets einbinden.
# Tupel-Format: (Quelle, Ziel-Unterordner im Bundle)
# PyInstaller folgt Symlinks automatisch.
# ---------------------------------------------------------------------------
added_datas = [
    # Beide Web-Anwendungen komplett einbinden
    (str(ASSETS_DIR / "Strukturierte_Daten_3_5_1"),
     "assets/Strukturierte_Daten_3_5_1"),
    (str(ASSETS_DIR / "eEB_3_5_1"),
     "assets/eEB_3_5_1"),
    # qt.conf für LGPL-Compliance (Bibliotheken austauschbar halten).
    # Muss neben der EXE liegen, nicht in _internal/.
    # PI 6+ legt Daten mit Ziel "." in _internal/ ab – daher explizit ".."
    # als Ziel, damit qt.conf in dist/XJustiz-Tools/ landet.
    (str(PROJECT_DIR / "qt.conf"), ".."),
]

# ---------------------------------------------------------------------------
# Hidden Imports
# QtWebEngine benötigt einige Module die PyInstaller nicht automatisch findet
# ---------------------------------------------------------------------------
hidden_imports = [
    "PySide6.QtWebEngineCore",
    "PySide6.QtWebEngineWidgets",
    "PySide6.QtWebChannel",
    "PySide6.QtNetwork",
    "PySide6.QtPrintSupport",
]

# ---------------------------------------------------------------------------
# Analysis
# ---------------------------------------------------------------------------
a = Analysis(
    ["main.py"],
    pathex=[str(PROJECT_DIR)],
    binaries=[],
    datas=added_datas,
    hiddenimports=hidden_imports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[
        # Nicht benötigte Qt-Module ausschließen um Bundle-Größe zu reduzieren
        "PySide6.Qt3DAnimation",
        "PySide6.Qt3DCore",
        "PySide6.Qt3DExtras",
        "PySide6.Qt3DInput",
        "PySide6.Qt3DLogic",
        "PySide6.Qt3DRender",
        "PySide6.QtBluetooth",
        "PySide6.QtCharts",
        "PySide6.QtDataVisualization",
        "PySide6.QtLocation",
        "PySide6.QtMultimedia",
        "PySide6.QtMultimediaWidgets",
        "PySide6.QtNfc",
        "PySide6.QtPositioning",
        "PySide6.QtQuick",
        "PySide6.QtQuick3D",
        "PySide6.QtQuickWidgets",
        "PySide6.QtRemoteObjects",
        "PySide6.QtScxml",
        "PySide6.QtSensors",
        "PySide6.QtSerialPort",
        "PySide6.QtSql",
        "PySide6.QtTest",
        "PySide6.QtTextToSpeech",
        "PySide6.QtVirtualKeyboard",
    ],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

# ---------------------------------------------------------------------------
# PYZ – Python-Archiv
# ---------------------------------------------------------------------------
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

# ---------------------------------------------------------------------------
# EXE
# ---------------------------------------------------------------------------
exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,           # folder mode: Binaries separat
    name="XJustiz-Tools",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,                       # UPX deaktiviert: Qt-DLLs vertragen UPX schlecht
    console=False,                   # kein Konsolenfenster
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    # icon="assets/xjustiz.ico",     # optional: Icon-Datei eintragen
)

# ---------------------------------------------------------------------------
# COLLECT – folder mode (LGPL-konform: DLLs als separate Dateien)
# ---------------------------------------------------------------------------
coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=False,
    upx_exclude=[
        "Qt6WebEngineCore.dll",      # niemals UPX auf WebEngine-DLLs
        "Qt6Core.dll",
        "Qt6Gui.dll",
        "Qt6Widgets.dll",
        "vcruntime*.dll",
        "msvcp*.dll",
    ],
    name="XJustiz-Tools",
)
