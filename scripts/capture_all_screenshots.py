import subprocess
import time
import json
import urllib.request
import base64
import tempfile
import websocket
import os

temp_dir = tempfile.mkdtemp(prefix='edge_all_shots_')
edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

cmd = [
    edge_path,
    '--headless=new',
    '--remote-debugging-port=9445',
    '--remote-allow-origins=*',
    '--no-sandbox',
    '--disable-gpu',
    f'--user-data-dir={temp_dir}',
    '--window-size=1280,900',
    'http://localhost:3000'
]

print('Launching Edge on port 9445...')
proc = subprocess.Popen(cmd)
time.sleep(3)

os.makedirs('docs/screenshots', exist_ok=True)

def send_recv(ws, msg_id, method, params=None):
    payload = {'id': msg_id, 'method': method}
    if params:
        payload['params'] = params
    ws.send(json.dumps(payload))
    while True:
        res = json.loads(ws.recv())
        if res.get('id') == msg_id:
            return res

try:
    with urllib.request.urlopen('http://localhost:9445/json') as r:
        tabs = json.loads(r.read())
        page_tab = [t for t in tabs if t.get('type') == 'page'][0]
        ws_url = page_tab['webSocketDebuggerUrl']

    ws = websocket.create_connection(ws_url, timeout=15)
    print('Connected to CDP!')
    msg_id = 1

    # 1. Storefront Landing / Hero
    print('Capturing 1: Storefront Hero...')
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/'}); msg_id += 1
    time.sleep(2.5)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_1_storefront_hero.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 2. Specs Gallery Section
    print('Capturing 2: Specs Gallery...')
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': "document.querySelector('#specs').scrollIntoView();"}); msg_id += 1
    time.sleep(1)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_2_specs_gallery.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 3. Benefits / How To Use Section
    print('Capturing 3: Benefits Section...')
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': "document.querySelector('#about').scrollIntoView();"}); msg_id += 1
    time.sleep(1)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_3_benefits_howtouse.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 4. Customer Reviews Section
    print('Capturing 4: Customer Reviews...')
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': "document.querySelector('#reviews').scrollIntoView();"}); msg_id += 1
    time.sleep(1)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_4_customer_reviews.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 5. Track Order Page with #LM1024 Search Result
    print('Capturing 5: Track Order Page...')
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/track-order'}); msg_id += 1
    time.sleep(2)
    # Fill in input and submit form
    fill_script = """
    const inp = document.querySelector('input[type="text"]');
    if (inp) {
        inp.value = '#LM1024';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        const form = inp.closest('form');
        if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
    """
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': fill_script}); msg_id += 1
    time.sleep(2)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_6_track_order.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 6. Customer Support Desk Page
    print('Capturing 6: Customer Support Desk...')
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/support'}); msg_id += 1
    time.sleep(2)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_7_support_desk.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 7. Checkout Page with Injected Cart Item
    print('Capturing 7: Checkout Page...')
    cart_inject = """
    localStorage.setItem('lumea_cart', JSON.stringify({
        productId: 1,
        productName: 'Luméa Glow Tint',
        variantId: 1,
        shadeName: 'Rose Petal',
        colorHex: '#D9828B',
        price: 799,
        quantity: 2
    }));
    """
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': cart_inject}); msg_id += 1
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/checkout'}); msg_id += 1
    time.sleep(2)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_5_checkout_page.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 8. Admin Management Portal (Logged in as Super Admin)
    print('Capturing 8: Admin Dashboard...')
    admin_inject = """
    localStorage.setItem('lumea_user', JSON.stringify({
        id: 1,
        name: 'Kichu Khoirom',
        email: 'kichuKhoirom@gmail.com',
        role: 'admin'
    }));
    localStorage.setItem('lumea_token', 'lumea_token_1_demo');
    """
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': admin_inject}); msg_id += 1
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/admin'}); msg_id += 1
    time.sleep(2.5)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_8_admin_dashboard.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 9. Admin User Management Tab
    print('Capturing 9: Admin User Roles...')
    user_tab_script = """
    const buttons = Array.from(document.querySelectorAll('button'));
    const uBtn = buttons.find(b => b.textContent.includes('User Roles'));
    if (uBtn) uBtn.click();
    """
    send_recv(ws, msg_id, 'Runtime.evaluate', {'expression': user_tab_script}); msg_id += 1
    time.sleep(1.5)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_9_admin_users.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 10. 404 Resilience Page
    print('Capturing 10: 404 Not Found...')
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/non-existent-beauty-page'}); msg_id += 1
    time.sleep(2)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_10_404_resilience.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    # 11. Mobile Viewport (390 x 844)
    print('Capturing 11: Mobile Responsive View...')
    send_recv(ws, msg_id, 'Emulation.setDeviceMetricsOverride', {
        'width': 390,
        'height': 844,
        'deviceScaleFactor': 2,
        'mobile': True
    }); msg_id += 1
    send_recv(ws, msg_id, 'Page.navigate', {'url': 'http://localhost:3000/'}); msg_id += 1
    time.sleep(2)
    r = send_recv(ws, msg_id, 'Page.captureScreenshot', {'format': 'png'}); msg_id += 1
    with open('docs/screenshots/fig_7_11_mobile_view.png', 'wb') as f:
        f.write(base64.b64decode(r['result']['data']))

    print('ALL 11 SCREENSHOTS CAPTURED SUCCESSFULLY!')
    ws.close()
except Exception as e:
    print(f'Error during capture: {e}')
finally:
    proc.terminate()
    print('Browser closed.')
