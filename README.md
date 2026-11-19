# gta6-meme-x-01

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun)
[![Node](https://img.shields.io/badge/node-%3E%3D22-green)](https://nodejs.org)

Entry for the make.fun bounty **gta6-meme-x-01** — "Post a GTA 6 meme on X".

The meme is a Leonida Airlines boarding pass joking about waiting 13 years
for GTA 6, posted on X from [@riotonchain](https://x.com/riotonchain/status/2123468683502915669).

## How it works

The entry program does one thing: it copies `POST.json` (which holds the
URL of the live X post) from the repository root to `/output/POST.json`,
where the make.fun gate reads it. The house then reads the post from X —
its first picture and its text — and hands that to the judge.

## Run

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`MAKEFUN_BOT_DIR` defaults to `/bot` and `MAKEFUN_OUTPUT_DIR` to `/output`.
Node 22+, standard library only, no network access.

## License

MIT — see [LICENSE](LICENSE).
