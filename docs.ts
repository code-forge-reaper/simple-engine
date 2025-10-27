//TODO: use eighter Quark or React to make the docs, since it would be 10x easier to do stuff like
// <Keyword>local</Keyword> name = getName()
// print("<String>hello, "</String> .. name)
const docs = {
	"editor": `the editor is a simple codemirror editor, it has the "lua" language set`
}

export function generateDocs() {
	const doct = document.getElementById('docs')!;
	for (const [key, value] of Object.entries(docs)) {
		const d = document.createElement('details');
		const summary = document.createElement('summary');
		summary.textContent = key;
		d.appendChild(summary);
		const p = document.createElement('p');
		p.textContent = value;
		d.appendChild(p);
		doct.appendChild(d);
	}
}