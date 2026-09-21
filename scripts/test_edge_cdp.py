import subprocess
import time
import json
import urllib.request
import base64
import tempfile
import websocket
import os

temp_dir = tempfile.mkdtemp(prefix='edge_cdp_')
edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

cmd = [
    edge_path,
    '--headless=new',
    '--remote-debugging-port=9444',
    '--remote-allow-origins=*',
    '--no-sandbox',
    '--disable-gpu',
    f'--user-data-dir={temp_dir}',
    '--window-size=1280,850',
    'http://localhost:3000'
]

print('Starting Edge on port 9444...')
proc = subprocess.Popen(cmd)
time.sleep(3)

try:
    with urllib.request.urlopen('http://localhost:9444/json') as r:
        tabs = json.loads(r.read())
        print(f'Tabs found: {len(tabs)}')
        # Find the page tab
        page_tab = [t for t in tabs if t.get('type') == 'page'][0]
        ws_url = page_tab['webSocketDebuggerUrl']
        print(f'Connecting to {ws_url}')

    ws = websocket.create_connection(ws_url, timeout=10)
    time.sleep(2)

    req = {'id': 1, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}
    ws.send(json.dumps(req))

    while True:
        msg = json.loads(ws.recv())
        if msg.get('id') == 1:
            data = base64.b64decode(msg['result']['data'])
            os.makedirs('docs/screenshots', exist_ok=True)
            with open('docs/screenshots/fig_7_1_storefront_hero.png', 'wb') as f:
                f.write(data)
            print(f'SUCCESS! Screenshot saved: {len(data)} bytes')
            break
    ws.close()
except Exception as e:
    print(f'Error: {e}')
finally:
    proc.terminate()
    print('Finished.')
