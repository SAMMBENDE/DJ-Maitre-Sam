import re

# Read the file
with open("index.html", "r") as f:
    content = f.read()

# Find the entire gallery-container div
match = re.search(r'(<div\s+id="playlist-gallery"[^>]*>.*?)</div>\s*\n\s*<div class="carousel-controls">', content, re.DOTALL)

if match:
    before = content[:match.start(1)]
    after_match = content[match.end(0):]
    
    # Build the new gallery structure with only Cloudinary images
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
    ]
    
    new_gallery = '''<div
          id="playlist-gallery"
          class="gallery-container category-list"
          style="display: none"
        >
                    <div class="carousel-container">
'''
    for i, url in enumerate(cloudinary_urls):
        active = ' active' if i == 0 else ''
        new_gallery += f'''            <div class="carousel-slide{active}">
              <img src="{url}" alt="DJ Gallery {i+1}" />
              <div class="slide-caption">DJ Gallery {i+1}</div>
            </div>
'''
    new_gallery += '''          </div>
        </div>
          <div class="carousel-controls">'''
    
    # Reconstruct the file
    new_content = before + new_gallery + after_match
    
    with open("index.html", "w") as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("PATTERN_NOT_FOUND")
