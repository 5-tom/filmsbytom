// (async function () {
// 	const trainsUnorderedList = document.getElementById("trains");
// 	const trainFetch = await fetch("/api/trains");
// 	const trainDates = await trainFetch.json();
// 	trainDates.bookingWindows.forEach((bookingWindow) => {
// 		trainsUnorderedList.insertAdjacentHTML(
// 			"beforeend",
// 			`<li>
// 				${bookingWindow.toc} - ${bookingWindow.date}
// 			</li>`
// 		);
// 	});
// })();
