"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
let myStatusBarItem;
function activate({ subscriptions }) {
    // register a command that is invoked when the status bar
    // item is selected
    const myCommandId = 'sample.showSelectionCount';
    subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
        const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
        vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
    }));
    // 创建状态bar 在右下角 
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    // 这句的意思是点击该bar的时候唤醒这一命令
    myStatusBarItem.command = myCommandId;
    subscriptions.push(myStatusBarItem);
    // 创建监听
    subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
    // 一开始就
    updateStatusBarItem();
}
exports.activate = activate;
function updateStatusBarItem() {
    const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
    if (n > 0) {
        // megaphone指用户
        myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
        myStatusBarItem.show();
        myStatusBarItem.tooltip = `click me`;
    }
    else {
        myStatusBarItem.hide();
    }
}
function getNumberOfSelectedLines(editor) {
    let lines = 0;
    if (editor) {
        lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
    }
    return lines;
}
//# sourceMappingURL=extension.js.map