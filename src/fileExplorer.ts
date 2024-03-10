import * as vscode from 'vscode';

interface MyListEntry {
	caption: string;
}

export class MyListProvider implements vscode.TreeDataProvider<MyListEntry> {
	private lst: String[] = ['a', 'b', 'c'];

	getTreeItem(element: MyListEntry): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return new vscode.TreeItem(element.caption);
	}
	getChildren(element?: MyListEntry | undefined): vscode.ProviderResult<MyListEntry[]> {
		if (element === undefined) {
			// root
			return this.lst.map(strItem => ({ caption: strItem } as MyListEntry));
		}
		return [];
	}
}

export class FileExplorer {
	constructor(context: vscode.ExtensionContext) {
		const treeDataProvider = new MyListProvider();
		context.subscriptions.push(vscode.window.createTreeView('fileExplorer', { treeDataProvider }));
	}
}