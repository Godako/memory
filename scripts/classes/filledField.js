import GameObject from './gameObject.js';

export default class FilledField extends GameObject {

    constructor(conText, x, y, width, height) {

        super(conText, x, y, width, height);
        this.showedFillStyle = 'blue';
        this.testedFillStyle = 'blue';
    }
}