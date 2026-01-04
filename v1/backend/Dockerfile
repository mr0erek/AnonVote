FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx

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
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copy nginx config
RUN pwd
COPY ./backend/docker/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 8080

# Start services
CMD php artisan migrate --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php-fpm -D && \
    nginx -g 'daemon off;'
