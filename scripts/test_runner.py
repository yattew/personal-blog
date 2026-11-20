#!/usr/bin/env python3
import sys
import time
import os
import json
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from firefox_client import FirefoxMCPClient

BRAIN_DIR = "/Users/yattew/.gemini/antigravity-cli/brain/1253fd37-a817-4fb4-a7b8-2571480cbfb3"
BASE_URL = "http://localhost:8000/?v=59"

def run_firefox_tests():
    print("=== Launching Firefox MCP Client ===")
    client = FirefoxMCPClient(headless=True)
    try:
        # TEST 1: Desktop Landscape (1440x900) - Frame 01
        print("\n--- Test 1: Firefox Desktop Landscape (1440x900) Frame 01 ---")
        client.call_tool("set_viewport_size", {"width": 1440, "height": 900})
        client.call_tool("navigate_page", {"url": BASE_URL})
        time.sleep(1.2)
        
        f01_path = os.path.join(BRAIN_DIR, "firefox_desktop_f01.png")
        client.call_tool("screenshot_page", {"filePath": f01_path})
        print(f"Captured: {f01_path}")

        # Evaluate layout data in Firefox
        data_f01 = client.call_tool("evaluate_script", {
            "function": """() => {
                const canister = document.querySelector('.film-canister-unit')?.getBoundingClientRect();
                const snout = document.querySelector('.canister-snout')?.getBoundingClientRect();
                const label = document.querySelector('.canister-label');
                const badge = document.querySelector('.canister-speed-badge')?.getBoundingClientRect();
                const specs = document.querySelector('.canister-specs')?.getBoundingClientRect();
                const brand = document.querySelector('.canister-brand-vertical')?.innerText;
                const active = document.querySelector('.film-frame-exposure.active-frame')?.dataset.theme;
                return {
                    active,
                    brand: brand ? brand.replace(/\\n/g, ' ') : null,
                    canisterRight: canister ? canister.right : null,
                    snoutWidth: snout ? snout.width : null,
                    labelScrollWidth: label ? label.scrollWidth : null,
                    labelClientWidth: label ? label.clientWidth : null,
                    badgeRight: badge ? badge.right : null,
                    specsRight: specs ? specs.right : null
                };
            }"""
        })
        print("Firefox Frame 01 Data:", data_f01)

        # TEST 2: Advance to Frame 02 in Desktop Landscape
        print("\n--- Test 2: Firefox Desktop Landscape (1440x900) Frame 02 ---")
        client.call_tool("evaluate_script", {
            "function": "() => { document.getElementById('next-scene-btn')?.click(); }"
        })
        time.sleep(0.8)
        f02_path = os.path.join(BRAIN_DIR, "firefox_desktop_f02.png")
        client.call_tool("screenshot_page", {"filePath": f02_path})
        print(f"Captured: {f02_path}")

        # TEST 3: Advance to Frame 04 (Golden Gai Nights) in Desktop Landscape
        print("\n--- Test 3: Firefox Desktop Landscape (1440x900) Frame 04 ---")
        client.call_tool("evaluate_script", {
            "function": "() => { document.getElementById('next-scene-btn')?.click(); }"
        })
        time.sleep(0.4)
        client.call_tool("evaluate_script", {
            "function": "() => { document.getElementById('next-scene-btn')?.click(); }"
        })
        time.sleep(0.8)
        f04_path = os.path.join(BRAIN_DIR, "firefox_desktop_f04.png")
        client.call_tool("screenshot_page", {"filePath": f04_path})
        print(f"Captured: {f04_path}")

        # TEST 4: Mobile Portrait (393x852) - Frame 01 & Frame 02
        print("\n--- Test 4: Firefox Mobile Portrait (393x852) Frame 01 ---")
        client.call_tool("set_viewport_size", {"width": 393, "height": 852})
        client.call_tool("navigate_page", {"url": BASE_URL})
        time.sleep(1.2)
        mob_p01_path = os.path.join(BRAIN_DIR, "firefox_mobile_portrait_f01.png")
        client.call_tool("screenshot_page", {"filePath": mob_p01_path})
        print(f"Captured: {mob_p01_path}")

        client.call_tool("evaluate_script", {
            "function": "() => { document.getElementById('next-scene-btn')?.click(); }"
        })
        time.sleep(0.8)
        mob_p02_path = os.path.join(BRAIN_DIR, "firefox_mobile_portrait_f02.png")
        client.call_tool("screenshot_page", {"filePath": mob_p02_path})
        print(f"Captured: {mob_p02_path}")

        # TEST 5: Mobile Landscape (852x393) - Frame 01 & Frame 02
        print("\n--- Test 5: Firefox Mobile Landscape (852x393) Frame 01 ---")
        client.call_tool("set_viewport_size", {"width": 852, "height": 393})
        client.call_tool("navigate_page", {"url": BASE_URL})
        time.sleep(1.2)
        mob_l01_path = os.path.join(BRAIN_DIR, "firefox_mobile_landscape_f01.png")
        client.call_tool("screenshot_page", {"filePath": mob_l01_path})
        print(f"Captured: {mob_l01_path}")

        client.call_tool("evaluate_script", {
            "function": "() => { document.getElementById('next-scene-btn')?.click(); }"
        })
        time.sleep(0.8)
        mob_l02_path = os.path.join(BRAIN_DIR, "firefox_mobile_landscape_f02.png")
        client.call_tool("screenshot_page", {"filePath": mob_l02_path})
        print(f"Captured: {mob_l02_path}")

        print("\n=== All Firefox MCP Tests Completed Successfully! ===")
    finally:
        client.close()

if __name__ == "__main__":
    run_firefox_tests()
