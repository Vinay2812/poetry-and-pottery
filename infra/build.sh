#!/bin/bash
set -e

echo "Building poetry-and-pottery-client..."
# Load environment variables from .env.docker
set -a
source .env.docker
set +a

# Build uses host.docker.internal to access host services (Mac/Windows)
# Runtime uses Docker network with container names
docker build -t poetry-and-pottery-client \
  --add-host=host.docker.internal:host-gateway \
  --build-arg NEXT_PUBLIC_API_ENDPOINT="http://host.docker.internal:5050" \
  --build-arg NEXT_PUBLIC_DOMAIN="${NEXT_PUBLIC_DOMAIN}" \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}" \
  --build-arg NEXT_PUBLIC_MOBILE_NUMBER="${NEXT_PUBLIC_MOBILE_NUMBER}" \
  --build-arg NEXT_PUBLIC_DATA_SOURCE="${NEXT_PUBLIC_DATA_SOURCE}" \
  --build-arg DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@host.docker.internal:5435/poetry-and-pottery" \
  -f ./infra/Dockerfile .

echo ""
echo "Build complete!"
echo ""
echo "Run with:"
echo "  docker run -p 3005:3000 --add-host=host.docker.internal:host-gateway --env-file .env.docker poetry-and-pottery-client"
