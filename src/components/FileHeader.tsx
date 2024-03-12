// https://github.com/otakustay/react-diff-view/issues/205
import { useMemo } from "react";
import { FileData } from "react-diff-view";

interface Props {
	file: FileData;
}

export default function FileHeader({ file }: Props) {
	const summary = useMemo(() => {
		const changes = file.hunks.flatMap((v) => v.changes);
		const insertions = changes.filter((v) => v.isInsert);
		const deletions = changes.filter((v) => v.isDelete);
		return {
			insertionCount: insertions.length,
			deletionCount: deletions.length
		};
	}, [file]);

	return (
		<header>
			{file.oldPath}
			<span style={{ color: "green" }}>+++ {summary.insertionCount}</span>
			<span style={{ color: "red" }}>--- {summary.deletionCount}</span>
		</header>
	);
}
