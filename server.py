#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os

PORT = 8081
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Serving directory: {DIRECTORY}")
    print(f"Open http://localhost:{PORT}/professional.html to view the professional version")
    webbrowser.open(f'http://localhost:{PORT}/professional.html')
    httpd.serve_forever()