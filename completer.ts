
export const STUFF: { label: string, type: string, info: string }[]
	= [

	]
export function add(
	name: string,
	type: string,
	description: string
) {
	STUFF.push({ label: name, type, info: description })
}
export function defaultLuaKeywords() {

	// lua keywords
	add("local", "keyword", "defines a local variable")
	add("function", "keyword", "defines a function")
	add("end", "keyword", "ends a block")
	add("return", "keyword", "returns a value")
	add("then", "keyword", "starts a block")
	add("do", "keyword", "starts a block")
	add("while", "keyword", "starts a loop")

}