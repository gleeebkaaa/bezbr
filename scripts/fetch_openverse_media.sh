#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CAT_DIR="$ROOT_DIR/public/media/catalog"
GAL_DIR="$ROOT_DIR/public/media/gallery-web"
CREDITS_FILE="$ROOT_DIR/public/media/media-credits.jsonl"

mkdir -p "$CAT_DIR" "$GAL_DIR"
: > "$CREDITS_FILE"

fetch_one() {
  local slug="$1"
  local query="$2"
  local kind="$3"
  local out_dir="$4"

  local api_url
  api_url="https://api.openverse.org/v1/images/?q=$(python3 - <<PY
import urllib.parse
print(urllib.parse.quote("""$query"""))
PY
)&license=by,by-sa,cc0,pdm&mature=false&page_size=20"

  local json
  json="$(curl -sS \
    -H 'accept: application/json' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X) Codex/1.0' \
    "$api_url")"

  local picked
  picked="$(printf '%s' "$json" | jq -c '
    (.results // [])
    | map(select((.url // "") | test("\\.(jpg|jpeg|png)($|\\?)"; "i")))
    | map(select((.title // "") | test("logo|icon|flag|map|symbol"; "i") | not))
    | first
  ' 2>/dev/null || printf 'null')"

  if [[ -z "$picked" || "$picked" == "null" ]]; then
    echo "MISS $kind $slug"
    return
  fi

  local image_url title provider creator license license_url foreign_landing
  image_url="$(printf '%s' "$picked" | jq -r '.url')"
  title="$(printf '%s' "$picked" | jq -r '.title // "Untitled"')"
  provider="$(printf '%s' "$picked" | jq -r '.provider // ""')"
  creator="$(printf '%s' "$picked" | jq -r '.creator // ""')"
  license="$(printf '%s' "$picked" | jq -r '.license // ""')"
  license_url="$(printf '%s' "$picked" | jq -r '.license_url // ""')"
  foreign_landing="$(printf '%s' "$picked" | jq -r '.foreign_landing_url // ""')"

  curl -sS -L \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X) Codex/1.0' \
    "$image_url" -o "$out_dir/$slug.jpg"

  jq -n \
    --arg type "$kind" \
    --arg slug "$slug" \
    --arg query "$query" \
    --arg title "$title" \
    --arg image_url "$image_url" \
    --arg provider "$provider" \
    --arg creator "$creator" \
    --arg license "$license" \
    --arg license_url "$license_url" \
    --arg foreign_landing_url "$foreign_landing" \
    '{
      type: $type,
      slug: $slug,
      query: $query,
      title: $title,
      image_url: $image_url,
      provider: $provider,
      creator: $creator,
      license: $license,
      license_url: $license_url,
      foreign_landing_url: $foreign_landing_url
    }' >> "$CREDITS_FILE"

  echo "OK $kind $slug -> $title"
  sleep 3
}

while IFS='|' read -r slug query; do
  fetch_one "$slug" "$query" "catalog" "$CAT_DIR"
done <<'EOF'
animals-flashcards|kids animal flashcards learning
food-flashcards|kids food cards learning
colors-shapes-flashcards|children colors shapes worksheet
bingo-animals|children bingo game learning
memory-game-house|children memory card game
board-game-adventure|kids board game classroom
alphabet-workbook|child alphabet writing worksheet
first-words-workbook|children english words worksheet
grammar-basics-workbook|english grammar worksheet for kids
coloring-alphabet|alphabet coloring page child
tracing-letters|letter tracing worksheet child
activity-pack-seasons|seasons worksheet kids
EOF

while IFS='|' read -r slug query; do
  fetch_one "$slug" "$query" "gallery" "$GAL_DIR"
done <<'EOF'
gallery-01|children english class
gallery-02|child writing workbook
gallery-03|kids reading books class
gallery-04|teacher with children classroom
gallery-05|children educational game table
gallery-06|kids studying together
EOF

jq -s '.' "$CREDITS_FILE" > "$ROOT_DIR/public/media/media-credits.json"
rm -f "$CREDITS_FILE"

echo "Saved media list to public/media/media-credits.json"
echo "Catalog files: $(find "$CAT_DIR" -type f | wc -l | tr -d ' ')"
echo "Gallery files: $(find "$GAL_DIR" -type f | wc -l | tr -d ' ')"
