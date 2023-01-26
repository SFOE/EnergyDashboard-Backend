export const withEnvPrefix = (value: string) => {
    return `${process.env.ENV}-${value}`;
}
