(function() {

	const PATH = 0;
	const WALL = 1;

	document.addEventListener('DOMContentLoaded',init,false);

	/* =======================================================================
		init
	========================================================================== */
	function init() {

		const width  = 20;
		const height = 20;

		let mazeData = generateMaze(width,height);
		setHtml(mazeData);

	}

	/* =======================================================================
		Generate Maze
	========================================================================== */
	function generateMaze(width,height) {

		if (height < 5 || width < 5) return;
		if (width % 2 == 0) width++;
		if (height % 2 == 0) height++;

		let maze = new Array(width);
		for (let x = 0; x < width; x++) {
			let column = new Array(height);
			for (let y = 0; y < height; y++) {
				if (x == 0 || y == 0 || x == width - 1 || y == height - 1) {
					column[y] = WALL;
				} else {
					column[y] = PATH;
				}
			}
			maze[x] = column;
		}

		for (let x = 2; x < width - 1; x += 2) {
			for (let y = 2; y < height - 1; y += 2) {

				maze[x][y] = WALL;

				while (true) {

					let isFirstRow = y == 2;
					let direction  = isFirstRow ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 3);

					let wallX = x;
					let wallY = y;

					switch (direction) {
						case 0:
							wallX++;
							break;
						case 1:
							wallY++;
							break;
						case 2:
							wallX--;
							break;
						case 3:
							wallY--;
							break;
					}

					if (maze[wallX][wallY] != WALL) {
						maze[wallX][wallY] = WALL;
						break;
					}

				}
			}
		}

		return maze;

	}

	/* =======================================================================
		Set Html
	========================================================================== */
	function setHtml(data) {

		let html  = '';
		let width = data.length;

		for (let x = 0; x < width; x++) {

			const row = data[x];
			html += '<tr>';
			for (let y = 0; y < row.length; y++) {

				let isStart = x == 1 && y == 1;
				let isEnd = x == width - 2 && y == row.length - 2;
				let element = '<td class="';

				if (isStart) element += 'start ';
				if (isEnd) element += 'end ';
				if (row[y] == PATH) element += 'path';
				if (row[y] == WALL) element += 'wall';

				html += element + '"></td>';

			}
			html += '</tr>';

		}

		document.getElementById('maze').innerHTML = html;

	}

})();