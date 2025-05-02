# Deploying to DigitalOcean

This guide provides step-by-step instructions for deploying the Fayida Student Web Platform to DigitalOcean using App Platform or Droplets.

## Option 1: Deploy using DigitalOcean App Platform (Recommended)

DigitalOcean App Platform is a Platform-as-a-Service (PaaS) that allows you to easily deploy and scale applications.

### Step 1: Prepare your application

Ensure your repository has:
- A valid `Dockerfile` (already done)
- The necessary environment variables in a `.env.example` file

### Step 2: Create a DigitalOcean account

1. Sign up for a DigitalOcean account at [https://www.digitalocean.com/](https://www.digitalocean.com/)
2. Set up billing information

### Step 3: Deploy your application

1. From the DigitalOcean dashboard, click on **Create** > **Apps**
2. Choose your source repository (GitHub, GitLab, or upload from your local system)
3. Select the branch you want to deploy
4. Configure your app:
   - Choose the region closest to your users
   - Select the plan (Basic, Professional, or Custom)
   - Set environment variables (based on your `.env.example` file)
   - Configure health checks and domains if needed
5. Click **Create Resources**
6. Wait for the deployment to complete (usually takes a few minutes)

### Step 4: Set up a custom domain (Optional)

1. Go to your app settings
2. Navigate to **Domains**
3. Add your custom domain
4. Follow the DNS instructions to point your domain to DigitalOcean's servers

## Option 2: Deploy using DigitalOcean Droplets

If you need more control over your server environment, you can use a Droplet (virtual server).

### Step 1: Create a Droplet

1. From the DigitalOcean dashboard, click on **Create** > **Droplets**
2. Choose an image: Ubuntu 20.04 (LTS) is recommended
3. Choose a plan based on your needs
4. Select a datacenter region closest to your users
5. Add your SSH keys for secure access
6. Create the Droplet

### Step 2: Connect to your Droplet

```bash
ssh root@your_droplet_ip
```

### Step 3: Install Docker

```bash
# Update package listings
apt update

# Install prerequisites
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Add Docker repository
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Update package listings
apt update

# Install Docker
apt install -y docker-ce

# Verify Docker installation
docker --version
```

### Step 4: Clone your repository and build the Docker image

```bash
# Install Git
apt install -y git

# Clone your repository
git clone https://github.com/yourusername/fayida_student_web.git
cd fayida_student_web

# Build Docker image
docker build -t fayida-student-web .
```

### Step 5: Run your application

```bash
# Run the Docker container
docker run -d -p 80:8080 --name fayida-app fayida-student-web
```

### Step 6: Set up a domain name (Optional)

1. Create an A record in your domain's DNS settings pointing to your Droplet's IP address
2. Install Nginx as a reverse proxy (optional but recommended for SSL)

```bash
apt install -y nginx certbot python3-certbot-nginx

# Configure Nginx
nano /etc/nginx/sites-available/fayida-app
```

Add the following configuration:

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
ln -s /etc/nginx/sites-available/fayida-app /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 7: Set up SSL with Let's Encrypt

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Continuous Deployment

For continuous deployment, consider:

1. Using GitHub Actions to automatically build and deploy your application
2. Implementing a CI/CD pipeline with tools like Jenkins or GitLab CI
3. Using DigitalOcean's App Platform which supports automatic deployments on each push

## Useful DigitalOcean Commands

### Monitoring your application

```bash
# View running containers
docker ps

# View container logs
docker logs fayida-app

# View resource usage
docker stats
```

### Updating your application

```bash
# Pull latest changes
git pull

# Rebuild the Docker image
docker build -t fayida-student-web .

# Stop and remove the old container
docker stop fayida-app
docker rm fayida-app

# Start a new container with the updated image
docker run -d -p 80:8080 --name fayida-app fayida-student-web
``` 