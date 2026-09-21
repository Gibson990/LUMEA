import subprocess
import time
import json
import urllib.request
import base64
import tempfile
import websocket

temp_dir = tempfile.mkdtemp()
chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
cmd = [
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    '--no-sandbox',
    '--disable-gpu',
    f'--user-data-dir={temp_dir}',
    '--window-size=1280,850',
    'http://localhost:3000'
]

print('Starting Chrome...')
proc = subprocess.Popen(cmd)
time.sleep(3)

try:
    with urllib.request.urlopen('http://localhost:9222/json') as r:
        tabs = json.loads(r.read())
        print(f'Found {len(tabs)} tabs')
        ws_url = tabs[0]['webSocketDebuggerUrl']
        print(f'Connecting to {ws_url}')

    ws = websocket.create_connection(ws_url, timeout=10)
    # Wait for page to render fully
    time.sleep(2)
    req = {'id': 100, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}
    ws.send(json.dumps(req))

    while True:
        msg = json.loads(ws.recv())
        if msg.get('id') == 100:
            b64_data = msg['result']['data']
            img_bytes = base64.b64decode(b64_data)
            with open('docs/screenshots/fig_7_1_storefront_hero.png', 'wb') as f:
                f.write(img_bytes)
            print(f'SUCCESS: Saved fig_7_1_storefront_hero.png ({len(img_bytes)} bytes)')
            break
    ws.close()
except Exception as e:
    print(f'Error: {e}')
finally:
    proc.terminate()
    print('Chrome terminated.')
