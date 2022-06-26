const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const templates = require("./templates");

String.prototype.supplant = function (o) {
	return this.replace(/{([^{}]*)}/g, function (a, b) {
		var r = o[b];
		return typeof r === "string" || typeof r === "number" ? r : a;
	});
};

String.prototype.capitalize = function (o) {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

function main() {
	if (argv._.length <= 1) {
		console.log("Usage:");
		console.log("\tmodule init - Init new module");
		console.log("\tmodule remove - Remove existing module");
		return;
	}

	const cmd = argv._[0];
	const subcmd = argv._[1];

	if (cmd === "module") {
		if (subcmd === "init") {
			return initModuleCmd();
		} else if (subcmd === "remove") {
			return removeModuleCmd();
		}
	}
	console.log("[Error] Invalid command:", [cmd, subcmd].join(" "));
}

function initModuleCmd() {
	if (argv.name === undefined) {
		console.log("[Error] --name flag is not provided");
		return;
	}

	if (argv.routes === undefined) {
		argv.routes = true;
	}

	if (argv.store === undefined) {
		argv.store = true;
	}

	if (argv.force == undefined) {
		argv.force = false;
	}

	createModule(argv.name, argv.routes, argv.store, argv.force);
}

function removeModuleCmd() {
	if (argv.name === undefined) {
		console.log("[Error] --name flag is not provided");
		return;
	}

	removeModule(argv.name);
}

function createModule(name, routes, store, force) {
	const modulePath = path.join("./src", "modules", name);

	const viewsPath = path.join(modulePath, "views");
	const homeViewPath = path.join(viewsPath, "Home.vue");
	const moduleWrapperViewPath = path.join(viewsPath, "ModuleWrapper.vue");

	const indexPath = path.join(modulePath, "index.ts");
	const routesPath = path.join(modulePath, "routes.ts");
	const storePath = path.join(modulePath, "store.ts");

	const result = createFolders(viewsPath);
	if (result === undefined) {
		if (force === false) {
			return console.log(
				"[Error] Unable to create module. Folder might probably already exist"
			);
		}
		fs.rmSync(modulePath, { recursive: true, force: true });
		console.log("Removed existing module folder");
		createFolders(viewsPath);
	}

	createViews(name, homeViewPath, moduleWrapperViewPath);

	if (routes === true) {
		createRoutesFile(routesPath, name);
	}

	if (store === true) {
		createStoreFile(storePath, name);
	}

	createIndexFile(indexPath, routes, store);
}

function removeModule(name) {
	const modulePath = path.join("./src", "modules", name);
	fs.rmSync(modulePath, { recursive: true, force: true });
}

function createFolders(path) {
	return fs.mkdirSync(path, { recursive: true });
}

function createViews(name, homePath, wrapperPath) {
	fs.writeFileSync(
		homePath,
		templates.HOME_VIEW_TEMPLATE.supplant({ moduleCap: name.capitalize() })
	);
	fs.writeFileSync(wrapperPath, templates.MODULE_WRAPPER_VIEW_TEMPLATE);
}

function createRoutesFile(path, name) {
	fs.writeFileSync(
		path,
		templates.ROUTES_TEMPLATE.supplant({ module: name })
	);
}

function createStoreFile(path, name) {
	fs.writeFileSync(
		path,
		templates.STORE_TEMPLATE.supplant({
			state: name,
			stateCap: name.capitalize(),
		})
	);
}

function createIndexFile(path, routes, store) {
	let content = templates.INDEX_TEMPLATE.supplant({
		routesImport: routes === true ? `\nimport routes from "./routes";` : ``,
		storeImport: store === true ? `\nimport store from "./store";` : ``,
		routesExport: routes === true ? `\n\troutes,` : ``,
		storeExport: store === true ? `\n\tstore,` : ``,
	});
	fs.writeFileSync(path, content);
}

main();
