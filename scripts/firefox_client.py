#!/usr/bin/env python3
import sys
import subprocess
import json
import time

class FirefoxMCPClient:
    def __init__(self, headless=True):
        cmd = [
            'npx', '-y', '@mozilla/firefox-mcp',
            '--firefoxPath', '/Applications/Firefox.app/Contents/MacOS/firefox',
            '--unrestrictedSavePaths'
        ]
        if headless:
            cmd.append('--headless')
        self.proc = subprocess.Popen(
            cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            text=True
        )
        self.msg_id = 0
        self._init()

    def send(self, method, params=None):
        self.msg_id += 1
        payload = {
            'jsonrpc': '2.0',
            'id': self.msg_id,
            'method': method
        }
        if params is not None:
            payload['params'] = params
        self.proc.stdin.write(json.dumps(payload) + '\n')
        self.proc.stdin.flush()
        line = self.proc.stdout.readline()
        if not line:
            return None
        return json.loads(line)

    def _init(self):
        self.send('initialize', {
            'protocolVersion': '2024-11-05',
            'capabilities': {},
            'clientInfo': {'name': 'firefox-mcp-client', 'version': '1.0'}
        })
        self.send('notifications/initialized')

    def call_tool(self, tool_name, arguments):
        resp = self.send('tools/call', {
            'name': tool_name,
            'arguments': arguments
        })
        res = resp.get('result', {})
        if tool_name in ('screenshot_page', 'screenshot_by_uid') and 'filePath' in arguments:
            content = res.get('content', [])
            for item in content:
                if item.get('type') == 'image' and 'data' in item:
                    import base64
                    with open(arguments['filePath'], 'wb') as f:
                        f.write(base64.b64decode(item['data']))
                    break
        return res

    def close(self):
        try:
            self.call_tool('close_firefox_session', {})
        except Exception:
            pass
        self.proc.terminate()

if __name__ == '__main__':
    # Test runner: URL, width, height, output_png
    url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8000/?v=47'
    w = int(sys.argv[2]) if len(sys.argv) > 2 else 1440
    h = int(sys.argv[3]) if len(sys.argv) > 3 else 900
    out = sys.argv[4] if len(sys.argv) > 4 else 'firefox_test.png'

    client = FirefoxMCPClient(headless=True)
    try:
        print(f"Setting viewport to {w}x{h}...")
        client.call_tool('set_viewport_size', {'width': w, 'height': h})
        print(f"Navigating to {url}...")
        client.call_tool('navigate_page', {'url': url})
        time.sleep(1.5)
        print(f"Taking screenshot to {out}...")
        res = client.call_tool('screenshot_page', {'filePath': out})
        print("Done:", res)
    finally:
        client.close()
