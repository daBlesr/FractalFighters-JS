
class Timer {

    private delayMs: number;
    private timeSinceLastUse: number = 0;

    constructor(delayMs: number) {
        this.delayMs = delayMs;
    }

    use(): boolean {
        const milis = new Date().getTime();
        if (milis - this.timeSinceLastUse > this.delayMs) {
            this.timeSinceLastUse = milis;
            return true;
        }
        return false;
    }
}

export default Timer;