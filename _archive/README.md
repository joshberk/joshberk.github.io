# Archive

Source and snapshot artifacts that are kept in the repository for reference but
are **not** published to the live site. The `_archive/` directory is excluded
from the Jekyll build (see `exclude:` in `_config.yml`), so nothing here is
served or linked from the site.

## Contents

- `cti-lab-homepage-snapshot.pdf` — a browser print-to-PDF snapshot of the site
  home page (a single tall page). Kept as a point-in-time capture of the home
  page design.
- `cti-lab-homepage-bundle.html` — a self-contained ("SingleFile") offline
  bundle of the home page, with all assets inlined. Kept as an offline capture.

These were previously loose, unreferenced files in the repository root. Moving
them here keeps them preserved without publishing ~1.7 MB of unlinked files on
every deploy.
