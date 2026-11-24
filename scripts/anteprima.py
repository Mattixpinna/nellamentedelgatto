#!/usr/bin/env python3
"""Anteprima locale del sito su http://localhost:8765

Come GitHub Pages, risponde a /chi-sono con chi-sono.html.
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


if __name__ == "__main__":
    handler = functools.partial(Handler, directory=str(PUBLIC))
    with ThreadingHTTPServer(("127.0.0.1", PORT), handler) as server:
        print(f"Anteprima del sito: http://localhost:{PORT}  (Ctrl+C per fermarla)")
        server.serve_forever()
