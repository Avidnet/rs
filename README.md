# [Remote Sensing](https://en.wikipedia.org/wiki/Remote_sensing)
## Introduction
We want to use satellite images to improve agriculture productivity
by detecting the diseases and many more problems in crops before they get spread in the farm.

## Steps
1. Gathering raw images from the satellite.
2. Pre-Processing
3. Processing based on gathered data from the field and predefined models.

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

## Geonode with I1820
In order to setup Geonode to work with I1820 we must find a set of useful [APIs from Geonode](http://docs.geonode.org/en/master/reference/api.html) to call them from I1820 to get
remote sensing data.
