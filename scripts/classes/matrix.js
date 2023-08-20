import VoidField from './voidField.js';
import FilledField from './filledField.js';

export default class Matrix {

    constructor(canvas, width, height, titleNumber, level) {
        this.canvas = canvas;
        this.conText = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.maxTitleNumber = titleNumber;
        this.level = level;

        this.initEvents();
    }

    initMatrix() {

        this.conText.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.matrixElements = new Array();

        let leftTitleNumber = this.maxTitleNumber;

        this.objectSize = this.canvas.width / this.width;
        let x = (this.canvas.width / 2) - (this.width * this.objectSize / 2);
        let y = (this.canvas.height / 2) - (this.height * this.objectSize / 2);

        for (let i = 0; i < this.height * this.width; i++) {

            if (this.getRandomInt(3)) {

                this.matrixElements.push(new VoidField(this.conText, x, y, this.objectSize, this.objectSize));
            } else if (leftTitleNumber) {

                this.matrixElements.push(new FilledField(this.conText, x, y, this.objectSize, this.objectSize));
                leftTitleNumber--;
            } else {

                this.matrixElements.push(new VoidField(this.conText, x, y, this.objectSize, this.objectSize));
            }

            x += this.objectSize;
            if (x >= ((this.canvas.width / 2) + (this.width * this.objectSize / 2))) {
                x = (this.canvas.width / 2) - (this.width * this.objectSize / 2);
                y += this.objectSize;
            }
        }

        let i = 0;
        while (leftTitleNumber) {

            this.matrixElements.forEach(element => {

                if (leftTitleNumber && element instanceof VoidField && this.getRandomInt(2)) {

                    this.matrixElements[i] = new FilledField(element.conText, element.x, element.y, this.objectSize, this.objectSize);
                    leftTitleNumber--;
                }
                i++;
            });
        }
    }

    initEvents() {
        this.canvas.addEventListener('mousedown', event => {
            if (this.enabled) {
                const rect = this.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                if (this.enabled) this.clickOnMatrix(x, y);
                if (this.enabled && this.getCorrectAnswers() === this.getFilledFieldNumber()) {

                    this.enabled = false;
                    setTimeout(() => {

                        if (this.getIncorrectAnswers() < 1) {

                            this.levelUp();
                        } else if (this.getIncorrectAnswers() > 1) {

                            this.levelDown();
                        }
                        else {
                            this.initMatrix();
                        }

                        this.drawMatrix(true);

                        setTimeout(() => {
                            this.drawMatrix(false);
                        }, 2000);

                    }, 1000);
                }
            }
        });
    }

    drawMatrix(show) {

        this.matrixElements.forEach(element => {
            element.drawObject(show);
        });
        this.enabled = true;
    }

    levelUp() {

        if (this.level <= 16) {

            this.level++;

            this.width++;
            this.height++;

            this.maxTitleNumber += this.level;
        }
        this.initMatrix();
    }

    levelDown() {

        if (this.level > 1) {

            if (this.maxTitleNumber > 3) this.maxTitleNumber -= this.level;
            this.level--;

            this.width--;
            this.height--;
        }
        this.initMatrix();
    }

    clickOnMatrix(mousePosX, mousePosY) {

        const rect = this.canvas.getBoundingClientRect();
        this.matrixElements.forEach(element => {

            element.clickObject(mousePosX, mousePosY, rect);
        });
    }

    getFilledFieldNumber() {

        let filledFieldElements = 0;
        this.matrixElements.forEach(element => {

            if (element instanceof FilledField) filledFieldElements++;
        });

        return filledFieldElements;
    }

    getCorrectAnswers() {

        let showedElements = 0;
        this.matrixElements.forEach(element => {

            if (element instanceof FilledField && element.showed) showedElements++;
        });

        return showedElements;
    }

    getIncorrectAnswers() {

        let showedElements = 0;
        this.matrixElements.forEach(element => {

            if (element instanceof VoidField && element.showed) showedElements++;
        });

        return showedElements;
    }

    getRandomInt(max) {

        return Math.floor(Math.random() * max);
    }

}