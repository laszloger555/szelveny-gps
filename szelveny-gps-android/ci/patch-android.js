// Az automatikusan generált Android projekt testreszabása (CI-ben fut, `npx cap add android` után)
const fs = require('fs'), path = require('path');
const A = 'android/app/src/main';

// 1) Engedélyek: pontos helymeghatározás
const mf = path.join(A, 'AndroidManifest.xml');
let m = fs.readFileSync(mf, 'utf8');
const perms = [
  '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />',
  '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />',
  '<uses-feature android:name="android.hardware.location.gps" android:required="false" />'
].filter(p => !m.includes(p.split('"')[1]));
m = m.replace('</manifest>', '    ' + perms.join('\n    ') + '\n</manifest>');
// csak álló + fekvő is mehet; képernyő elforgatáskor ne induljon újra az app
m = m.replace(/android:configChanges="[^"]*"/, 'android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"');
fs.writeFileSync(mf, m);

// 2) MainActivity: képernyő ébren tartása, amíg az app előtérben van
const act = path.join(A, 'java/hu/szelveny/gps/MainActivity.java');
fs.writeFileSync(act, `package hu.szelveny.gps;

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
`);

// 3) Verziószám a GitHub build sorszámából
const run = parseInt(process.env.GITHUB_RUN_NUMBER || '1', 10);
const bg = 'android/app/build.gradle';
let g = fs.readFileSync(bg, 'utf8');
g = g.replace(/versionCode \d+/, 'versionCode ' + run).replace(/versionName "[^"]*"/, `versionName "1.0.${run}"`);
fs.writeFileSync(bg, g);
console.log('Android projekt testreszabva, verzió 1.0.' + run);
