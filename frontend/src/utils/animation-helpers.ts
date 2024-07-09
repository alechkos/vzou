export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sleepWithID(ms: number, timeOutsArr: NodeJS.Timeout[]) {
    return new Promise((resolve) => {
        timeOutsArr.push(setTimeout(resolve, ms));
    });
}
