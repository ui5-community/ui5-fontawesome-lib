import Button, { type Button$PressEvent } from "sap/m/Button";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import Label from "sap/m/Label";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import OverflowToolbar from "sap/m/OverflowToolbar";
import Page from "sap/m/Page";
import SearchField, { type SearchField$LiveChangeEvent } from "sap/m/SearchField";
import Table from "sap/m/Table";
import Text from "sap/m/Text";
import Title from "sap/m/Title";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Icon from "sap/ui/core/Icon";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import type ListBinding from "sap/ui/model/ListBinding";

const tables: Table[] = [];

const searchField = new SearchField({
	placeholder: "Find icons...",
	width: "400px",
	value: "",
	liveChange: (event: SearchField$LiveChangeEvent) => {
		const searchTerm = event.getParameter("newValue").toLowerCase();
		
		// Create filters for both key (icon name) and iconPath
		const filters = [
			new Filter({
				path: "key",
				operator: FilterOperator.Contains,
				value1: searchTerm,
			}),
			new Filter({
				path: "iconPath",
				operator: FilterOperator.Contains,
				value1: searchTerm,
			})
		];

		const combinedFilter = new Filter({
			filters: filters,
			and: false
		});

		tables.forEach((table) => {
			const binding = table.getBinding("items") as ListBinding;
			if (searchTerm) {
				binding.filter(combinedFilter);
			} else {
				binding.filter([]);
			}
		});
	}
})

const page = new Page({
	customHeader: new OverflowToolbar({
		content: [
			new Icon({
				src: "sap-icon://fa-brands/font-awesome",
				size: "1rem",
			}),
			new Title({ text: "Font Awesome Icon Library" }),
			new ToolbarSpacer(),
			searchField,
			new ToolbarSpacer(),
			new Button({
				text: "NPM Package",
				type: "Ghost",
				icon: "sap-icon://fa-brands/npm",
				press: () => {
					window.open("https://www.npmjs.com/package/ui5-fontawesome-lib", "_blank");
				}
			}),
			new Button({
				text: "GitHub Repository",
				type: "Ghost",
				icon: "sap-icon://fa-brands/github",
				press: () => {
					window.open("https://github.com/ui5-community/ui5-fontawesome-lib", "_blank");
				}
			}),
			
		]
	}),
});

page.placeAt("content");

const showPack = async (iconPack: string) => {
	const url = sap.ui.require.toUrl(
		"fontawesome/icons/lib/fonts/" + iconPack + "/" + iconPack + ".json"
	);
	const model = new JSONModel();
	model.setSizeLimit(9999);

	await model.loadData(url);
	const icons = model.getData() as Record<string, string>;

	// Transform the data for binding
	const tableData = Object.keys(icons).map(key => ({
		key: key,
		iconPath: "sap-icon://" + iconPack + "/" + key,
		pack: iconPack
	}));

	const tableModel = new JSONModel(tableData);
	tableModel.setSizeLimit(9999);

	new Title({ text: iconPack + " (" + tableData.length + " icons)" }).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginTop sapUiSmallMarginEnd").placeAt("content");

	const table = new Table({
		noDataText: "No icons found",
		columns: [
			new Column({
				header: new Label({ text: "Icon" }),
				width: "50px",
			}),
			new Column({
				header: new Label({ text: "Name" }),
				width: "200px"
			}),
			new Column({
				header: new Label({ text: "Icon Path" }),
			}),
			new Column({
				header: new Label({ text: "Action" }),
				width: "100px",
				hAlign: "Right",
			}),
		],
		items: {
			path: "/",
			template: new ColumnListItem({
				cells: [
					new Icon({
						src: "{iconPath}",
						size: "2rem",
					}),
					new Text({ text: "{key}" }),
					new Text({ text: "{iconPath}" }),
					new Button({
						icon: "sap-icon://fa-regular/copy",
						type: "Transparent",
						tooltip: "Copy icon path to clipboard",
						press: function(event: Button$PressEvent) {
							const button = event.getSource();
							const bindingContext = button.getBindingContext();
							if (bindingContext) {
								const iconPath = bindingContext.getProperty("iconPath") as string;
								if (typeof iconPath === "string") {
									navigator.clipboard.writeText(iconPath).then(() => {
										MessageToast.show("Icon path copied to clipboard!");
									}).catch(() => {
										MessageBox.error("Failed to copy to clipboard");
									});
								}
							}
						}
					})
				],
			})
		}
	});

	table.setModel(tableModel);
	table.addStyleClass("sapUiSmallMargin");
	table.setWidth("calc(100% - 2rem)");
	table.setGrowingThreshold(9999);

	table.placeAt("content");

	tables.push(table);
};

const init = async () => {
	await showPack("fa-regular");
	await showPack("fa-solid");
	await showPack("fa-brands");

	searchField.focus()
};

void init();
