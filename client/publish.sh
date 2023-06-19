#!/bin/bash

docker build -t tomasjef/frontend-jefiwash --platform linux/amd64 .
docker push tomasjef/frontend-jefiwash