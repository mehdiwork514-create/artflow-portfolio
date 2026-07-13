"""Remove white wall; preserve wooden frame; export clean oval PNG."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "wood" / "moarrag-original.png"
OUT = ROOT / "public" / "wood" / "moarrag-artwork.png"

FRAME_CX = 434.0
FRAME_CY = 517.0
FRAME_RX = 424.0
FRAME_RY = 519.0


def frame_distance(x: int, y: int) -> float:
    return ((x - FRAME_CX) / FRAME_RX) ** 2 + ((y - FRAME_CY) / FRAME_RY) ** 2


def is_dark_wood(r: int, g: int, b: int) -> bool:
    return r < 115 and g < 90 and b < 65


def is_wall_like(r: int, g: int, b: int) -> bool:
    if is_dark_wood(r, g, b):
        return False
    neutral = max(r, g, b) - min(r, g, b) < 52
    return r > 165 and g > 155 and b > 145 and neutral


def build_wall_mask(img: Image.Image) -> set[tuple[int, int]]:
    w, h = img.size
    pixels = img.load()
    wall: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque()
    visited: set[tuple[int, int]] = set()

    def try_seed(x: int, y: int) -> None:
        if (x, y) in visited:
            return
        r, g, b = pixels[x, y][:3]
        if is_wall_like(r, g, b):
            visited.add((x, y))
            wall.add((x, y))
            queue.append((x, y))

    margin = 8
    for x in range(w):
        for y in list(range(margin)) + list(range(h - margin, h)):
            try_seed(x, y)
    for y in range(h):
        for x in list(range(margin)) + list(range(w - margin, w)):
            try_seed(x, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h or (nx, ny) in visited:
                continue
            r, g, b = pixels[nx, ny][:3]
            if is_dark_wood(r, g, b):
                continue
            if is_wall_like(r, g, b):
                visited.add((nx, ny))
                wall.add((nx, ny))
                queue.append((nx, ny))

    return wall


def keep_largest_component(img: Image.Image) -> int:
    w, h = img.size
    pixels = img.load()
    visited: set[tuple[int, int]] = set()
    components: list[list[tuple[int, int]]] = []

    for y in range(h):
        for x in range(w):
            if pixels[x, y][3] == 0 or (x, y) in visited:
                continue
            comp: list[tuple[int, int]] = []
            queue: deque[tuple[int, int]] = deque([(x, y)])
            visited.add((x, y))
            while queue:
                cx, cy = queue.popleft()
                comp.append((cx, cy))
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if nx < 0 or ny < 0 or nx >= w or ny >= h:
                        continue
                    if (nx, ny) in visited or pixels[nx, ny][3] == 0:
                        continue
                    visited.add((nx, ny))
                    queue.append((nx, ny))
            components.append(comp)

    if len(components) <= 1:
        return 0

    components.sort(key=len, reverse=True)
    removed = 0
    for comp in components[1:]:
        for x, y in comp:
            pixels[x, y] = (0, 0, 0, 0)
            removed += 1
    return removed


def apply_oval_mask(img: Image.Image) -> int:
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(
        (FRAME_CX - FRAME_RX, FRAME_CY - FRAME_RY, FRAME_CX + FRAME_RX, FRAME_CY + FRAME_RY),
        fill=255,
    )
    mask = mask.filter(ImageFilter.GaussianBlur(radius=0.8))

    pixels = img.load()
    mask_px = mask.load()
    changed = 0

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            m = mask_px[x, y]
            if m <= 1 or frame_distance(x, y) > 1.02:
                if a > 0:
                    pixels[x, y] = (0, 0, 0, 0)
                    changed += 1
                continue
            if m >= 250:
                continue
            na = int(a * m / 255)
            pixels[x, y] = (r, g, b, na)
            changed += 1

    return changed


def clean_transparent_rgb(img: Image.Image) -> int:
    """Prevent white fringe when browser scales PNG (zero RGB where alpha is zero)."""
    pixels = img.load()
    cleaned = 0
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            if a < 8 and (r > 0 or g > 0 or b > 0):
                pixels[x, y] = (0, 0, 0, 0)
                cleaned += 1
    return cleaned


def main() -> None:
    if not SRC.exists():
        raise FileNotFoundError(f"Original artwork not found: {SRC}")

    img = Image.open(SRC).convert("RGBA")
    pixels = img.load()
    wall = build_wall_mask(img)

    for y in range(img.height):
        for x in range(img.width):
            if (x, y) in wall:
                pixels[x, y] = (0, 0, 0, 0)

    islands = keep_largest_component(img)
    masked = apply_oval_mask(img)
    cleaned = clean_transparent_rgb(img)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, optimize=True)
    print(f"Wall pixels removed: {len(wall)}")
    print(f"Stray islands removed: {islands}")
    print(f"Oval mask applied: {masked}")
    print(f"Transparent RGB cleaned: {cleaned}")
    print(f"Saved {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
