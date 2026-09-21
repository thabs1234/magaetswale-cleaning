import pathlib, json

repo = pathlib.Path(r"C:/Users/Thabang/magaetswale-app")
dist = repo / "dist"
html = (dist / "index.html").read_text(encoding="utf-8")

# Take current snapshot BEFORE my changes so I can compute a clean diff later
snapshot_before = html

checks = {
    "line_count": html.count("\n"),
    "has_firebase": "firebase" in html.lower(),
    "has_payfast": "payfast" in html.lower(),
    "has_ozow": "ozow" in html.lower(),
    "has_yoco": "yoco" in html.lower(),
    "has_login": "sign-in" in html.lower() or "signin" in html.lower() or "login" in html.lower(),
    "has_profile": "profile" in html.lower(),
    "has_book_now": html.count("Book Now"),
    "has_cart": "cart" in html.lower(),
    "has_checkout": "checkout" in html.lower(),
}
print(json.dumps(checks, indent=2))
