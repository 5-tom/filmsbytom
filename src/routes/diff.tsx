import { useEffect, useState } from "react";
import { Diff, Hunk, markEdits, parseDiff, tokenize } from "react-diff-view";
import "./diff.css";

function DiffViewer() {
	const [patch, setPatch] = useState("");
	const [files, setFiles] = useState([]);

	useEffect(
		function () {
			setFiles(parseDiff(patch));
		},
		[patch]
	);

	return (
		<>
			<input
				className="file-input w-full max-w-xs mt-10"
				type="file"
				onChange={function (e) {
					let file = e.currentTarget.files![0];
					let fileReader = new FileReader();
					fileReader.readAsText(file);
					fileReader.onload = function () {
						setPatch(String(fileReader.result));
					};
				}}
			/>

			{files && <div>{files.map(renderFile)}</div>}
		</>
	);
}
export default DiffViewer;

function renderFile({ oldRevision, newRevision, type, hunks }) {
	return (
		<>
			<br />
			<div>
				<Diff
					key={oldRevision + "-" + newRevision}
					viewType="split"
					diffType={type}
					hunks={hunks}
					tokens={
						hunks
							? tokenize(hunks, {
									highlight: false,
									enhancers: [markEdits(hunks, { type: "block" })]
							  })
							: undefined
					}
					renderToken={renderToken}
				>
					{(hunks) =>
						hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
					}
				</Diff>
			</div>
		</>
	);
}

const renderToken = (token, defaultRender, i) => {
	switch (token.type) {
		case "space":
			console.log(token);
			return (
				<span key={i} className="space">
					{token.children &&
						token.children.map((token, i) =>
							renderToken(token, defaultRender, i)
						)}
				</span>
			);
		default:
			return defaultRender(token, i);
	}
};
