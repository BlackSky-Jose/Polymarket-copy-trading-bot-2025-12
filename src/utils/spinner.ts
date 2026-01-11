let spinnerInstance: any = null;

const getSpinner = async () => {
    if (spinnerInstance) {
        return spinnerInstance;
    }
    
    const ora = await import('ora');
    const defaultOra = ora.default || ora;
    
    spinnerInstance = defaultOra({
        spinner: {
            interval: 200,
            frames: [
                '▰▱▱▱▱▱▱',
                '▰▰▱▱▱▱▱',
                '▰▰▰▱▱▱▱',
                '▰▰▰▰▱▱▱',
                '▰▰▰▰▰▱▱',
                '▰▰▰▰▰▰▱',
                '▰▰▰▰▰▰▰',
            ],
        },
    });
    
    return spinnerInstance;
};

// Create a synchronous wrapper that initializes on first use
const spinner = {
    start: async (text?: string) => {
        const s = await getSpinner();
        return s.start(text);
    },
    stop: () => {
        if (spinnerInstance) {
            spinnerInstance.stop();
        }
    },
    succeed: async (text?: string) => {
        const s = await getSpinner();
        return s.succeed(text);
    },
    fail: async (text?: string) => {
        const s = await getSpinner();
        return s.fail(text);
    },
    warn: async (text?: string) => {
        const s = await getSpinner();
        return s.warn(text);
    },
    info: async (text?: string) => {
        const s = await getSpinner();
        return s.info(text);
    },
};

export default spinner;
