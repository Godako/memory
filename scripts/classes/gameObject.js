export default class GameObject {

    constructor(conText, x, y, width, height) {

        this.conText = conText;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.showedFillStyle = 'white'
    }

    drawObject(show) {

        if(show) {

            this.conText.fillStyle = this.showedFillStyle;
            this.enabledClick = false;
        } else {

            this.conText.fillStyle = 'white';
            this.enabledClick = true;
        }  

        this.conText.beginPath();
        this.conText.fillRect(this.x, this.y, this.width, this.height);
        this.conText.stroke();

        this.conText.beginPath();
        this.conText.lineWidth = '5';
        this.conText.strokeStyle = 'black';
        this.conText.rect(this.x, this.y, this.width, this.height);
        this.conText.stroke();
    }

    clickObject(mousePosX, mousePosY, rect) {
        
        const resizeRatingX = rect.width / 800;
        const resizeRatingY = rect.height / 800;
        (this.enabledClick && 
        mousePosX >= (this.x + this.conText.lineWidth) * resizeRatingX &&
        mousePosX < (this.x + this.width - this.conText.lineWidth) * resizeRatingX &&
        mousePosY >= (this.y + this.conText.lineWidth) * resizeRatingY &&
        mousePosY < (this.y + this.height - this.conText.lineWidth) * resizeRatingY)? this.clicked = true : this.clicked = false;

        if(this.clicked) this.testAnswer();
    }

    testAnswer() {

        this.conText.fillStyle = this.testedFillStyle;
        this.showed = true;

        this.conText.beginPath();
        this.conText.fillRect(this.x, this.y, this.width, this.height);
        this.conText.stroke();

        this.conText.beginPath();
        this.conText.lineWidth = '5';
        this.conText.strokeStyle = 'black';
        this.conText.rect(this.x, this.y, this.width, this.height);
        this.conText.stroke();

    }

}