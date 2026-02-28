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
]

# Build new carousel slides
new_slides = '          <div class="carousel-container">\n'
for i, url in enumerate(cloudinary_urls):
    active = ' active' if i == 0 else ''
    new_slides += f'            <div class="carousel-slide{active}">\n'
    new_slides += f'              <img src="{url}" alt="DJ Gallery {i+1}" />\n'
    new_slides += f'              <div class="slide-caption">DJ Gallery {i+1}</div>\n'
    new_slides += '            </div>\n'
new_slides += '          </div>'

# Find and replace carousel-container section
pattern = r'<div class="carousel-container">.*?</div>\s*\n\s*</div>'
match = re.search(pattern, content, re.DOTALL)

if match:
    content = content[:match.start()] + new_slides + content[match.end():]
    with open("index.html", "w") as f:
        f.write(content)
    print("Success: Gallery updated with 16 Cloudinary images")
else:
    print("Error: Could not find carousel-container to replace")
