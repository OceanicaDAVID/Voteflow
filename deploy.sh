#!/bin/bash

# VoteFlow Deployment Script for Debian 12/13
# Usage: chmod +x deploy.sh && ./deploy.sh

set -e # Exit on error

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting VoteFlow Deployment...${NC}"

# 1. System Update
echo -e "${GREEN}Updating System Packages...${NC}"
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip

# 2. Install Docker & Docker Compose (if not present)
if ! command -v docker &> /dev/null; then
    echo -e "${GREEN}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
fi

# 3. Setup Project
APP_DIR="/opt/voteflow"

if [ -d "$APP_DIR" ]; then
    echo -e "${GREEN}Project directory exists. Pulling latest changes...${NC}"
    cd "$APP_DIR"
    git pull origin main
else
    echo -e "${GREEN}Cloning repository...${NC}"
    # Replace with your actual repository URL
    sudo git clone https://github.com/YOUR_GITHUB_USERNAME/voteflow.git "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Environment Configuration
if [ ! -f .env ]; then
    echo -e "${GREEN}Creating .env file...${NC}"
    cp .env.example .env
    echo "⚠️  PLEASE EDIT .env FILE WITH YOUR REAL CREDENTIALS BEFORE CONTINUING!"
    echo "Nano is opening..."
    read -p "Press Enter to continue"
    nano .env
fi

# 5. Build and Launch
echo -e "${GREEN}Building Docker Containers...${NC}"
# Assuming docker-compose.yml exists in root
sudo docker compose up -d --build

echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "Your app should be running at http://YOUR_SERVER_IP or https://voteflow.app"





