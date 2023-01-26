# Energy Dashboard Backend & API

## Initial Setup
In order to develop and deploy new functions you need to have NodeJS and Yarn installed. Run `yarn` to fetch all needed packages.

## AWS Lambda Functions
We use AWS Lambda functions for backend functionality and APIs to access data. Lambda functions should be small, fast and have few direct dependencies. Clear separation of concerns between different functions make it easier to manage the functionality in the future.

### Typescript
We use Typescript to develop all lambda functions and unit tests. 

### aws-sdk
For access to AWS Services such as AWS Lambda, DynamoDB, etc. we use the NodeJS aws-sdk.

## Adding new Lambda Functions
In order to add new lambda functions we need to do the following tasks:
- Create new folder under api or data-processing, depending upon the functionality
- The folder has to contain a `???.ts` file with a `handler` function
- Add the configuration of the lambda function to serverless.yml
- In case it's a data-processing lambda function it's most likely needed that the new function with the associated file is added to the `source-files.ts`, so that the lambda function which gets triggered by AWS can properly route the file to the new function.
- If you need a new db table for the data make sure to add the entry to `db-tables.ts`. Currently you need to manually add the new DynamoDB table in the AWS console, once for dev and once for prod

## Versioning of source files and APIs
If there are breaking changes in the source files or APIs we have the following versioning scheme:
- BfE creates and pushes a new source file with a version appendix (*-v2.csv)
- Create new lambda functions, DynamoDB tables and APIs based on the new file
- Once everything is updated, remove the old versions of source files, lambda functions, DynamoDB tables and APIs

With this approach we are backwards-compatible and don't have breaking changes on the APIs and continue to use the approach of 1 file - 1 table - 1 API as much as possible and avoid complexity in the code while introducing some temporary duplicacy.

## Build & Deployment
Lambda Functions are built and packaged by yarn and serverless and then deployed by serverless.
You can trigger a build of all the functions with the command `yarn build`. The relevant commands to build the project and the needed modules are in `build.sh`

### Shared Modules
In order to reuse functionality across different functions we have shared modules that can be referenced. We have the following shared modules (also called layers in AWS Lambda):
- Common Layer
- Node Modules Layer

Those modules are built separately and referenced in the serverless configuration. Beware to not put too many node modules in these layers, AWS has a relatively low size of allowed files per function. 

### Serverless
For managing Lambda Functions and all other necessary resources in AWS and to package and deploy the functions we use the framework Serverless. All lambda functions are configured in `serverless.yml`

### Manual and automatic Deployments
Deploying currently happens on Gitlab @ti8m but can also be triggered manually. Currently, the following yarn commands are configured in ti8m's Gitlab-Instance:
- `yarn deploy`: Deploys all functions to the DEV-Stage; Gets triggered on new commits to the `master` branch in Gitlab
- `yarn deploy-prod`: Deploys all functions to the PROD-Stage; Gets triggered on new commits to the `production` branch in Gitlab

## Release Versions
We track releases in `RELEASES.md` in the format `Major.Minor.Patch`. Large changes or additions to the dashboard warrant a new major version, small changes or smaller additions (e.g. new KPIs) create a new minor version, bugfixes and patches create a new patch version.

## Tests
Due to time constraints during development there are relatively few unit tests. Since most of the functionality doesn't contain business logic this is not as crucial as it might seem. Nonetheless it would make sense and would be good to add additional unit tests, even better add integration tests that also include some sort of integration with DynamoDB and the APIs.

The tests are written with jest. You can run the tests with `yarn test`.

