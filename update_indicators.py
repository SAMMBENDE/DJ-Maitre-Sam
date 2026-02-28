import re

with open("index.html", "r") as f:
    content = f.read()

# Build new indicators (16 only)
new_indicators = '            <div class="carousel-indicators">\n'
for i in range(1, 17):
    active = ' active' if i == 1 else ''
    new_indicators += f'              <span class="indicator{active}" onclick="currentSlide({i})"></span>\n'
new_indicators += '            </div>'

# Replace the entire indicators section
pattern = r'<div class="carousel-indicators">.*?</div>'
match = re.search(pattern, content, re.DOTALL)

if match:
    content = content[:match.start()] + new_indicators + content[match.end():]
    with open("index.html", "w") as f:
        f.write(content)
    print("INDICATORS_UPDATED")
else:
    print("PATTERN_NOT_FOUND")
