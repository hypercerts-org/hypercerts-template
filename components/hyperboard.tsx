import Script from "next/script";

type HyperboardProps = {
	hyperboardId: string;
	showTable: boolean;
};

export const Hyperboard = ({ hyperboardId, showTable }: HyperboardProps) => {
	return (
		<>
			<Script
				async
				src="https://staging.hyperboards.org/widget/hyperboard-widget.js"
				type="module"
			/>
			<div
				className="hyperboard-widget"
				data-hyperboard-id={hyperboardId}
				data-hyperboard-show-table={showTable.toString()}
			/>
		</>
	);
};
