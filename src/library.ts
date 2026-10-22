/*!
 * ${copyright}
 */

import IconPool from "sap/ui/core/IconPool";
import type Lib from "sap/ui/core/Lib";
import ObjectPath from "sap/base/util/ObjectPath";

// library dependencies must also be imported here
import "sap/ui/core/library";

/**
 * Initialization Code and shared classes of library fontawesome.icons.lib.
 */

const libraryInfo = {
	name: "fontawesome.icons.lib",
	version: "${version}",
	dependencies: [
		"sap.ui.core"
	],
	types: [] as string[],
	interfaces: [] as string[],
	controls: [] as string[],
	elements: [] as string[],
	noLibraryCSS: true,
};

// sap/ui/core/Lib is only available as of UI5 1.118 and is loaded by the Core in those versions.
// For older releases (e.g. 1.71) fall back to the legacy Core#initLibrary API.
const LibClass = sap.ui.require("sap/ui/core/Lib") as typeof Lib | undefined;

let thisLib: { [key: string]: unknown };
if (LibClass && LibClass.init) {
	thisLib = LibClass.init({
		apiVersion: 2,
		name: libraryInfo.name,
		version: libraryInfo.version,
		dependencies: libraryInfo.dependencies,
		types: libraryInfo.types,
		interfaces: libraryInfo.interfaces,
		controls: libraryInfo.controls,
		elements: libraryInfo.elements,
		noLibraryCSS: libraryInfo.noLibraryCSS,
	}) as { [key: string]: unknown };
} else {
	sap.ui.getCore().initLibrary(libraryInfo); // ui5lint-disable-line no-deprecated-api, no-globals
	thisLib = ObjectPath.get(libraryInfo.name) as { [key: string]: unknown };
}

IconPool.registerFont({
	collectionName: "fa-solid",
	fontFamily: "fa-solid",
	fontURI: sap.ui.require.toUrl("fontawesome/icons/lib/fonts/fa-solid"),
	lazy: false,
});

IconPool.registerFont({
	collectionName: "fa-brands",
	fontFamily: "fa-brands",
	fontURI: sap.ui.require.toUrl("fontawesome/icons/lib/fonts/fa-brands"),
	lazy: false,
});

IconPool.registerFont({
	collectionName: "fa-regular",
	fontFamily: "fa-regular",
	fontURI: sap.ui.require.toUrl("fontawesome/icons/lib/fonts/fa-regular"),
	lazy: false,
});

export default thisLib;
