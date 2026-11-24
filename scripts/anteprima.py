#!/usr/bin/env python3
"""Anteprima locale del sito su http://localhost:8765

Come GitHub Pages, risponde a /chi-sono con chi-sono.html e mostra 404.html
per gli indirizzi che non esistono.
"""
import functools
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PUBLIC = Path(__file__).resolve().parent.parent / "public"
PORT = 8765


class Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and os.path.isfile(path + ".html"):
            self.path = self.path.split("?", 1)[0].split("#", 1)[0] + ".html"
        return super().send_head()

    def send_error(self, code, message=None, explain=None):
        page = PUBLIC / "404.html"
        if code != 404 or not page.is_file():
            return super().send_error(code, message, explain)
        body = page.read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


if __name__ == "__main__":
    handler = functools.partial(Handler, directory=str(PUBLIC))
    with ThreadingHTTPServer(("127.0.0.1", PORT), handler) as server:
        print(f"Anteprima del sito: http://localhost:{PORT}  (Ctrl+C per fermarla)")
        server.serve_forever()
