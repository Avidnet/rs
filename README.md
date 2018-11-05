# [Remote Sensing](https://en.wikipedia.org/wiki/Remote_sensing)
## Introduction
We want to use satellite images to improve agriculture productivity
by detecting the diseases and many more problems in crops before they get spread in the farm.

## Steps
1. Gathering raw images from the satellite.
2. Pre-Processing [SNAP](http://step.esa.int/main/toolboxes/snap/)
    1. [Atmospheric Correction](https://en.wikipedia.org/wiki/Atmospheric_correction) [Sen2Cor](http://step.esa.int/main/third-party-plugins-2/sen2cor/)
    2. [Geometric Correction](https://en.wikipedia.org/wiki/Image_geometry_correction)
    3. Resample with an equal spatial resolution for all bands. (10m, 20m and 60m)
3. Processing based on gathered data from the field and predefined models.
    1. Calculate indicators based on spectral bands.
    2. Correlate between needed parameters and indicators based on the formula that is calculated from the climate.
    3. Needed parameters can be LAI, Biomass, and Production.
    4. Air humidity, Air temperature, Vegetation, Temperature satellite image, and Height satellite image are the basis for evapotranspiration diagram.
    5. Based on evapotranspiration diagram and input water volume we can have water needs diagram.

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
