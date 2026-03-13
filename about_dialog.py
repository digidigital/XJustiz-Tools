"""
Über-Dialog mit Copyright-Informationen zu den XJustiz-Browseranwendungen.
"""

from PySide6.QtWidgets import QDialog, QVBoxLayout, QLabel, QPushButton
from PySide6.QtCore import Qt


class AboutDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Über XJustiz-Tools")
        self.setMinimumWidth(480)
        self.setWindowFlags(self.windowFlags() & ~Qt.WindowType.WindowContextHelpButtonHint)

        layout = QVBoxLayout(self)
        layout.setSpacing(12)
        layout.setContentsMargins(20, 20, 20, 20)

        info = QLabel(
            "<h2>XJustiz-Tools</h2>"
            "<p>Inoffizielle PySide6-Integration der offiziellen XJustiz-Browseranwendungen "
            "für den elektronischen Rechtsverkehr (ERV). Download der Originalanwendungen unter:<br>"
            "<a href='https://xjustiz.justiz.de/Tools_Anwendungen/index.php'>https://xjustiz.justiz.de/Tools_Anwendungen/index.php↗</a></p>"
            "<hr>"
            "<h3>ERV Strukturdatensatz erstellen</h3>"
            "<p>Version 5.0.2 &nbsp;|&nbsp; Stand: April 2025<br>"
            "XJustiz-Standard Version 3.5.1<br>"
            "&copy; XJustiz-Pflegestelle,<br>"
            "Bund-Länder-Kommission für Informationstechnik in der Justiz (BLK-IT-Justiz)</p>"
            "<h3>Elektronisches Empfangsbekenntnis (eEB)</h3>"
            "<p>Version 351.1.0<br>"
            "XJustiz-Standard Version 3.5.1 (kompatibel mit 3.4.1)<br>"
            "&copy; XJustiz-Pflegestelle,<br>"
            "Bund-Länder-Kommission für Informationstechnik in der Justiz (BLK-IT-Justiz)</p>"
            "<hr>"
            "<h3>PySide6-Wrapper</h3>"
            "&copy; Björn Seipel - digidigital, <a href='https://www.gnu.org/licenses/gpl-3.0.de.html'>GPLv3↗</a><br>"
            "Quellcode unter: <a href='https://github.com/digidigital/XJustiz-Tools'>github.com↗</a><br> "
            "<p>Dieses Programm verwendet <b>Qt</b> und <b>PySide6</b> unter der<br>"
            "<a href='https://www.gnu.org/licenses/lgpl-3.0.html'>GNU Lesser General "
            "Public License v3 (LGPL)</a>.<br>"
            "Der Quellcode der Qt-Bibliotheken ist unter "
            "<a href='https://www.qt.io/download-open-source'>qt.io↗</a> verfügbar.<br>"
            "PySide6 ist ein offizielles Qt-Produkt der Qt Company.</p><br><br>"
            "Mit einem ↗ gekennzeichnete Links führen in das Internet.",
            wordWrap=True,
        )
        info.setOpenExternalLinks(True)
        info.setTextFormat(Qt.TextFormat.RichText)
        layout.addWidget(info)

        btn = QPushButton("Schließen")
        btn.setDefault(True)
        btn.clicked.connect(self.accept)
        layout.addWidget(btn, alignment=Qt.AlignmentFlag.AlignCenter)
