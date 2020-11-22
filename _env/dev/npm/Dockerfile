#
FROM node

RUN apt-get update && \
	DEBIAN_FRONTEND=noninteractive apt-get install -y \
	jq \
	locales \
	mc \
	&& rm -r /var/lib/apt/lists/*


RUN npm install unirest

ENV HOME /home/node
WORKDIR $HOME/react

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV development

ENV PATH $HOME/react/node_modules/.bin:$PATH

#USER node

# Bash script for running process with infinity loop
COPY starter.sh /starter.sh
CMD ["/starter.sh"]