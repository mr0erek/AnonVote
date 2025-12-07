# 🗳️ AnonVote - Anonymous Voting System - v1.0

<div align="center">
  

![AnonVote](https://github.com/mr0erek/AnonVote/raw/main/assets/demo.gif)

![AnonVote Logo](https://img.shields.io/badge/AnonVote-Secure%20Voting-blue?style=for-the-badge&logo=checkmarx)

[![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)](https://www.mysql.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A secure, anonymous, and modern voting platform with end-to-end encryption**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Docs](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
  - [Windows](#-windows-installation)
  - [Linux (Ubuntu/Debian)](#-linux-ubuntudebian-installation)
  - [macOS](#-macos-installation)
  - [Docker](#-docker-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

**AnonVote** is a universal, template-based voting system API that allows seamless integration with any third-party authentication system. It provides a secure, anonymous polling platform where users can vote on various topics while maintaining complete privacy.

### Why AnonVote?

- 🔐 **Anonymous by Design**: User identities are encrypted and votes are double-hashed
- 🔌 **Universal Integration**: Easy API integration with any existing authentication system
- 📊 **Real-time Results**: Live vote counting with dynamic updates
- 🎨 **Modern UI**: Beautiful, responsive interface with dark/light mode
- ⚡ **High Performance**: Optimized database queries and caching
- 🛡️ **Enterprise Security**: Laravel Sanctum authentication with encrypted data storage

---

## ✨ Features

### Core Features
- ✅ Anonymous voting with encrypted user identities
- ✅ Flexible vote types: Upvote only, Downvote only, or Both
- ✅ Real-time vote counting and live results
- ✅ User-defined display names for anonymity
- ✅ Create unlimited polls with custom settings
- ✅ Vote modification (change or remove votes)
- ✅ Responsive design for all devices

### Security Features
- 🔒 End-to-end encryption for user data
- 🔒 Double-hashed anonymous vote tracking
- 🔒 Laravel Sanctum API token authentication
- 🔒 CSRF protection
- 🔒 SQL injection prevention
- 🔒 XSS attack protection

### UI/UX Features
- 🎨 Modern, clean interface
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🔔 Real-time notifications
- 📊 Visual percentage bars for results

### Developer Features
- 🔧 RESTful API architecture
- 🔧 Database agnostic (MySQL, PostgreSQL, SQLite)
- 🔧 Easy third-party integration
- 🔧 Comprehensive API documentation
- 🔧 Docker support
- 🔧 Environment-based configuration

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 10.x
- **Language**: PHP 8.2+
- **Authentication**: Laravel Sanctum
- **Database**: MySQL 8.0+ / PostgreSQL / SQLite
- **Cache**: Redis (optional)

### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx / Apache
- **SSL**: Let's Encrypt
- **CI/CD**: GitHub Actions (optional)

---

## 💻 System Requirements

### Minimum Requirements

| Component | Version |
|-----------|---------|
| PHP | 8.2 or higher |
| MySQL | 8.0 or higher |
| Node.js | 18.x or higher |
| Composer | 2.x |
| NPM/Yarn | Latest |
| Memory | 2GB RAM |
| Storage | 1GB free space |

### Recommended Requirements

| Component | Version |
|-----------|---------|
| PHP | 8.3+ |
| MySQL | 8.0+ |
| Node.js | 20.x LTS |
| Memory | 4GB RAM |
| Storage | 5GB free space |

---

## 📦 Installation

### 🪟 Windows Installation

#### Prerequisites

1. **Install XAMPP or Laragon**
   - Download [XAMPP](https://www.apachefriends.org/) or [Laragon](https://laragon.org/)
   - Install with MySQL and PHP 8.2+

2. **Install Composer**
   ```powershell
   # Download from https://getcomposer.org/Composer-Setup.exe
   # Run installer and follow instructions
   ```

3. **Install Node.js**
   ```powershell
   # Download from https://nodejs.org/
   # Install LTS version
   ```

4. **Verify Installations**
   ```powershell
   php --version
   composer --version
   node --version
   npm --version
   mysql --version
   ```

#### Backend Setup

```powershell
# Clone the repository
git clone https://github.com/mr0erek/anonvote.git
cd anonvote

# Navigate to backend
cd v1/backend

# Install dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=anonvote
# DB_USERNAME=root
# DB_PASSWORD=

# Create database
# Open MySQL in XAMPP/Laragon control panel
# Create database named 'anonvote'

# Run migrations
php artisan migrate

# Install Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

# Start server
php artisan serve
# Backend running at http://localhost:8000
```

#### Frontend Setup

```powershell
# Open new terminal
cd anonvote/v1/frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend running at http://localhost:3000
```

---

### 🐧 Linux (Ubuntu/Debian) Installation

#### Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP and extensions
sudo apt install php8.2 php8.2-cli php8.2-fpm php8.2-mysql \
php8.2-xml php8.2-curl php8.2-mbstring php8.2-zip \
php8.2-bcmath php8.2-tokenizer php8.2-gd -y

# Install MySQL
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL
sudo mysql_secure_installation

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

# Install Node.js (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Install Git
sudo apt install git -y

# Verify installations
php --version
composer --version
node --version
npm --version
mysql --version
```

#### Backend Setup

```bash
# Clone repository
git clone https://github.com/mr0erek/anonvote.git
cd anonvote/v1/backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create database
sudo mysql -u root -p
```

```sql
CREATE DATABASE anonvote CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'anonvote_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON anonvote.* TO 'anonvote_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
# Edit .env file
nano .env
# Update database credentials:
# DB_DATABASE=anonvote
# DB_USERNAME=anonvote_user
# DB_PASSWORD=your_secure_password

# Run migrations
php artisan migrate

# Install Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

# Set permissions
sudo chown -R $USER:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Start server
php artisan serve
# Backend running at http://localhost:8000
```

#### Frontend Setup

```bash
# Open new terminal
cd anonvote/v1/frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend running at http://localhost:3000
```

---

### 🍎 macOS Installation

#### Prerequisites

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP
brew install php@8.2

# Install MySQL
brew install mysql
brew services start mysql

# Secure MySQL
mysql_secure_installation

# Install Composer
brew install composer

# Install Node.js
brew install node@20

# Verify installations
php --version
composer --version
node --version
npm --version
mysql --version
```

#### Backend Setup

```bash
# Clone repository
git clone https://github.com/mr0erek/anonvote.git
cd anonvote/v1/backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create database
mysql -u root -p
```

```sql
CREATE DATABASE anonvote CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'anonvote_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON anonvote.* TO 'anonvote_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
# Edit .env file
nano .env
# Update database credentials

# Run migrations
php artisan migrate

# Install Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

# Start server
php artisan serve
```

#### Frontend Setup

```bash
# Open new terminal
cd anonvote/v1/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

### 🐳 Docker Installation

#### Prerequisites
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose

#### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/anonvote.git
cd anonvote

# Copy environment file
cp .env.example .env

# Build and start containers
docker-compose up -d

# Run migrations
docker-compose exec backend php artisan migrate

# Access application
# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# MySQL: localhost:3306
```

#### Docker Compose Configuration

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # MySQL Database
  mysql:
    image: mysql:8.0
    container_name: anonvote-mysql
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: anonvote
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_USER: anonvote_user
      MYSQL_PASSWORD: secure_password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - anonvote-network

  # Laravel Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: anonvote-backend
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./backend:/var/www
    ports:
      - "8000:8000"
    depends_on:
      - mysql
    environment:
      DB_HOST: mysql
      DB_DATABASE: anonvote
      DB_USERNAME: anonvote_user
      DB_PASSWORD: secure_password
    networks:
      - anonvote-network
    command: php artisan serve --host=0.0.0.0 --port=8000

  # React Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: anonvote-frontend
    restart: unless-stopped
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - anonvote-network
    command: npm run dev

volumes:
  mysql_data:

networks:
  anonvote-network:
    driver: bridge
```

#### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Install dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
```

#### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

---

## ⚙️ Configuration

### Backend Configuration

Edit `backend/.env`:

```env
# Application
APP_NAME=AnonVote
APP_ENV=local
APP_KEY=base64:generated_key_here
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=anonvote
DB_USERNAME=anonvote_user
DB_PASSWORD=your_secure_password

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000

# Session
SESSION_DRIVER=database
SESSION_LIFETIME=120

# Cache
CACHE_DRIVER=file
QUEUE_CONNECTION=database

# Mail (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
```

### Frontend Configuration

Edit `frontend/src/App.jsx` or create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=AnonVote
```

Update in `frontend/src/App.jsx`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
```

### CORS Configuration

Edit `backend/config/cors.php`:

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://yourdomain.com' // Add production domain
    ],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

---

## 🚀 Usage

### Starting the Application

**Development Mode:**

```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Production Mode:**

```bash
# Backend
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan serve

# Frontend
cd frontend
npm run build
# Serve the dist/ folder with Nginx/Apache
```

### Creating Your First Poll

1. **Login**: Navigate to `http://localhost:3000`
   - Enter User ID (from your 3rd party system)
   - Choose an anonymous display name
   - Click "Enter Voting Platform"

2. **Create Poll**: Click "Create Poll"
   - Enter poll title
   - Add description
   - Select vote type (Upvote/Downvote/Both)
   - Click "Create Poll"

3. **Vote**: Click upvote or downvote buttons
   - See real-time results
   - Change your vote anytime
   - Click again to remove vote

### Third-Party Integration

To integrate AnonVote with your existing system:

```javascript
// Your existing authentication system
const userToken = await yourAuthSystem.login(username, password);

// Send to AnonVote API
const response = await fetch('http://localhost:8000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    external_user_id: userToken.userId,
    display_name: userToken.chosenNickname,
    real_identity: userToken.email // This will be encrypted
  })
});

const { token } = await response.json();
// Use this token for all subsequent API calls
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication

All endpoints except `/auth/login` require authentication via Bearer token.

**Headers:**
```http
Authorization: Bearer {your-token}
Content-Type: application/json
Accept: application/json
```

---

### Endpoints

#### 1. Login

**POST** `/auth/login`

Authenticate user with third-party credentials.

**Request Body:**
```json
{
  "external_user_id": "user123",
  "display_name": "Anonymous User",
  "real_identity": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "token": "1|aBC123dEf456...",
  "user": {
    "id": 1,
    "display_name": "Anonymous User"
  }
}
```

---

#### 2. Get Current User

**GET** `/auth/me`

Get authenticated user information.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "display_name": "Anonymous User"
  }
}
```

---

#### 3. Logout

**POST** `/auth/logout`

Revoke current authentication token.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 4. List All Polls

**GET** `/polls`

Get all active polls with vote counts.

**Response:**
```json
{
  "success": true,
  "polls": [
    {
      "id": 1,
      "title": "Should we implement dark mode?",
      "description": "Vote on whether dark mode should be a priority",
      "vote_type": "both",
      "upvotes_count": 45,
      "downvotes_count": 12,
      "total_voters": 57,
      "user_vote": null,
      "creator": {
        "id": 1,
        "display_name": "Anonymous User"
      },
      "created_at": "2024-01-15T10:30:00.000000Z"
    }
  ]
}
```

---

#### 5. Get Single Poll

**GET** `/polls/{id}`

Get detailed information about a specific poll.

**Response:**
```json
{
  "success": true,
  "poll": {
    "id": 1,
    "title": "Should we implement dark mode?",
    "description": "Vote on whether dark mode should be a priority",
    "vote_type": "both",
    "upvotes_count": 45,
    "downvotes_count": 12,
    "total_voters": 57,
    "user_vote": "up",
    "upvote_percentage": 78.9,
    "downvote_percentage": 21.1
  }
}
```

---

#### 6. Create Poll

**POST** `/polls`

Create a new poll.

**Request Body:**
```json
{
  "title": "New Poll Title",
  "description": "Detailed description of the poll",
  "vote_type": "both",
  "expires_at": "2024-12-31T23:59:59Z"
}
```

**Vote Types:**
- `both` - Allow both upvote and downvote
- `upvote` - Only upvote allowed
- `downvote` - Only downvote allowed

**Response:**
```json
{
  "success": true,
  "message": "Poll created successfully",
  "poll": {
    "id": 2,
    "title": "New Poll Title",
    "description": "Detailed description of the poll",
    "vote_type": "both",
    "upvotes_count": 0,
    "downvotes_count": 0,
    "total_voters": 0
  }
}
```

---

#### 7. Cast Vote

**POST** `/polls/{pollId}/vote`

Cast or change a vote on a poll.

**Request Body:**
```json
{
  "vote_type": "up"
}
```

**Vote Types:**
- `up` - Upvote
- `down` - Downvote

**Response:**
```json
{
  "success": true,
  "message": "Vote recorded successfully",
  "poll": {
    "id": 1,
    "upvotes_count": 46,
    "downvotes_count": 12,
    "total_voters": 58,
    "user_vote": "up"
  }
}
```

**Note:** If user already voted with the same type, the vote will be removed.

---

#### 8. Remove Vote

**DELETE** `/polls/{pollId}/vote`

Remove your vote from a poll.

**Response:**
```json
{
  "success": true,
  "message": "Vote removed successfully"
}
```

---

#### 9. Delete Poll

**DELETE** `/polls/{id}`

Delete a poll (only poll creator).

**Response:**
```json
{
  "success": true,
  "message": "Poll deleted successfully"
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Only upvotes are allowed for this poll",
  "errors": {
    "vote_type": ["Invalid vote type for this poll"]
  }
}
```

**401 Unauthorized:**
```json
{
  "message": "Unauthenticated."
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Poll not found"
}
```

**422 Validation Error:**
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "title": ["The title field is required."],
    "vote_type": ["The selected vote type is invalid."]
  }
}
```

**500 Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    external_user_id VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    encrypted_identity TEXT NOT NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_external_user_id (external_user_id)
);
```

### Polls Table
```sql
CREATE TABLE polls (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    creator_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    vote_type ENUM('upvote', 'downvote', 'both') DEFAULT 'both',
    is_active BOOLEAN DEFAULT TRUE,
    upvotes_count INT DEFAULT 0,
    downvotes_count INT DEFAULT 0,
    total_voters INT DEFAULT 0,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_active_created (is_active, created_at)
);
```

### Votes Table
```sql
CREATE TABLE votes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    poll_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    encrypted_user_hash VARCHAR(255) NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    UNIQUE KEY unique_poll_user (poll_id, user_id),
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_encrypted_hash (encrypted_user_hash)
);
```

---

## 🔒 Security

### Data Encryption

1. **User Identity Encryption**: Real user identities are encrypted using Laravel's encryption
   ```php
   Crypt::encryptString($realIdentity)
   ```

2. **Anonymous Vote Hashing**: Votes are double-hashed to prevent tracking
   ```php
   Hash::make($userId . $pollId . config('app.key'))
   ```

3. **API Token Security**: Laravel Sanctum provides secure token-based authentication

### Best Practices

- ✅ Always use HTTPS in production
- ✅ Keep `.env` file secure and never commit it
- ✅ Regularly update dependencies
- ✅ Use strong database passwords
- ✅ Enable rate limiting on API endpoints
- ✅ Implement CSRF protection
- ✅ Sanitize all user inputs
- ✅ Use prepared statements (Laravel does this automatically)

### Rate Limiting

Add to `app/Http/Kernel.php`:

```php
protected $middlewareGroups = [
    'api' => [
        \Illuminate\Routing\Middleware\ThrottleRequests::class.':60,1',
    ],
];
```

---

## 🌐 Deployment

### Production Checklist

- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Generate strong `APP_KEY`
- [ ] Use strong database passwords
- [ ] Configure proper CORS origins
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure proper file permissions
- [ ] Set up database backups
- [ ] Configure error logging
- [ ] Set up monitoring
- [ ] Enable caching
- [ ] Optimize autoloader

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/anonvote/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/anonvote/frontend/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName api.yourdomain.com
    DocumentRoot /var/www/anonvote/backend/public

    <Directory /var/www/anonvote/backend/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/anonvote-error.log
    CustomLog ${APACHE_LOG_DIR}/anonvote-access.log combined
</VirtualHost>

<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/anonvote/frontend/dist

    <Directory /var/www/anonvote/frontend/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Auto-renewal (runs twice daily)
sudo systemctl status certbot.timer
```

### Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying AnonVote..."

# Backend deployment
cd /var/www/anonvote/backend
git pull origin main
composer install --optimize-autoloader --no-dev
php artisan migrate --force
