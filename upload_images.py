import json, pathlib, subprocess

repo = pathlib.Path(r"C:/Users/Thabang/magaetswale-app")
dist = repo / "dist"

dist_html = (dist / "index.html").read_text(encoding="utf-8")

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
        {"filename": "index.html", "content": dist_html},
        {"filename": "tests/tests.json", "content": tests_content},
    ]
}
manifest_str = json.dumps(manifest, ensure_ascii=False)
manifest_path = repo / "manifest7.json"
manifest_path.write_text(manifest_str, encoding="utf-8")

upload_url = "https://upload-v2.appdeploy.ai/uploads/e5e204a826fb853fffe6858cae968318d48cc656caa8c9c47b365b04d3f3b7cc.ffffea43b67071b94f7103e6"

# Build curl command with manifest (text files) + 4 binary images
cmd = [
    "curl", "-X", "PUT", upload_url,
    "-F", f"payload=@manifest7.json;type=application/json",
    "-F", f"logo.jpg=@{dist / 'logo.jpg'}",
    "-F", f"WhatsApp_Image_2026-09-14_at_16.13.57_6698b9.jpg=@{dist / 'WhatsApp_Image_2026-09-14_at_16.13.57_6698b9.jpg'}",
    "-F", f"WhatsApp_Image_2026-09-09_at_11.39.26_5f26e3.jpg=@{dist / 'WhatsApp_Image_2026-09-09_at_11.39.26_5f26e3.jpg'}",
    "-F", f"WhatsApp_Image_2026-09-10_at_08.25.28_26bb9c.jpg=@{dist / 'WhatsApp_Image_2026-09-10_at_08.25.28_26bb9c.jpg'}",
]
print("Command:", " ".join(cmd[:4]) + " ...")
result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
print("EXIT:", result.returncode)
print("STDOUT tail:", result.stdout[-300:] if result.stdout else "(none)")
print("STDERR tail:", result.stderr[-300:] if result.stderr else "(none)")
