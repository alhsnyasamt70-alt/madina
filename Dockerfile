FROM nginx:alpine

# Copy all static files to nginx html directory
COPY . /usr/share/nginx/html

# Copy the Nginx configuration template for dynamic port binding
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Default port fallback (Railway will override this with its own PORT variable)
ENV PORT=80

# Expose port
EXPOSE 80
