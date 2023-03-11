# Docker & Kubernetes

## Docker

```md
- FROM: specifies the base image for the Dockerfile
- RUN: executes commands in the Docker container
- COPY: copies files and directories from the host system to the container
- ADD: similar to COPY, but can also handle remote URLs and decompress archives
- WORKDIR: sets the working directory for subsequent commands
- ENV: sets environment variables in the container
- EXPOSE: documents which ports should be published when the container is run
- CMD: specifies the default command to run when the container is started
```

```md
FROM node:14-alpine

WORKDIR /app

ADD https://github.com/user/repo/archive/refs/heads/main.zip .
RUN unzip main.zip && mv repo-main/\* .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```
