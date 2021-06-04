export default class Util {
    static getNumericalTime = (time: string) => {
        return parseFloat(time.slice(0, time.length - 1))
    };

    static getFormatDateTime = (minutes: number, seconds: number) => {
        return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`
    };
    static publicUrl = (path: string) => {
        return path;
    }

}
