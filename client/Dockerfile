###################
# BUILD FOR DEVELOPMENT
###################

FROM node:18 As build

# Set the working directory
WORKDIR /usr/src/app/frontend

# Add the node_modules to the PATH
ENV PATH ./node_modules/.bin:$PATH

# Copy the package.json and package-lock.json
COPY package*.json ./

# Copy the production environment variable file
# COPY ./prod.front.env ./

# Install all the dependencies
RUN npm install

# Add the source code to app/frontend
COPY . .

# Generate the build of the application
RUN npm run build

# Set the environment variables
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

###################
# BUILD FOR PRODUCTION
###################

FROM nginx:latest As production

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/frontend/dist /usr/share/nginx/html

# Copy the local nginx configuration file to the nginx conf.d folder
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the package.json and package-lock.json 
COPY --from=build /usr/src/app/frontend/package*.json ./

# Copy the production environment variable file
# COPY  --from=build /usr/src/app/frontend/prod.front.env ./

# Expose port 80
EXPOSE 80

# Run nginx
CMD [ "nginx", "-g", "daemon off;" ]