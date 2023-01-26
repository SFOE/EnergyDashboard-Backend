import { Aws } from '/opt/nodejs/aws.constants';
import { RoutingFunctions } from '/opt/nodejs/source-files';
import { withEnvPrefix } from '/opt/nodejs/utils/env.utils';
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Context, S3Event } from 'aws-lambda';

export const handler = async (event: S3Event, context: Context): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    // Get the object from the event and show its content type
    const fileName = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    await routeFunction(fileName);
};

const routeFunction = async (fileName: string) => {
    const routingFunction = RoutingFunctions[fileName];

    if (!routingFunction) {
        console.log(`no target function found for file ${fileName}. Is the source-files.ts file properly updated?`);
        return true;
    }

    const targetFunction = withEnvPrefix(routingFunction);

    try {
        await invoke(targetFunction, { fileName });
        console.log(`Successfully invoked function ${targetFunction}`);
        return true;
    } catch (err) {
        console.error(err);
        const message = `Error invoking function ${targetFunction} for fileName ${fileName}. Make sure the functions are deployed in the region`;
        console.error(message);
        throw new Error(message);
    }
}

const invoke = async (funcName, payload) => {
    const client = new LambdaClient({
        region: Aws.region,
    });

    console.log(`Invoking function ${funcName} with payload ${JSON.stringify(payload)}`)
    const command = new InvokeCommand({
        FunctionName: funcName,
        Payload: Buffer.from(JSON.stringify(payload)),
    });

    console.log('Sending command');
    await client.send(command);
    console.log('Command sent');
};
