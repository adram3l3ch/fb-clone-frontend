import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const InfinityScroll = ({ getNextPage, children, offset = 10 }) => {
	const contentRef = useRef();
	const [isFinished, setIsFinished] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handler = useCallback(async () => {
		const content = contentRef.current;
		if (!content) return;
		const { height, top } = content.getBoundingClientRect();
		const remainingSpaceAtBottom = window.innerHeight + top * -1 - height;
		const isReachedBottom = remainingSpaceAtBottom > offset;
		if (isReachedBottom && !isFinished && !isLoading) {
			setIsLoading(true);
			const length = await getNextPage();
			if (!length) setIsFinished(true);
			setIsLoading(false);
		}
	}, [isLoading, isFinished, offset, getNextPage]);

	useEffect(() => {
		document.addEventListener("scroll", handler);
		return () => document.removeEventListener("scroll", handler);
	}, [handler]);

	return (
		<div className="infinityScroll">
			<div className="infinityScroll__content" ref={contentRef}>
				{children}
				{!isFinished && isLoading && <div className="loading__circle" />}
			</div>
		</div>
	);
};

export default InfinityScroll;
