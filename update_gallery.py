import re

# Read the file
with open("index.html", "r") as f:
    content = f.read()

# Cloudinary URLs
cloudinary_urls = [
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1770778598/professionals/pnkijojtj5cqmjg1hhx5.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1770599722/professionals/jnzcegnloipsjvqvzua0.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1770598272/professionals/ewpj8xx2g3nxpmelfv6k.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769958322/professionals/loo1peqzthzcw5s4wx6n.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957563/professionals/lhivocwja1wdfemdzxx8.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957565/professionals/cf5x15x5fagcwiuioan0.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957562/professionals/exwjf6o89oy27kmcy9hx.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957559/professionals/tfbpfgqlba2bpvq0d2o2.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957559/professionals/l1fx1apoo0lygzg1kox1.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957557/professionals/j3ffeinzxwbd1jcgrtmz.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957507/professionals/e5cg3kp3kibd8a4oyig6.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769957556/professionals/v9viqj3rmf2hgqzhdnsy.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942785/professionals/nbhi0kpwxnwc5xcdikiy.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942609/pulpl0acyxhjdbvpfjs9.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769942604/rz5l8z3wm1pwzj6fwh7p.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1769914872/professionals/y7tlq0vjuxttjcxudbzg.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295795/Screenshot_20260125_191015_CapCut_gpoocd.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295793/Screenshot_20260107_223346_CapCut_ybghdx.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295796/Snapchat-437494782_rkm8t9.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295788/lv_7593092234371714309_20260126141903_2_ku4gwq.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295789/lv_7593976942165282053_20260122230059_1_y8yjp4.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295784/lv_7579954644743458053_20260207233213_1_sytill.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772290969/zc6yyqluuwrldek3vw61.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772295791/Screenshot_20260106_231435_CapCut_n9iacd.jpg",
    "https://res.cloudinary.com/dkd3k6eau/image/upload/v1772233915/WhatsApp_Image_2026-02-28_at_00.07.36_dugcoy.jpg",
]

# ── Build carousel slides ──────────────────────────────────────────────────────
new_slides = '          <div class="carousel-container">\n'
for i, url in enumerate(cloudinary_urls):
    active = ' active' if i == 0 else ''
    new_slides += f'            <div class="carousel-slide{active}">\n'
    new_slides += f'              <img src="{url}" alt="DJ Gallery {i+1}" />\n'
    new_slides += f'              <div class="slide-caption">DJ Gallery {i+1}</div>\n'
    new_slides += '            </div>\n'
new_slides += '          </div>'

# ── Build indicators ──────────────────────────────────────────────────────────
num = len(cloudinary_urls)
indicators_html = '                        <div class="carousel-indicators">\n'
indicators_html += '              <span class="indicator active" onclick="currentSlide(1)"></span>\n'
for i in range(2, num + 1):
    indicators_html += f'              <span class="indicator" onclick="currentSlide({i})"></span>\n'
indicators_html += '            </div>'

# ── Replace carousel-container (unique split — no regex depth issues) ─────────
START = '<div class="carousel-container">'
END_AFTER = '        </div>\n          <div class="carousel-controls">'

start_idx = content.find(START)
if start_idx == -1:
    print("Error: Could not find carousel-container")
    exit(1)

# Find everything after the START block by locating the END_AFTER anchor
end_idx = content.find(END_AFTER, start_idx)
if end_idx == -1:
    print("Error: Could not find carousel-controls anchor")
    exit(1)

content = content[:start_idx] + new_slides + '\n' + content[end_idx:]

# ── Replace indicators ────────────────────────────────────────────────────────
ind_pattern = r'[ \t]*<div class="carousel-indicators">.*?</div>'
content = re.sub(ind_pattern, indicators_html, content, flags=re.DOTALL)

with open("index.html", "w") as f:
    f.write(content)
print(f"✓ Gallery updated with {len(cloudinary_urls)} images and {num} indicators")
