#
FROM node

ENV HOME=/home/node
ENV NPM_CONFIG_LOGLEVEL warn
ENV PATH $HOME/react/node_modules/.bin:$PATH

WORKDIR $HOME/react

EXPOSE 3000

ADD starter.sh /

USER node

#CMD ["/starter.sh"]
