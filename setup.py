from __future__ import unicode_literals

from setuptools import find_packages, setup


def get_version(filename):
    from re import findall

    with open(filename) as f:
        metadata = dict(findall('__([a-z]+)__ = "([^"]+)"', f.read()))
    return metadata["version"]


setup(
    name="Mopidy-Moser-Web",
    version=get_version("mopidy_moser_web/__init__.py"),
    url="https://github.com/moser/mopidy-moser-web",
    license="Apache License, Version 2.0",
    author="Martin Vielsmaier",
    description="Mopidy Web client extension for mobile devices",
    long_description=open("README.rst").read(),
    packages=find_packages(exclude=["tests", "tests.*"]),
    zip_safe=False,
    include_package_data=True,
    install_requires=["setuptools", "Mopidy >= 0.19"],
    entry_points={
        "mopidy.ext": [
            "moser-web = mopidy_moser_web:Extension",
        ],
    },
    classifiers=[
        "Environment :: Web Environment",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Topic :: Multimedia :: Sound/Audio :: Players",
    ],
)
