import Matrix from './classes/matrix.js';

const memoryMatrix = new Matrix(document.getElementById('game-room'), 3, 3, 3, 1);

memoryMatrix.initMatrix();
memoryMatrix.drawMatrix(true);

setTimeout(() => {
	memoryMatrix.drawMatrix(false);
}, 2000);
