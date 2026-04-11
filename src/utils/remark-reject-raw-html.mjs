const visitNodes = (node, visitor) => {
	if (!node || typeof node !== 'object') return;

	visitor(node);

	if (!Array.isArray(node.children)) return;

	for (const child of node.children) {
		visitNodes(child, visitor);
	}
};

export default function remarkRejectRawHtml() {
	return (tree, file) => {
		visitNodes(tree, (node) => {
			if (node.type === 'html') {
				file.fail('Raw HTML is not allowed in Markdown content.', node);
			}
		});
	};
}
