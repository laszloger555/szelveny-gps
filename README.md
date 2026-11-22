# Szelvényezés (Szelvény GPS) – GERYSoft Geo Mind Android app

A telefon GPS-éből megmutatja, melyik nyomvonal (tengely) melyik szelvényében vagy,
és hány méterre a tengelytől (J = jobbra +, B = balra −, a szelvényezés irányába nézve).
A tengelyek egy Civil 3D LandXML exportból jönnek (EOV, HD72). A beépített adat az `M100 FELOSZTAS.xml`,
de az appban a Menü → „XML betöltése…” gombbal bármelyik másikat betöltheted.

## APK készítése (egyszer kell beállítani, utána automatikus)

1. Regisztrálj / lépj be a github.com-on.
2. **New repository** → név: `szelveny-gps` → *Public* (így a telefonról bejelentkezés nélkül letölthető az APK;
   ha *Private*, a letöltéshez be kell lépni) → **Create repository**.
3. A repository oldalán: **uploading an existing file** → húzd be a kicsomagolt mappa **teljes tartalmát** → **Commit changes**.
4. Ellenőrizd, hogy feltöltődött-e a `.github/workflows/build.yml` fájl (rejtett mappa, a böngésző néha kihagyja).
   Ha nincs ott: **Add file → Create new file**, a fájlnév legyen `.github/workflows/build.yml`,
   a tartalma pedig a `ci/build.yml.masolat` fájl szövege → **Commit changes**.
5. Fent az **Actions** fül → az „APK fordítás” futás kb. 5–8 perc. Zöld pipa = kész.
6. A repository főoldalán jobb oldalt **Releases → „Szelvényezés – legfrissebb”** → `szelveny-gps.apk`.
   Ezt a linket nyisd meg a telefonon, töltsd le, és telepítsd
   (első alkalommal engedélyezni kell az „ismeretlen forrásból” telepítést a böngészőnek).

Minden további módosítás (pl. új `www/index.html`) feltöltése után magától új APK készül, és a telepítés
felülírja a régit (a betöltött XML megmarad).

## Tudnivalók
- GPS: a telefon saját vevője, tipikusan 3–5 m pontosság. EOV átszámítás: HD72 7 paraméteres, kb. 1 m.
- Adatok és a program net nélkül is mennek; a térkép háttérképeihez (utcatérkép/műhold) net kell.
- A képernyő ébren marad, amíg az app előtérben van.
- Teszt mód: GPS helyett a térképre koppintva adhatsz meg pozíciót.
- Az aláíró kulcs (`ci/debug.keystore`) csak saját/csapaton belüli telepítésre való, Play Áruházba nem.
