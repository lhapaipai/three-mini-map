from pathlib import Path
import argparse
import requests
import os
import errno

def download_file(url):
    suffix = url.split("/")[3:]
    local_filename = Path("export/" + "/".join(suffix))
    if not os.path.exists(os.path.dirname(local_filename)):
        try:
            os.makedirs(os.path.dirname(local_filename))
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise

    if os.path.exists(local_filename):
        print("{}: existant".format(local_filename))
    else:
        with requests.get(url, stream=True) as r:
            r.raise_for_status()
            with open(local_filename, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        return local_filename


def main():
    parser = argparse.ArgumentParser(description="Download Tiles")
    parser.add_argument("tiles_file", type=Path, help="Tiles file")
    args = parser.parse_args()

    with args.tiles_file.open("r", encoding="utf-8") as fdin:
        tiles = fdin.read().splitlines()
        for tile in tiles:
            download_file("https://c.tile.openstreetmap.org/{}.png".format(tile))

if __name__ == "__main__":
    main()
