#!/bin/bash
docker build -t tomasjef/backend-jefiwash --platform linux/amd64 .
docker push tomasjef/backend-jefiwash