# LGPL-Compliance-Hinweise für XJustiz-Tools

## Verwendete LGPL-Bibliotheken

Dieses Programm verwendet **Qt** und **PySide6**, die unter der
[GNU Lesser General Public License v3 (LGPL-3.0)](https://www.gnu.org/licenses/lgpl-3.0.html)
lizenziert sind.

## Pflichten unter der LGPL

### 1. Dynamisches Linking (erfüllt durch folder mode)
Qt-Bibliotheken **müssen** als separate, austauschbare Dateien bereitgestellt
werden. Der PyInstaller **folder mode** (onedir, nicht onefile) erfüllt diese
Anforderung: Alle `Qt6*.dll`-Dateien liegen als eigenständige Dateien im
`dist/XJustiz-Tools/`-Verzeichnis und können durch den Nutzer ausgetauscht werden.

**Niemals `--onefile` verwenden** — das würde Qt-Bibliotheken in eine
nicht-austauschbare Archivdatei einbetten und die LGPL verletzen.

### 2. Quellcode-Zugänglichkeit
Der Quellcode der Qt-Bibliotheken ist verfügbar unter:
- https://www.qt.io/download-open-source

PySide6 (das offizielle Python-Binding):
- https://pypi.org/project/PySide6/
- https://github.com/pyside/pyside-setup

### 3. Lizenzhinweis in der Anwendung (erfüllt)
Der "Über"-Dialog der Anwendung enthält einen Hinweis auf Qt/PySide6
und die LGPL-Lizenz mit Link zur Lizenzseite.

### 4. qt.conf
Die mitgelieferte `qt.conf` definiert den Suchpfad für Qt-Plugins und
-Bibliotheken relativ zur EXE, damit Nutzer Bibliotheken ersetzen können.

## Verteilungsstruktur (dist/XJustiz-Tools/)

```
XJustiz-Tools/
├── XJustiz-Tools.exe          ← Startdatei
├── Qt6Core.dll                ← Qt-Bibliotheken (austauschbar, LGPL)
├── Qt6Gui.dll
├── Qt6Widgets.dll
├── Qt6WebEngineCore.dll
├── Qt6WebEngineWidgets.dll
├── Qt6Network.dll
├── QtWebEngineProcess.exe     ← Chromium-Renderer-Prozess
├── qt.conf                    ← Pfadkonfiguration (LGPL-Pflicht)
├── resources/                 ← Chromium-Ressourcen
│   ├── icudtl.dat
│   └── *.pak
├── plugins/                   ← Qt-Plugins
├── assets/                    ← Eingebettete Web-Anwendungen
│   ├── Strukturierte_Daten_3_5_1/
│   └── eEB_3_5_1/
└── ...
```

## Eigenentwicklung (Python-Code)

Der Python-Quellcode dieses Projekts (`main.py`, `mainwindow.py` etc.)
ist nicht LGPL-lizenziert und kann unter eigener Lizenz stehen.
Die LGPL gilt nur für die Qt/PySide6-Bibliotheken selbst.
