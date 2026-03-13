"""
Hauptfenster der XJustiz-Tools-Anwendung.

Enthält:
- QTabWidget mit je einem Tab pro Browseranwendung.
- Menüleiste mit direktem "Über"-Eintrag (kein Untermenü).
- Asset-Pfad-Ermittlung: funktioniert sowohl im Entwicklungsmodus
  (relatives Verzeichnis) als auch im PyInstaller-Bundle (_MEIPASS).
"""

import sys
from pathlib import Path

from PySide6.QtGui import QAction
from PySide6.QtWidgets import QMainWindow, QTabWidget

from about_dialog import AboutDialog
from webengine_profile import create_eeb_profile, create_erv_profile
from webview_tab import WebTab


def _assets_base() -> Path:
    """
    Gibt den Basispfad der Assets zurück.

    PyInstaller-Verhalten je nach Version:
    - bis PI 5.x:  sys._MEIPASS == dist/XJustiz-Tools/          (EXE-Verzeichnis)
    - ab  PI 6.0:  sys._MEIPASS == dist/XJustiz-Tools/_internal/ (neues Unterverz.)

    In beiden Fällen legt die .spec-Datei die Assets relativ zu _MEIPASS ab
    (Ziel: "assets/..."), sodass Path(sys._MEIPASS) / "assets" immer stimmt.
    Im Entwicklungsmodus liegt assets/ neben dieser Datei.
    """
    if hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS) / "assets"
    return Path(__file__).parent / "assets"


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("XJustiz-Tools für XJustiz 3.5.1")
        self.showMaximized()

        base = _assets_base()

        # Getrennte Profile – isolierter localStorage pro Anwendung.
        erv_profile = create_erv_profile()
        eeb_profile = create_eeb_profile()

        # Tabs
        tabs = QTabWidget()

        erv_html = base / "Strukturierte_Daten_3_5_1" / "ERV Strukturdatensatz erstellen.html"
        tabs.addTab(
            WebTab(erv_html, erv_profile),
            "ERV Strukturdatensatz",
        )

        eeb_html = base / "eEB_3_5_1" / "start_eeb.html"
        tabs.addTab(
            WebTab(eeb_html, eeb_profile),
            "Elektr. Empfangsbekenntnis (eEB)",
        )

        self.setCentralWidget(tabs)

        # Menüleiste: "Über" direkt als Top-Level-Aktion (kein Untermenü)
        menu_bar = self.menuBar()
        about_action = QAction("Über", self)
        about_action.setStatusTip("Copyright und Lizenzinformationen anzeigen")
        about_action.triggered.connect(self._show_about)
        menu_bar.addAction(about_action)

    def _show_about(self) -> None:
        AboutDialog(self).exec()
