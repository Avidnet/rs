# [Remote Sensing](https://en.wikipedia.org/wiki/Remote_sensing)
[![Travis branch](https://img.shields.io/travis/com/Avidnet/rs/master.svg?style=flat-square)](https://travis-ci.com/Avidnet/rs)

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
To handle the satellite images in I1820, Avidnet implements a component named `rs`.
This component uses [geotiff.js](https://github.com/geotiffjs/geotiff.js)
and parses given GeoTIFF image and stores its meta-data including date, location (latitude and longitude) and values into
Database. `rs` provides APIs for retrieving these data based on given polygon and more.

Avidnet confirms `rs` implementation on 5 Nov 2018 meeting.
