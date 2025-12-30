# Nuxt v4 + Sanity

A learning project for integrating Nuxt v4 with Sanity CMS.

## Install

```bash
# Install frontend dependencies
cd frontend && pnpm install

# Install studio dependencies
cd studio && pnpm install
```

Copy environment files:
```bash
cp frontend/.env.example frontend/.env
cp studio/.env.example studio/.env
```

Update `.env` files with your Sanity project credentials.

## Run

```bash
# Start Nuxt frontend (http://localhost:3000)
cd frontend && pnpm dev

# Start Sanity Studio (http://localhost:3333)
cd studio && pnpm dev
```

## Demo

Coming soon
