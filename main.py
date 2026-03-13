"""
XJustiz-Tools – Einstiegspunkt.

Startet die PySide6-Anwendung mit den eingebetteten XJustiz-Browseranwendungen.

Hinweis zu QWebEngine:
QWebEngineProfile muss vor der Erstellung der QApplication initialisiert
werden, wenn benutzerdefinierte Chromium-Kommandozeilenargumente gesetzt
werden. Hier sind keine zusätzlichen Flags nötig, da alle Einstellungen
über QWebEngineSettings vorgenommen werden.
"""

import sys

from PySide6.QtCore import Qt
from PySide6.QtWidgets import QApplication

from mainwindow import MainWindow


def main() -> int:
    # High-DPI-Skalierung (Standard ab Qt6, hier explizit für Klarheit)
    QApplication.setHighDpiScaleFactorRoundingPolicy(
        Qt.HighDpiScaleFactorRoundingPolicy.PassThrough
    )

    app = QApplication(sys.argv)
    app.setApplicationName("XJustiz-Tools für Xjustiz 3.5.1")
    app.setApplicationVersion("1.0.0")

    window = MainWindow()  # showMaximized() wird im Konstruktor aufgerufen

    return app.exec()


if __name__ == "__main__":
    sys.exit(main())
