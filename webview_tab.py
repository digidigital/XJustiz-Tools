"""
Wiederverwendbarer Tab, der eine lokale HTML-Anwendung in einem
QWebEngineView anzeigt.

Besonderheiten:
- Lädt HTML aus dem assets/-Unterverzeichnis (eingebettet in die Dist).
- Download-Handler für FileSaver.js (ERV-App erzeugt xjustiz_nachricht.xml).
  Der Dateiname muss laut Leitfaden exakt "xjustiz_nachricht.xml" bleiben;
  der Speicherdialog zeigt ihn als Vorschlag an.
- Jeder Tab erhält sein eigenes QWebEngineProfile (übergeben vom Aufrufer),
  damit localStorage-Daten der beiden Apps isoliert bleiben.
"""

from pathlib import Path

from PySide6.QtCore import QUrl
from PySide6.QtWebEngineCore import QWebEngineDownloadRequest, QWebEnginePage
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWidgets import QFileDialog, QVBoxLayout, QWidget


class WebTab(QWidget):
    def __init__(self, html_path: Path, profile, parent=None):
        super().__init__(parent)
        self._profile = profile

        self._view = QWebEngineView(parent=self)
        page = QWebEnginePage(profile, self._view)
        self._view.setPage(page)

        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.addWidget(self._view)

        # Lokale HTML-Datei laden (file://-URL).
        url = QUrl.fromLocalFile(str(html_path.resolve()))
        self._view.load(url)

        # Download-Signal auf Profilebene verbinden.
        # Wird ausgelöst wenn FileSaver.js einen Blob-Download anstößt.
        profile.downloadRequested.connect(self._on_download_requested)

    def _on_download_requested(self, item: QWebEngineDownloadRequest) -> None:
        suggested = item.suggestedFileName() or "xjustiz_nachricht.xml"
        path, _ = QFileDialog.getSaveFileName(
            self,
            "Datei speichern",
            suggested,
            "XML-Dateien (*.xml);;Alle Dateien (*)",
        )
        if path:
            item.setDownloadDirectory(str(Path(path).parent))
            item.setDownloadFileName(Path(path).name)
            item.accept()
        else:
            item.cancel()
