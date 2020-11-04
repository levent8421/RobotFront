const BG_CIRCULAR_COLOR = '#3171FA';
const BG_AXIS_COLOR = '#EEEEEE';
const ANGLE_LINE_COLOR = '#FF6600';
const ANGLE_POINT_SIZE = 3;

class AngleController {
    constructor(canvas, setting) {
        this.canvas = canvas;
        this.onAngleChanged = setting.onAngleChanged;
        this.width = parseInt(canvas.getAttribute('width'));
        this.height = parseInt(canvas.getAttribute('height'));
        this.init();
        this.drawBackground();
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.centerPoint = {x: this.width / 2, y: this.height / 2};
        this.canvas.onclick = e => {
            const {offsetX, offsetY} = e;
            this.onClick(offsetX, offsetY);
        };
    }

    onClick(x, y) {
        const angle = this.getAngle(x, y);
        const length = this.getLength(x, y);
        this.onAngleChanged(angle, length);
        this.clean();
        this.drawBackground();
        this.drawAngle(x, y);
    }

    drawAngle(x, y) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = ANGLE_LINE_COLOR;
        this.ctx.moveTo(this.centerPoint.x, this.centerPoint.y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillStyle = ANGLE_LINE_COLOR;
        this.ctx.arc(x, y, ANGLE_POINT_SIZE, 0, Math.PI * 2);
        this.ctx.fill();
    }

    clean() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    getLength(x, y) {
        const pow = Math.pow(x - this.centerPoint.x, 2) + Math.pow(y - this.centerPoint.y, 2);
        return Math.sqrt(pow) / this.centerPoint.x;
    }

    getAngle(x, y) {
        const cp = this.centerPoint;
        const x1 = x - cp.x;
        const y1 = y - cp.y;
        const x2 = 0;
        const y2 = -cp.y;
        const dot = x1 * x2 + y1 * y2;
        const det = x1 * y2 - x2 * y1;
        let angle = Math.atan2(det, dot) / Math.PI * 180;
        if (angle >= 0) {
            angle = 360 - angle;
        }
        return Math.abs(angle);
    }

    drawBackground() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = BG_CIRCULAR_COLOR;
        ctx.arc(this.centerPoint.x, this.centerPoint.y, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = BG_AXIS_COLOR;
        ctx.moveTo(0, this.centerPoint.y);
        ctx.lineTo(this.width, this.centerPoint.y);
        ctx.moveTo(this.centerPoint.x, 0);
        ctx.lineTo(this.centerPoint.x, this.height);
        ctx.stroke();
    }

    setData(angle, speed) {

    }
}

export default AngleController;
