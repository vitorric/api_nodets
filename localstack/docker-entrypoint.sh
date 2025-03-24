#!/bin/bash

# Create bucket S3
aws --endpoint-url=http://127.0.0.1:4566 s3api create-bucket --bucket ps_private

aws --endpoint-url=http://127.0.0.1:4566 s3api create-bucket --bucket ps_public

echo 'Localstack configurado.'