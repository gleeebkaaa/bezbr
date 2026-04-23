#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CAT_DIR="$ROOT_DIR/public/media/catalog"
GAL_DIR="$ROOT_DIR/public/media/gallery-web"
CREDITS_FILE="$ROOT_DIR/public/media/media-credits.jsonl"

mkdir -p "$CAT_DIR" "$GAL_DIR"
: > "$CREDITS_FILE"

API_BASE="https://commons.wikimedia.org/w/api.php"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X) CodexWikimediaFetcher/1.0"

fetch_one() {
  local slug="$1"
  local query="$2"
  local kind="$3"
  local out_dir="$4"

  local api_url
  api_url="${API_BASE}?action=query&generator=search&gsrsearch=$(python3 - <<PY
import urllib.parse
print(urllib.parse.quote("""$query"""))
PY
)&gsrnamespace=6&gsrlimit=40&prop=imageinfo&iiprop=url&format=json"

  local json
  json="$(curl -sS -H "user-agent: $UA" "$api_url")"

  local picked
  picked="$(printf '%s' "$json" | jq -c '
    (.query.pages // {})
    | to_entries
    | map(.value)
    | map({
        title: .title,
        index: (.index // 9999),
        image_url: ((.imageinfo // [])[0].url // "")
      })
    | map(select(.image_url | test("\\.(jpg|jpeg|png)($|\\?)"; "i")))
    | map(select((.title // "") | test("logo|icon|flag|map|symbol|coat of arms|traffic sign"; "i") | not))
    | sort_by(.index)
    | first
  ')"

  if [[ -z "$picked" || "$picked" == "null" ]]; then
    echo "MISS $kind $slug"
    return
  fi

  local title image_url wiki_url
  title="$(printf '%s' "$picked" | jq -r '.title')"
  image_url="$(printf '%s' "$picked" | jq -r '.image_url')"
  wiki_url="https://commons.wikimedia.org/wiki/${title// /_}"

  curl -sS -L -H "user-agent: $UA" "$image_url" -o "$out_dir/$slug.jpg"

  jq -n \
    --arg type "$kind" \
    --arg slug "$slug" \
    --arg query "$query" \
    --arg title "$title" \
    --arg image_url "$image_url" \
    --arg page_url "$wiki_url" \
    --arg license "Wikimedia Commons (see file page)" \
    '{
      type: $type,
      slug: $slug,
      query: $query,
      title: $title,
      image_url: $image_url,
      page_url: $page_url,
      license: $license
    }' >> "$CREDITS_FILE"

  echo "OK $kind $slug -> $title"
  sleep 1
}

while IFS='|' read -r slug query; do
  fetch_one "$slug" "$query" "catalog" "$CAT_DIR"
done <<'EOF'
animals-flashcards|kids learning flashcards classroom
food-flashcards|children food flashcards school
colors-shapes-flashcards|children shapes worksheet class
bingo-animals|children bingo game school
memory-game-house|children memory game cards
board-game-adventure|children board game classroom
alphabet-workbook|alphabet worksheet child writing
first-words-workbook|children vocabulary worksheet english
grammar-basics-workbook|english worksheet children classroom
coloring-alphabet|alphabet coloring worksheet
tracing-letters|letter tracing worksheet children
activity-pack-seasons|seasons worksheet children school
EOF

while IFS='|' read -r slug query; do
  fetch_one "$slug" "$query" "gallery" "$GAL_DIR"
done <<'EOF'
gallery-01|children classroom learning
gallery-02|child writing worksheet classroom
gallery-03|children reading books classroom
gallery-04|teacher with children class
gallery-05|kids educational table game
gallery-06|children studying together classroom
EOF

jq -s '.' "$CREDITS_FILE" > "$ROOT_DIR/public/media/media-credits.json"
rm -f "$CREDITS_FILE"

echo "Saved media list to public/media/media-credits.json"
echo "Catalog files: $(find "$CAT_DIR" -type f | wc -l | tr -d ' ')"
echo "Gallery files: $(find "$GAL_DIR" -type f | wc -l | tr -d ' ')"
