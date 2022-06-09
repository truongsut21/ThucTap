const throwErrorInCatch = (error, watcherName = 'Unknown saga') => {
    if (process.env && process.env.NODE_ENV && process.env.NODE_ENV.includes('development')) {
        console.error(watcherName, '----------------', error);
    }
}
export default throwErrorInCatch;