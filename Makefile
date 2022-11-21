build-ui:
	cd ui; yarn build
	rm -r mopidy_moser_web/www
	mkdir -p mopidy_moser_web/www
	cp -r ui/dist/* mopidy_moser_web/www
