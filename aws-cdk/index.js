"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_ecs_1 = require("@aws-cdk/aws-ecs");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const core_1 = require("@aws-cdk/core");
const dynamodb_table_1 = require("./infrastructure/dynamodb-table");
const ecs_service_extensions_1 = require("@aws-cdk-containers/ecs-service-extensions");
const app = new core_1.App();
const stack = new core_1.Stack(app, 'hit-counter-cfd9');
const environment = new ecs_service_extensions_1.Environment(stack, 'production');
/** Define the hit counter service */
const hitCounterDescription = new ecs_service_extensions_1.ServiceDescription();
// Add the container
hitCounterDescription.add(new ecs_service_extensions_1.Container({
    cpu: 1024,
    memoryMiB: 2048,
    trafficPort: 80,
    image: aws_ecs_1.ContainerImage.fromAsset('app',
    {platform:Platform.LINUX_AMD64,})
}));
// Add autoscaling
hitCounterDescription.add(new ecs_service_extensions_1.ScaleOnCpuUtilization({
    initialTaskCount: 2,
    minTaskCount: 2,
}));
// Add a DynamoDB table
hitCounterDescription.add(new dynamodb_table_1.DynamoDbTable('hits', {
    partitionKey: {
        name: 'counter',
        type: dynamodb.AttributeType.STRING
    }
}));
// Add a load balancer
hitCounterDescription.add(new ecs_service_extensions_1.HttpLoadBalancerExtension());
// Add the hit counter service to the production environment.
new ecs_service_extensions_1.Service(stack, 'hit-counter', {
    environment: environment,
    serviceDescription: hitCounterDescription,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsd0NBQTJDO0FBQzNDLG9FQUFnRTtBQUVoRSx1RkFPb0Q7QUFFcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLFlBQUssQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUVqRCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9DQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXpELHFDQUFxQztBQUNyQyxNQUFNLHFCQUFxQixHQUFHLElBQUksMkNBQWtCLEVBQUUsQ0FBQztBQUV2RCxvQkFBb0I7QUFDcEIscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksa0NBQVMsQ0FBQztJQUN0QyxHQUFHLEVBQUUsSUFBSTtJQUNULFNBQVMsRUFBRSxJQUFJO0lBQ2YsV0FBVyxFQUFFLEVBQUU7SUFDZixLQUFLLEVBQUUsd0JBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0NBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBRUosa0JBQWtCO0FBQ2xCLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLDhDQUFxQixDQUFDO0lBQ2xELGdCQUFnQixFQUFFLENBQUM7SUFDbkIsWUFBWSxFQUFFLENBQUM7Q0FDaEIsQ0FBQyxDQUFDLENBQUM7QUFFSix1QkFBdUI7QUFDdkIscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksOEJBQWEsQ0FBQyxNQUFNLEVBQUU7SUFDbEQsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNO0tBQ3BDO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSixzQkFBc0I7QUFDdEIscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksa0RBQXlCLEVBQUUsQ0FBQyxDQUFDO0FBRTNELDZEQUE2RDtBQUM3RCxJQUFJLGdDQUFPLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNoQyxXQUFXLEVBQUUsV0FBVztJQUN4QixrQkFBa0IsRUFBRSxxQkFBcUI7Q0FDMUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGFpbmVySW1hZ2UgfSBmcm9tICdAYXdzLWNkay9hd3MtZWNzJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgeyBBcHAsIFN0YWNrIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBEeW5hbW9EYlRhYmxlIH0gZnJvbSAnLi9pbmZyYXN0cnVjdHVyZS9keW5hbW9kYi10YWJsZSc7XG5cbmltcG9ydCB7XG4gIENvbnRhaW5lcixcbiAgRW52aXJvbm1lbnQsXG4gIEh0dHBMb2FkQmFsYW5jZXJFeHRlbnNpb24sXG4gIFNjYWxlT25DcHVVdGlsaXphdGlvbixcbiAgU2VydmljZSxcbiAgU2VydmljZURlc2NyaXB0aW9uXG59IGZyb20gJ0Bhd3MtY2RrLWNvbnRhaW5lcnMvZWNzLXNlcnZpY2UtZXh0ZW5zaW9ucyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2hpdC1jb3VudGVyLWNmZDknKTtcblxuY29uc3QgZW52aXJvbm1lbnQgPSBuZXcgRW52aXJvbm1lbnQoc3RhY2ssICdwcm9kdWN0aW9uJyk7XG5cbi8qKiBEZWZpbmUgdGhlIGhpdCBjb3VudGVyIHNlcnZpY2UgKi9cbmNvbnN0IGhpdENvdW50ZXJEZXNjcmlwdGlvbiA9IG5ldyBTZXJ2aWNlRGVzY3JpcHRpb24oKTtcblxuLy8gQWRkIHRoZSBjb250YWluZXJcbmhpdENvdW50ZXJEZXNjcmlwdGlvbi5hZGQobmV3IENvbnRhaW5lcih7XG4gIGNwdTogMTAyNCxcbiAgbWVtb3J5TWlCOiAyMDQ4LFxuICB0cmFmZmljUG9ydDogODAsXG4gIGltYWdlOiBDb250YWluZXJJbWFnZS5mcm9tQXNzZXQoJ2FwcCcpXG59KSk7XG5cbi8vIEFkZCBhdXRvc2NhbGluZ1xuaGl0Q291bnRlckRlc2NyaXB0aW9uLmFkZChuZXcgU2NhbGVPbkNwdVV0aWxpemF0aW9uKHtcbiAgaW5pdGlhbFRhc2tDb3VudDogMixcbiAgbWluVGFza0NvdW50OiAyLFxufSkpO1xuXG4vLyBBZGQgYSBEeW5hbW9EQiB0YWJsZVxuaGl0Q291bnRlckRlc2NyaXB0aW9uLmFkZChuZXcgRHluYW1vRGJUYWJsZSgnaGl0cycsIHtcbiAgcGFydGl0aW9uS2V5OiB7XG4gICAgbmFtZTogJ2NvdW50ZXInLFxuICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gIH1cbn0pKTtcblxuLy8gQWRkIGEgbG9hZCBiYWxhbmNlclxuaGl0Q291bnRlckRlc2NyaXB0aW9uLmFkZChuZXcgSHR0cExvYWRCYWxhbmNlckV4dGVuc2lvbigpKTtcblxuLy8gQWRkIHRoZSBoaXQgY291bnRlciBzZXJ2aWNlIHRvIHRoZSBwcm9kdWN0aW9uIGVudmlyb25tZW50LlxubmV3IFNlcnZpY2Uoc3RhY2ssICdoaXQtY291bnRlcicsIHtcbiAgZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LFxuICBzZXJ2aWNlRGVzY3JpcHRpb246IGhpdENvdW50ZXJEZXNjcmlwdGlvbixcbn0pO1xuIl19