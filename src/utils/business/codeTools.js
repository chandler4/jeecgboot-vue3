
const defaultExceptions = [
	'id',
	'createTime',
	'createUser',
	'updateTime',
	'updateUser',
	'validFlag',
];

export function schemeToTableColumn (properties = {}, exceptions = defaultExceptions) {

	return Object.keys(properties).map(key => {
		if (exceptions.includes(key)   ) {
			return null;
		}
		const {
			description
		} = properties[key];
		const s = `<el-table-column prop="${key}" label="${description}" />`
		console.log(s);
		return s;
	}).filter(s => s !== null).join('\n');
}