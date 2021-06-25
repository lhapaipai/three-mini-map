from pathlib import Path
import argparse
import requests
import os
import errno

export_dir = "../public/tiles"

def download_file(url, export_path):
    suffix = url.split("/")[3:]
    local_filename = Path("{}/{}".format(export_dir, export_path))
    if not os.path.exists(os.path.dirname(local_filename)):
        try:
            os.makedirs(os.path.dirname(local_filename))
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise

    if os.path.exists(local_filename):
        print("{}: existant".format(local_filename))
    else:
        print("{}".format(local_filename))
        with requests.get(url, stream=True) as r:
            r.raise_for_status()
            with open(local_filename, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        return local_filename


def main():
    parser = argparse.ArgumentParser(description="Download Tiles")
    parser.add_argument("tiles_file", type=Path, help="Tiles file one z/x/y per line")
    parser.add_argument("template", help="template to forge url")
    args = parser.parse_args()

    if args.template == 'osm':
        url = "https://c.tile.openstreetmap.org/{0}/{1}/{2}.png"
        export_path = "osm/{0}/{1}/{2}.png"
    elif args.template == 'terrarium':
        url = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{0}/{1}/{2}.png"
        export_path = "terrarium/{0}/{1}/{2}.png"
    elif args.template == 'swiss25':
        url = "https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-pk25.noscale/default/current/3857/{0}/{1}/{2}.jpeg"
        export_path = "swiss-25/{0}/{1}/{2}.jpeg"
    elif args.template == 'swissSatellite':
        url = "https://wmts5.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{0}/{1}/{2}.jpeg"
        export_path = "swiss-satellite/{0}/{1}/{2}.jpeg"
    elif args.template == 'ign25':
        url = "https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix={0}&TileCol={1}&TileRow={2}"
        export_path = "ign-25/{0}/{1}/{2}.jpg"
    elif args.template == 'ignsatellite':
        url = "https://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/wmts?layer=ORTHOIMAGERY.ORTHOPHOTOS&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix={0}&TileCol={1}&TileRow={2}"
        export_path = "ign-satellite/{0}/{1}/{2}.jpg"
    else:
        parser.error("template undefined")

    with args.tiles_file.open("r", encoding="utf-8") as fdin:
        lines = fdin.read().splitlines()
        for line in lines:
            infos = line.split("/")
            # print(url.format(*infos))
            # print(export_path.format(*infos))
            download_file(url.format(*infos), export_path.format(*infos))

if __name__ == "__main__":
    main()
