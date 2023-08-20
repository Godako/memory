import GameObject from './gameObject.js';

export default class VoidField extends GameObject {

    constructor(conText, x, y, width, height) {

        super(conText, x, y, width, height);
        this.showedFillStyle = 'white';
        this.testedFillStyle = 'red';
    }
}