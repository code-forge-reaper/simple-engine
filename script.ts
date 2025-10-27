
import { StreamLanguage } from "@codemirror/language";
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { linter, lintGutter } from '@codemirror/lint';
import {
  oneDarkTheme,
} from "@codemirror/theme-one-dark";
import { basicSetup, EditorView } from 'codemirror';
import { LuaFactory } from "wasmoon";
import { generateDocs } from "./docs";
import { autocompletion, CompletionContext, CompletionSource } from "@codemirror/autocomplete";
import { defaultLuaKeywords, STUFF } from "./completer";

generateDocs()
defaultLuaKeywords()
const outputCanvas = document.getElementById('output') as HTMLCanvasElement;
const ctx = outputCanvas.getContext('2d')!;
const outputConsole = document.getElementById('console') as HTMLTextAreaElement;
function log(...texts: string[]) {
  for (const text of texts)
    outputConsole.value += text + '\n';
}

const completion: CompletionSource = (cctx: CompletionContext) => {
  const word = cctx.matchBefore(/\w+/);
  if (!word || word.from == word.to && !cctx.explicit) {
    return null
  }


  // Filter your custom completion list based on the 'word'
  const completions = STUFF.filter(item => item.label.startsWith(word.text));

  return {
    from: word.from,
    options: completions,
  };
}

const ed = document.getElementById('editor')!


const editor = new EditorView({
  extensions: [
    basicSetup,
    lintGutter(),
    oneDarkTheme,
    StreamLanguage.define(lua),
    autocompletion({ override: [completion] }),
  ],
  parent: ed
});
editor.focus()
ed.onclick = () => editor.focus()
const runBtn = document.getElementById('run') as HTMLButtonElement
const stopBtn = document.getElementById('stop') as HTMLButtonElement
const factory = new LuaFactory();
let vm
async function setupVM() {
  vm = await factory.createEngine();
  vm.global.set("print", log)
}
setupVM()

async function run() {
  const code = editor.state.doc.toString()
  try {
    vm.doStringSync(code)
  } catch (e) {
    // TODO: somehow get where the error happened, and highlight it in the editor
    log(e)
    runBtn.disabled = false
    stopBtn.disabled = true
  }
}

runBtn.addEventListener('click', () => {
  runBtn.disabled = true
  stopBtn.disabled = false
  run()
})
stopBtn.addEventListener('click', async () => {
  runBtn.disabled = false
  stopBtn.disabled = true
  vm.global.close()
  setupVM()
})
