create_version:
	docker-compose exec minimal_viewer npm run build
	rm dist/minimal_viewer-*.js | true
	rm dist/minimal_viewer-*.css | true
	mv dist/minimal_viewer.js dist/minimal_viewer-$$(npm run get-version --silent).js
	mv dist/minimal_viewer.css dist/minimal_viewer-$$(npm run get-version --silent).css