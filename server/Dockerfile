########
# This Dockerfile is used in order to run local development with docker-compose
# It is  intended to be used in production
########

FROM node:16-alpine As development

# Create app directory
WORKDIR /usr/src/app

# COPY tsconfig.json file
COPY package*.json /usr/src/app/

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

WORKDIR /usr/src/app

ARG DISABLE_ERD=true
ENV DISABLE_ERD=${DISABLE_ERD}

# COPY package.json and package-lock.json files
COPY --chown=node:node package*.json ./

# Copy over the node_modules in order to gain access to the Nest CLI.
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
RUN npm ci

# Copy the source code
COPY --chown=node:node . .

# Generate the prisma client
RUN npx prisma generate

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER node

###################
# PRODUCTION
###################

FROM node:16-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

# Expose port 8080
EXPOSE 8080

# Run the app
CMD [ "npm", "run", "start:migrate:prod" ]
