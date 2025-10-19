# Produktanforderungsdokument (PRD): Pixel-Mosaik-Generator

Version: 1.0

Datum: 19. Oktober 2025

Autor: KI-Assistent & Anwender


## 1. Einleitung & Vision


### 1.1. Produktidee

Der "Pixel-Mosaik-Generator" ist eine einfache, webbasierte Anwendung, mit der Benutzer mühelos farbenfrohe, geometrische Muster im Stil von Pixel-Art erstellen können. Inspiriert von handgezeichneten Filzstift-Mustern, bietet die App eine digitale Leinwand für Kreativität und Entspannung.


### 1.2. Zielgruppe

* **Kreative & Designer:** Suchen nach einzigartigen, prozedural generierten Hintergründen und Mustern für ihre Projekte.
* **Hobby-Künstler:** Haben Spaß am Experimentieren mit Farben und Formen, ohne selbst zeichnen zu müssen.
* **Entwickler & Technik-Interessierte:** Sind fasziniert von generativer Kunst und Algorithmen.
* **Jeder, der eine entspannende, kreative Ablenkung sucht.**


### 1.3. Ziele & Erfolgsmetriken

* **Ziel:** Ein intuitives Werkzeug schaffen, das die Erstellung komplexer Muster mit einfachen Parametern ermöglicht.
* **Erfolgsmetriken:**
    * Anzahl der generierten und exportierten Muster.
    * Durchschnittliche Verweildauer in der App.
    * Positives Nutzerfeedback zur einfachen Bedienung.


## 2. Features & Funktionalität (Version 1.0 - Implementiert)


### 2.1. Kernkomponente: Die Leinwand (Canvas)

* Die App zeigt eine zentrale, rechteckige Leinwand an, die in ein Raster aus quadratischen Zellen (Pixel) unterteilt ist.
* Jede Zelle wird als SVG-Rechteck mit definierter Farbe und feinem Rand gerendert.
* Die Leinwand wird in Echtzeit dargestellt und passt sich responsive an verschiedene Bildschirmgrößen an.
* Das Canvas verwendet `shapeRendering="crispEdges"` für pixelgenaue Darstellung ohne Anti-Aliasing.


### 2.2. Einstellbare Parameter (Benutzersteuerung)


#### 2.2.1. Raster-Einstellungen

* **Breite:** Der Benutzer kann die Anzahl der Zellen in der Breite über einen Schieberegler definieren (10-100 Zellen).
* **Höhe:** Der Benutzer kann die Anzahl der Zellen in der Höhe über einen Schieberegler definieren (10-100 Zellen).
* **Standard:** Die App startet mit einem 29x29 Raster.


#### 2.2.2. Mustertyp (Algorithmus)

Der Benutzer kann aus einem Dropdown-Menü verschiedene Algorithmen zur Mustererzeugung auswählen. Die folgenden **neun Muster** sind implementiert:

1. **Concentric Diamonds (Konzentrische Rauten):** Das Muster entsteht aus der Mitte heraus in Form von Rauten. Die Farbe wird durch den Manhattan-Abstand vom Mittelpunkt bestimmt.

2. **Concentric Squares (Konzentrische Quadrate):** Das Muster besteht aus konzentrischen Quadraten um den Mittelpunkt. Die Farbe wird durch den Chebyshev-Abstand bestimmt.

3. **Corner Diamonds (Ecken-Rauten):** Ein symmetrisches Muster, bei dem jede Quadrant-Ecke als Ursprung für Rauten-Muster dient.

4. **Diamond Parquet (Rauten-Parkett):** Ein gekacheltes Muster mit Rauten, das einen Parkett-Effekt erzeugt.

5. **Diagonal Stripes (Diagonale Streifen):** Das Muster besteht aus diagonalen Farbbändern. Die Farbe wird durch die Position auf der Diagonale bestimmt.

6. **Symmetric Cross (Symmetrisches Kreuz/Kaleidoskop):** Das Muster entsteht durch eine symmetrische Berechnung, die auf dem minimalen horizontalen oder vertikalen Abstand vom Mittelpunkt basiert.

7. **Spiral (Spirale):** Ein spiralförmiges Muster, das Winkel und Distanz vom Zentrum kombiniert, um einen Spiraleffekt zu erzeugen.

8. **Heart (Herz):** Ein dekoratives Muster basierend auf der mathematischen Herz-Gleichung, mit konzentrischen Herzen die nach außen wachsen.

9. **Random (Zufall):** Jede Zelle erhält eine pseudo-zufällige Farbe aus der aktiven Palette (deterministisch durch Seed).


#### 2.2.3. Farbpalette

* **Paletten-Auswahl:** Der Benutzer kann aus fünf vordefinierten Farbpaletten wählen:
    * **Rainbow (Regenbogen):** 8 Farben - Rot → Orange → Gelb → Grün → Hellblau → Dunkelblau → Violett → Pink.
    * **Rainbow Extended (Erweiterter Regenbogen):** 15 Farben - eine erweiterte Version mit mehr Farbabstufungen.
    * **Grayscale (Graustufen):** 6 Graustufen von dunkel nach hell.
    * **Sunset (Sonnenuntergang):** 6 warme Farben - Orange, Gold, Rot, Dunkelrot, Braun, Violett.
    * **Forest (Wald):** 6 Grüntöne von dunkel nach hell.

* **Startfarbe wechseln:** Ein "Change start color"-Button ermöglicht das Rotieren der Farbpalette, um verschiedene Farbstartpunkte zu testen, ohne die Palette zu wechseln. Der aktuelle Startfarbe wird als kleine Farbbox neben dem Button angezeigt.


### 2.3. Interaktion

* **Echtzeit-Aktualisierung:** Jede Änderung eines Parameters (Rastergröße, Mustertyp, Palette, Startfarbe) führt zu einer sofortigen Neu-Generierung und Anzeige des Musters auf der Leinwand.
* **Optimierte Performance:** Die Mustergenerierung nutzt Memoization-Techniken für effiziente Berechnungen und vermeidet unnötige Neuberechnungen.
* **Seed-basierte Generierung:** Alle Muster verwenden einen zeitbasierten Seed für deterministische, reproduzierbare Ergebnisse.


### 2.4. Export-Funktion

Benutzer können ihre erstellten Werke in zwei Formaten speichern:

* **"Save as PNG":** Exportiert das aktuelle Muster als hochauflösende PNG-Bilddatei (2000px maximale Dimension). Die Pixel bleiben scharf durch deaktiviertes Image-Smoothing.

* **"Save as SVG":** Exportiert das Muster als skalierbare Vektorgrafik (SVG). Dies ist ideal für Designer, da das Bild ohne Qualitätsverlust skalierbar bleibt.

* **Intelligente Dateinamen:** Exportierte Dateien erhalten automatische, beschreibende Namen im Format: `mosaic-{pattern}-{width}x{height}.{ext}`.


### 2.5. Design & Benutzeroberfläche

* **Responsive Layout:**
    * Desktop: Sidebar mit Controls links, Canvas rechts.
    * Mobile/Tablet: Vollbreite Controls oben, Canvas unten.

* **Dark Mode Support:** Vollständige Unterstützung für helles und dunkles Theme mit automatischer Anpassung der Farben und Ränder.

* **Minimalistisch & aufgeräumt:** Klare Struktur mit Sektionen für Grid Settings, Pattern, und Export-Aktionen.

* **Intuitive Bedienung:**
    * Schieberegler für numerische Werte (Breite/Höhe)
    * Dropdown-Menüs für Auswahl (Pattern/Palette)
    * Klar beschriftete Buttons für Aktionen

* **Visuelle Feedback:** Der aktuelle Startfarbe wird neben dem "Change start color"-Button angezeigt.


### 2.6. Technische Architektur

* **Architektur:** Komponentenbasierte Web-Anwendung mit deklarativer UI
* **Rendering:** SVG-basierte Darstellung für pixelgenaue, skalierbare Ausgabe
* **State Management:** Zentralisierte Zustandsverwaltung mit reaktiver UI-Aktualisierung
* **Performance:** Memoization und effiziente Rendering-Strategien zur Vermeidung unnötiger Berechnungen
* **Modularität:** Wiederverwendbare UI-Komponenten (Button, Select, Slider) für konsistente Benutzeroberfläche
* **Browser-basiert:** Reine Client-seitige Verarbeitung ohne Server-Abhängigkeiten


## 3. User Flow & UI/UX (Version 1.0)


### 3.1. Typischer User Flow

1. Benutzer öffnet die Webseite.
2. Ein Standardmuster (29x29, Concentric Diamonds, Rainbow-Palette) wird sofort angezeigt.
3. Der Benutzer sieht die Leinwand zentral und die Steuerungselemente in einer Sidebar (Desktop) oder oben (Mobile).
4. Der Benutzer passt Parameter an:
    * Ändert die Rastergröße über Schieberegler
    * Wählt einen anderen Mustertyp aus dem Dropdown
    * Wechselt die Farbpalette
    * Rotiert die Startfarbe für Variationen
5. Die Leinwand aktualisiert sich bei jeder Änderung sofort.
6. Der Benutzer ist mit dem Ergebnis zufrieden und klickt auf "Save as PNG" oder "Save as SVG".
7. Der Download startet automatisch.


### 3.2. Design-Prinzipien (Umgesetzt)

* **Minimalistisch:** Die UI lenkt nicht vom generierten Kunstwerk ab.
* **Intuitiv:** Alle Steuerelemente sind klar beschriftet und selbsterklärend.
* **Responsiv:** Funktioniert auf Desktop, Tablet und (eingeschränkt) auf Mobile.
* **Performant:** Echtzeit-Aktualisierung auch bei großen Rastern (bis 100x100).


## 4. Features für Version 2.0 (Geplant)


### 4.1. Eigene Farbpalette erstellen

* **Custom Palette Editor:** Ein Interface, in dem Benutzer ihre eigene Farbpalette definieren können:
    * Farben hinzufügen/entfernen
    * Farbreihenfolge ändern (Drag & Drop)
    * Farbwähler für jede Farbe
    * Palette speichern und benennen
    * Gespeicherte Paletten verwalten (laden/löschen)


### 4.2. Erweiterte Muster-Algorithmen

* **Fraktale:** Implementierung von fraktalen Mustern (z.B. Mandelbrot, Julia Sets)
* **Perlin Noise:** Organische, natürlich wirkende Muster
* **Cellular Automata:** Game of Life-ähnliche Muster
* **Voronoi Diagrams:** Zelluläre Strukturen


### 4.3. Animation

* **Parameter-Animation:**
    * Animierte Übergänge zwischen verschiedenen Parameterwerten
    * Fließende Musterübergänge (z.B. Farbpaletten-Rotation)
    * Export als animiertes GIF oder Video
* **Geschwindigkeits-Kontrolle:** Schieberegler für Animationsgeschwindigkeit
* **Pause/Play-Steuerung:** Kontrolle über die Animation


### 4.4. Interaktive Bearbeitung

* **Einzelne Zellen bearbeiten:**
    * Klick auf eine Zelle öffnet einen Farbwähler
    * Manuelle Farbanpassung einzelner Pixel
    * Pinsel-Werkzeug zum Zeichnen auf dem Muster
* **Radiergummi-Werkzeug:** Zellen auf Hintergrundfarbe zurücksetzen
* **Undo/Redo-Funktion:** Historie der manuellen Änderungen


### 4.5. Speichern & Teilen

* **Preset-System:**
    * Speichern von Lieblingseinstellungen als benannte Presets
    * Schnelles Laden gespeicherter Konfigurationen
    * Import/Export von Presets als JSON

* **URL-Sharing:**
    * Generierung einer eindeutigen URL mit allen Parametern kodiert
    * Teilen eines Links, der ein bestimmtes Muster exakt reproduziert
    * QR-Code-Generierung für einfaches Teilen

* **Social Media Integration:**
    * Direkte Share-Buttons für Twitter, Instagram, Pinterest
    * Optimierte Vorschaubilder


### 4.6. Erweiterte Export-Optionen

* **Auflösungs-Kontrolle:** Benutzerdefinierte Export-Auflösung für PNG
* **Weitere Formate:**
    * PDF-Export für Druck
    * WebP für optimierte Web-Nutzung
    * TIFF für professionelle Anwendungen
* **Batch-Export:** Mehrere Variationen gleichzeitig exportieren


### 4.7. Weitere Verbesserungen

* **Tastatur-Shortcuts:** Schneller Zugriff auf häufige Aktionen
* **Rückgängig-Button:** Für versehentliche Parameteränderungen
* **Favoriten-System:** Markierung von Lieblingsmustern
* **Gallery-View:** Übersicht über generierte Muster in der Session
* **Tutorial/Onboarding:** Interaktive Einführung für neue Benutzer
* **Performance-Optimierungen:** Web Workers für große Raster (>100x100)


## 5. Erfolgsmetriken (Aktualisiert)


### Version 1.0 (Erreicht)

* ✅ Intuitive Bedienung mit minimaler Lernkurve
* ✅ Echtzeit-Generierung für sofortiges visuelles Feedback
* ✅ Hochwertige Exporte in zwei Formaten (PNG/SVG)
* ✅ Responsive Design für verschiedene Geräte
* ✅ 9 verschiedene Muster-Algorithmen
* ✅ 5 vordefinierte Farbpaletten
* ✅ Dark Mode Support


### Version 2.0 (Geplant)

* Durchschnittliche Verweildauer >5 Minuten
* >50% der Benutzer exportieren mindestens ein Muster
* >20% der Benutzer erstellen eigene Farbpaletten
* >30% der Benutzer teilen Muster über URL
* Positives Nutzerfeedback (>4.5/5 Sterne)


## 6. Technische Anforderungen (Version 2.0)


### 6.1. Browser-Kompatibilität

* Chrome/Edge (letzte 2 Versionen)
* Firefox (letzte 2 Versionen)
* Safari (letzte 2 Versionen)
* Mobile Safari/Chrome


### 6.2. Performance-Ziele

* Canvas-Rendering: <100ms für 100x100 Raster
* Export PNG: <2 Sekunden für 2000px Ausgabe
* UI-Responsiveness: <16ms für Parameter-Updates


### 6.3. Datenschutz & Speicherung

* **Lokale Speicherung:**
    * Custom Palettes in LocalStorage
    * Presets in LocalStorage
    * Keine Server-seitige Speicherung von Benutzerdaten
* **URL-Parameter:** Alle Einstellungen als URL-Parameter für Sharing


## 7. Offene Fragen & Entscheidungen


### Für Version 2.0

1. **Custom Palette Storage:** LocalStorage oder Cloud-Sync (mit optionalem Account)?
2. **Animation Format:** GIF, MP4, oder WebM für Export?
3. **Sharing Platform:** Eigene Gallery-Seite oder nur URL-Sharing?
4. **Monetarisierung:** Kostenlos oder Premium-Features (z.B. High-Res Exports)?
5. **Performance Limits:** Maximale Rastergröße für Browser-Stabilität?


## 8. Anhang


### 8.1. Implementierte Pattern-Algorithmen (Details)

Dieser Abschnitt beschreibt die mathematischen Grundlagen und Algorithmen für jedes der neun implementierten Muster. Alle Algorithmen arbeiten auf einem diskreten Raster mit Koordinaten (x, y), wobei x ∈ [0, width-1] und y ∈ [0, height-1].


#### 8.1.1. Concentric Diamonds (Konzentrische Rauten)

**Konzept:** Erzeugt konzentrische rautenförmige Ringe um den Mittelpunkt des Rasters, wobei die Farbe durch die Distanz vom Zentrum bestimmt wird.

**Mathematische Grundlage:**
- Zentrum: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Manhattan-Distanz (L₁-Metrik): `d(x,y) = |x - centerX| + |y - centerY|`
- Diese Metrik erzeugt rautenförmige Isolinien (alle Punkte mit gleicher Distanz bilden eine Raute)

**Farbzuweisung:**
```
offset = paletteLength - 2  // Offset für visuell ansprechenden Start
colorIndex = (floor(distance) + offset + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION concentricDiamonds(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Manhattan-Distanz berechnen
    distance = abs(x - centerX) + abs(y - centerY)

    // Farbindex mit Offset bestimmen
    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Symmetrie: 4-fache Rotationssymmetrie (90°, 180°, 270°)
- Spiegelung: Symmetrisch an beiden Diagonalen und horizontaler/vertikaler Achse
- Distanzwachstum: Linear mit Manhattan-Distanz


#### 8.1.2. Concentric Squares (Konzentrische Quadrate)

**Konzept:** Erzeugt konzentrische quadratische Ringe um den Mittelpunkt, ähnlich wie Concentric Diamonds, aber mit rechtwinkligen Ecken.

**Mathematische Grundlage:**
- Zentrum: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Chebyshev-Distanz (L∞-Metrik): `d(x,y) = max(|x - centerX|, |y - centerY|)`
- Diese Metrik erzeugt quadratförmige Isolinien

**Farbzuweisung:**
```
offset = paletteLength - 2
colorIndex = (floor(distance) + offset + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION concentricSquares(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Chebyshev-Distanz berechnen
    distanceX = abs(x - centerX)
    distanceY = abs(y - centerY)
    distance = max(distanceX, distanceY)

    // Farbindex mit Offset bestimmen
    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Symmetrie: 4-fache Rotationssymmetrie (90°, 180°, 270°)
- Rechtwinklige Ecken im Gegensatz zu Concentric Diamonds
- Konstante Anzahl Pixel pro Ring an den Kanten


#### 8.1.3. Corner Diamonds (Ecken-Rauten)

**Konzept:** Teilt das Raster in vier Quadranten und berechnet für jeden Quadranten Rauten ausgehend von einer bestimmten Ecke, wodurch ein symmetrischer, kaleidoskopischer Effekt entsteht.

**Mathematische Grundlage:**
- Quadranten-Aufteilung basierend auf Zentrum `(centerX, centerY)`
- Für jeden Quadranten wird die Manhattan-Distanz zu einer zugeordneten Ecke berechnet:
  - Quadrant I (x < centerX, y < centerY): Distanz zur oberen rechten Ecke (width-1, 0)
  - Quadrant II (x ≥ centerX, y < centerY): Distanz zur oberen linken Ecke (0, 0)
  - Quadrant III (x < centerX, y ≥ centerY): Distanz zur unteren rechten Ecke (width-1, height-1)
  - Quadrant IV (x ≥ centerX, y ≥ centerY): Distanz zur unteren linken Ecke (0, height-1)

**Pseudocode:**
```
FUNCTION cornerDiamonds(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Quadrant bestimmen und entsprechende Ecken-Distanz berechnen
    IF x < centerX AND y < centerY THEN
        // Oberer linker Quadrant: Distanz zur oberen rechten Ecke
        distance = abs(x - (width - 1)) + abs(y - 0)
    ELSE IF x >= centerX AND y < centerY THEN
        // Oberer rechter Quadrant: Distanz zur oberen linken Ecke
        distance = abs(x - 0) + abs(y - 0)
    ELSE IF x < centerX AND y >= centerY THEN
        // Unterer linker Quadrant: Distanz zur unteren rechten Ecke
        distance = abs(x - (width - 1)) + abs(y - (height - 1))
    ELSE
        // Unterer rechter Quadrant: Distanz zur unteren linken Ecke
        distance = abs(x - 0) + abs(y - (height - 1))

    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Symmetrie: 2-fache Rotationssymmetrie (180°)
- Spiegelsymmetrie an beiden Diagonalen
- Kreiert visuell interessante Kreuzungspunkte entlang der Quadranten-Grenzen


#### 8.1.4. Diamond Parquet (Rauten-Parkett)

**Konzept:** Erzeugt ein gekacheltes Muster mit sich wiederholenden Rauten-Motiven, ähnlich einem Parkettboden. Das Muster wiederholt sich periodisch.

**Mathematische Grundlage:**
- Kachelgröße: `tileSize = paletteLength × 2` (eine vollständige Farbzyklus-Periode)
- Verschiebung um halbe Kachelgröße für Parkett-Effekt
- Modulare Arithmetik für Periodizität
- Manhattan-Distanz innerhalb jeder Kachel zum Kachelzentrum

**Pseudocode:**
```
FUNCTION diamondParquet(x, y, width, height, palette, startColorOffset):
    tileSize = palette.length * 2

    // Koordinaten in gekacheltes System verschieben
    shiftedX = (x + floor(tileSize / 2)) mod tileSize
    shiftedY = (y + floor(tileSize / 2)) mod tileSize

    // Zentrum der Kachel
    tileCenterX = floor(tileSize / 2)
    tileCenterY = floor(tileSize / 2)

    // Manhattan-Distanz innerhalb der Kachel
    distance = abs(shiftedX - tileCenterX) + abs(shiftedY - tileCenterY)

    offset = palette.length - 2
    colorIndex = (floor(distance) + offset + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Periodizität: Das Muster wiederholt sich alle `tileSize` Pixel in beide Richtungen
- Nahtlose Kachelung: Kann als nahtlose Textur verwendet werden
- Kombiniert lokale Symmetrie (innerhalb einer Kachel) mit globaler Repetition


#### 8.1.5. Diagonal Stripes (Diagonale Streifen)

**Konzept:** Erzeugt parallele diagonale Streifen, die von oben links nach unten rechts verlaufen. Alle Punkte auf einer Diagonale haben dieselbe Farbe.

**Mathematische Grundlage:**
- Diagonale Linien konstanter Summe: `x + y = konstant`
- Punkte mit gleichem `x + y` Wert liegen auf derselben Diagonale
- Einfachster Algorithmus, rein additiv

**Farbzuweisung:**
```
value = x + y
colorIndex = (value + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION diagonalStripes(x, y, width, height, palette, startColorOffset):
    // Summe der Koordinaten bestimmt die Diagonale
    value = x + y

    // Direkte Farbzuweisung basierend auf Diagonale
    colorIndex = (value + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Lineare Progression: Farbe ändert sich linear entlang der Diagonale
- Richtung: 45° Winkel (nordost nach südwest)
- Keine Symmetrie, aber klare Richtung
- Sehr performant (nur eine Addition)


#### 8.1.6. Symmetric Cross (Symmetrisches Kreuz / Kaleidoskop)

**Konzept:** Erzeugt ein kreuzförmiges Muster mit hoher Symmetrie. Die Farbe wird durch den kleineren der beiden Abstände vom Zentrum (horizontal oder vertikal) bestimmt.

**Mathematische Grundlage:**
- Zentrum: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Separate Berechnung der horizontalen und vertikalen Abstände
- Minimum-Funktion: `d(x,y) = min(|x - centerX|, |y - centerY|)`
- Erzeugt kreuzförmige Isolinien

**Pseudocode:**
```
FUNCTION symmetricCross(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Separate Abstände berechnen
    distanceX = abs(x - centerX)
    distanceY = abs(y - centerY)

    // Minimum der beiden Distanzen
    value = min(distanceX, distanceY)

    colorIndex = (floor(value) + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Symmetrie: 4-fache Rotationssymmetrie (90°, 180°, 270°)
- Kreuzform: Horizontale und vertikale "Arme" mit gleichen Farben
- Spiegelsymmetrie an beiden Achsen und Diagonalen
- Erzeugt ein Plus-Zeichen oder Kreuz-Muster


#### 8.1.7. Spiral (Spirale)

**Konzept:** Erzeugt ein spiralförmiges Muster durch Kombination von polarem Winkel und radialer Distanz vom Zentrum.

**Mathematische Grundlage:**
- Umwandlung von kartesischen zu Polarkoordinaten
- Zentrum: `(centerX, centerY) = ((width-1)/2, (height-1)/2)`
- Polarkoordinaten:
  - `Δx = x - centerX`
  - `Δy = y - centerY`
  - `r = √(Δx² + Δy²)` (Euklidische Distanz)
  - `θ = atan2(Δy, Δx)` (Winkel, Bereich: [-π, π])
- Spiralwert: Kombination aus normalisiertem Winkel und Distanz

**Farbzuweisung:**
```
normalizedAngle = (θ + π) / (2π)  // Normalisiert auf [0, 1]
spiralValue = normalizedAngle × paletteLength + r × tightness
colorIndex = (floor(spiralValue) + startColorOffset) mod paletteLength
```

**Pseudocode:**
```
FUNCTION spiral(x, y, width, height, palette, startColorOffset):
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Kartesische Koordinaten relativ zum Zentrum
    deltaX = x - centerX
    deltaY = y - centerY

    // Polarkoordinaten berechnen
    angle = atan2(deltaY, deltaX)  // Bereich: [-π, π]
    distance = sqrt(deltaX * deltaX + deltaY * deltaY)

    // Winkel auf [0, 1] normalisieren
    normalizedAngle = (angle + π) / (2 * π)

    // Spiralwert: Winkel bestimmt Basis, Distanz fügt "Drehungen" hinzu
    tightness = 0.5  // Kontrolliert, wie eng die Spirale gewickelt ist
    spiralValue = normalizedAngle * palette.length + distance * tightness

    colorIndex = (floor(spiralValue) + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Rotation: Farben drehen sich um das Zentrum
- Tightness-Parameter: Bestimmt, wie schnell die Spirale nach außen wächst
- Kontinuierliche Übergänge vom Zentrum nach außen
- Radiale Symmetrie in rotierendem Sinne
- Visuell dynamisch und fließend


#### 8.1.8. Heart (Herz)

**Konzept:** Erzeugt ein herzförmiges Muster basierend auf der mathematischen Herzgleichung. Das Muster besteht aus konzentrischen Herzen, die vom Zentrum nach außen wachsen.

**Mathematische Grundlage:**
- Herzgleichung (implizite Form): `(x² + y² - 1)³ - x² × y³ ≤ 0`
- Punkte innerhalb dieser Kurve bilden ein Herz
- Normalisierung auf Raster-Koordinaten durch Skalierung
- Multiple Skalierungsfaktoren für konzentrische Herzen

**Algorithmus:**
1. Koordinaten relativ zum Zentrum berechnen
2. Y-Koordinate invertieren (mathematische Konvention: Y nach oben)
3. Für verschiedene Skalierungsstufen testen, welches Herz den Punkt enthält
4. Kleinste enthaltende Herz-Skala bestimmt die Farbe

**Pseudocode:**
```
FUNCTION heart(x, y, width, height, palette, startColorOffset):
    baseScale = min(width, height) / 12  // Grundgröße der Herzen
    centerX = (width - 1) / 2
    centerY = (height - 1) / 2

    // Koordinaten relativ zum Zentrum (Y invertiert)
    deltaXBase = x - centerX
    deltaYBase = -(y - centerY - 1) + baseScale * 0.3  // Leichte vertikale Verschiebung

    distance = palette.length  // Standardwert: außerhalb aller Herzen

    // Teste verschiedene Herz-Größen (von klein nach groß)
    FOR scaleStep = 0 TO palette.length * 2 - 1 DO
        currentScale = baseScale * (0.5 + scaleStep * 0.3)

        // Normalisierte Koordinaten für diese Herz-Größe
        normX = deltaXBase / currentScale
        normY = deltaYBase / currentScale

        // Herzgleichung auswerten: (x² + y² - 1)³ - x² × y³
        sumSquares = normX * normX + normY * normY
        heartValue = pow(sumSquares - 1, 3) - normX * normX * pow(normY, 3)

        // Wenn Punkt innerhalb dieses Herzens liegt
        IF heartValue <= 0 THEN
            distance = scaleStep
            BREAK  // Kleinste enthaltende Herz gefunden

    colorIndex = (distance + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Symmetrie: Spiegelsymmetrie entlang der vertikalen Achse
- Konzentrische Struktur: Mehrere Herz-Schalen vom Zentrum nach außen
- Mathematisch exakt: Basiert auf der klassischen Herzgleichung
- Visuell ansprechend und erkennbar als Herzform
- Komplexität: Erfordert Potenzierung und iterative Prüfung


#### 8.1.9. Random (Pseudo-Zufall)

**Konzept:** Erzeugt ein scheinbar zufälliges Muster, wobei jede Zelle eine "zufällige" Farbe erhält. Trotz des zufälligen Aussehens ist das Muster deterministisch und durch den Seed reproduzierbar.

**Mathematische Grundlage:**
- Deterministisches Pseudo-Zufalls-Verfahren
- Hash-Funktion basierend auf Koordinaten und Seed
- Verwendet Sinus-Funktion für gleichmäßige Verteilung
- Große Primzahlen zur Vermeidung von Mustern

**Hash-Funktion:**
```
hash(x, y, seed) = sin(x × 12.9898 + y × 78.233 + seed) × 43758.5453
```

Die Nachkommastellen dieser Berechnung erscheinen zufällig, sind aber für gegebene Inputs deterministisch.

**Pseudocode:**
```
FUNCTION random(x, y, width, height, palette, startColorOffset, seed):
    // Deterministische "Zufalls"-Berechnung
    // Verwendet Hash-Funktion mit großen Primzahlen
    hashValue = sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453

    // Absolutwert um negative Werte zu vermeiden
    positiveValue = abs(hashValue)

    // Nachkommastellen extrahieren (durch floor von Ganzzahl-Teil)
    fractionalPart = positiveValue - floor(positiveValue)

    // Auf Palette-Bereich abbilden
    paletteIndex = floor(fractionalPart * palette.length)

    // Mit Startfarben-Offset kombinieren
    colorIndex = (paletteIndex + startColorOffset) mod palette.length

    RETURN palette[colorIndex]
```

**Eigenschaften:**
- Deterministisch: Gleiche Inputs (x, y, seed) erzeugen immer gleiche Farbe
- Reproduzierbar: Durch Speicherung des Seeds kann das Muster exakt nacherzeugt werden
- Gleichmäßige Verteilung: Alle Farben erscheinen etwa gleich häufig
- Keine erkennbaren Muster: Visuell erscheint es als echter Zufall
- Seed-Abhängigkeit: Verschiedene Seeds erzeugen völlig unterschiedliche Muster


### 8.1.10. Gemeinsame Eigenschaften und Parameter

**Alle Algorithmen teilen folgende Parameter:**
- `width, height`: Dimensionen des Rasters
- `palette`: Array von Farben (als Hex-Strings oder RGB-Werte)
- `startColorOffset`: Rotations-Offset für die Farbpalette (0 bis paletteLength-1)

**Farbpaletten-Modulo:**
Alle Algorithmen verwenden modulare Arithmetik (`mod paletteLength`), um sicherzustellen, dass die berechneten Farbindizes immer im gültigen Bereich [0, paletteLength-1] liegen. Dies ermöglicht:
- Nahtlose Wiederholung bei Mustern, die über die Palette hinausgehen
- Funktionsfähigkeit mit Paletten beliebiger Größe
- Konsistentes Verhalten bei Palette-Wechsel

**Performance-Überlegungen:**
- **Einfachste Algorithmen** (absteigend): Diagonal Stripes > Concentric Diamonds/Squares > Symmetric Cross
- **Komplexeste Algorithmen**: Heart (iterative Berechnung), Spiral (Trigonometrie)
- **Optimierungsmöglichkeiten**: Vorberechnung von Distanzen, Lookup-Tables für trigonometrische Funktionen


### 8.2. Color Palettes (Hex-Codes)

**Rainbow:** `#ef4444, #f97316, #eab308, #22c55e, #38bdf8, #3b82f6, #8b5cf6, #ec4899`

**Rainbow Extended:** `#ef4444, #f87171, #fb923c, #fbbf24, #fde047, #84cc16, #4ade80, #34d399, #22d3ee, #60a5fa, #818cf8, #a78bfa, #c084fc, #e879f9, #f472b6`

**Grayscale:** `#111827, #374151, #6b7280, #9ca3af, #d1d5db, #f3f4f6`

**Sunset:** `#f97316, #f59e0b, #ef4444, #dc2626, #991b1b, #4a044e`

**Forest:** `#166534, #15803d, #16a34a, #a3e635, #4d7c0f, #3f6212`
