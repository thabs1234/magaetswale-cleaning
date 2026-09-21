import pathlib, json

repo = pathlib.Path(r"C:/Users/Thabang/magaetswale-app")
dist = repo / "dist"
html = (dist / "index.html").read_text(encoding="utf-8")

tests = [
    {
        "name": "index loads",
        "description": "The homepage loads and renders the Magaetswale cleaning site",
        "expected": "HTTP 200 with hero section, services, and testimonials visible",
        "covers": ["homepage", "hero", "testimonials"],
        "steps": ["Navigate to /", "Wait for page load", "Verify hero section is visible"],
        "viewport": "desktop",
    },
    {
        "name": "services section present",
        "description": "Services section shows cleaning service cards",
        "expected": "3 service cards visible (Couch, Carpet, Interior)",
        "covers": ["services"],
        "steps": ["Navigate to /", "Scroll to services section", "Count service cards"],
        "viewport": "desktop",
    },
    {
        "name": "testimonials render",
        "description": "Testimonial cards render from testimonials data",
        "expected": "3 testimonial cards with author names and star ratings",
        "covers": ["testimonials"],
        "steps": ["Navigate to /", "Scroll to What Clients Say section", "Verify testimonial cards"],
        "viewport": "desktop",
    },
]
tests_content = json.dumps(tests, ensure_ascii=False)
manifest = {
    "files": [
        {"filename": "index.html", "content": html},
        {"filename": "tests/tests.json", "content": tests_content},
    ]
}
manifest_str = json.dumps(manifest, ensure_ascii=False)
manifest_path = repo / "manifest_deploy.py.json"
manifest_path.write_text(manifest_str, encoding="utf-8")
print("Wrote", manifest_path, len(manifest_str), "bytes")
