"""
QWebEngineProfile-Konfiguration für XJustiz-Tools.

Jede Web-Anwendung erhält ein eigenes benanntes Profil, damit
localStorage-Daten isoliert bleiben und beide Apps unabhängig
voneinander Cache/Cookies verwalten können.

Kritische Einstellung: LocalContentCanAccessFileUrls = True
Entspricht dem Chromium-Flag --allow-file-access-from-files, der laut
den Leitfäden für beide Browseranwendungen erforderlich ist, damit
XSLT-Stylesheets, XSD-Schemata und JSON-Codelisten per
XMLHttpRequest / fetch über file://-URLs geladen werden können.
"""

from PySide6.QtWebEngineCore import QWebEngineProfile, QWebEngineSettings


def _apply_base_settings(profile: QWebEngineProfile) -> None:
    s = profile.settings()

    # Lokale Dateien dürfen andere lokale Dateien laden (XSLT, JSON, XSD).
    # Entspricht --allow-file-access-from-files.
    s.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)

    # Kein Zugriff auf Remote-URLs nötig – beide Apps arbeiten vollständig offline.
    s.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, False)

    # JavaScript ist Pflicht (beide Apps zeigen Fehlermeldung wenn deaktiviert).
    s.setAttribute(QWebEngineSettings.WebAttribute.JavascriptEnabled, True)

    # localStorage für ERV-App (speichert Nutzerverzeichnis persistent).
    s.setAttribute(QWebEngineSettings.WebAttribute.LocalStorageEnabled, True)

    # Synchrones XMLHttpRequest wird in eEB-App für XSLT-Laden genutzt.
    # Chromium zeigt seit v106 Deprecation-Warnungen, blockiert es aber noch nicht.
    # Kein explizites Flag nötig – standardmäßig erlaubt.

    # Kein insecure content nötig (alles file://).
    s.setAttribute(QWebEngineSettings.WebAttribute.AllowRunningInsecureContent, False)

    # Scrollbars per CSS kontrolliert.
    s.setAttribute(QWebEngineSettings.WebAttribute.ScrollAnimatorEnabled, False)


def create_erv_profile() -> QWebEngineProfile:
    """Profil für 'ERV Strukturdatensatz erstellen'."""
    profile = QWebEngineProfile("xjustiz-erv")
    _apply_base_settings(profile)
    return profile


def create_eeb_profile() -> QWebEngineProfile:
    """Profil für 'Elektronisches Empfangsbekenntnis (eEB)'."""
    profile = QWebEngineProfile("xjustiz-eeb")
    _apply_base_settings(profile)
    return profile
