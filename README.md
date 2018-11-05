# [Remote Sensing](https://en.wikipedia.org/wiki/Remote_sensing)
## Introduction
We want to use satellite images to improve agriculture productivity
by detecting the diseases and many more problems in crops before they get spread in the farm.

## Steps
1. Gathering raw images from the satellite.
2. Pre-Processing (SNAP)
    1. Atmospheric Correction (Send2Cor)
    2. Geometeric Correction
    3. Resample (20 -> 10)
3. Processing based on gathered data from the field and predefined models.
    1. Shakhes (!) based on calculation of bands
    2. Corelation between parameter and Shakhes based on formula that is caculated from eghlim.
    3. parameters can be LAI, Biomass, Production
4. 

## VM
Avidnet VM that has an instance of the Geonode has the following configuration and features.
(Just for Avidnet team information)

- CPU Cores: 2
- RAM: 6GB
- HDD: 150GB
- OS: Ubuntu 16.04 LTS
- Hostname: avidnet-geonode
- IP Address: 192.168.73.20
- root: parham

Geonode instance in this VM has a user with `1995parham` username and default `admin:admin` is avaiable on `/en/admin/`.

## Geonode Configuration
File `/etc/geonode/local_settings.py`:

- `GEOSERVER_LOCATION = 'http://192.168.73.20:8080/geosever/'`
- `MAPBOX_ACCESS_TOKEN = <secret>`


## Geonode with I1820
In order to setup Geonode to work with I1820 we must find a set of useful [APIs from Geonode](http://docs.geonode.org/en/master/reference/api.html) to call them from I1820 to get
remote sensing data.

## Future of Geonode
Avidnet desicdes on 3 Nov 2018 to implement an instance of Geonode in I1820 but based on APIs that are provided by GeoServer.
By this way we can extend it easily when the GeoServer version changes.
