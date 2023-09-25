#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTreeLimitStack } from '../lib/cdk-tree-limit-stack';

const app = new cdk.App();
for (let i = 0; i < 9001; i++) {
    new CdkTreeLimitStack(app, `CdkTreeLimitStack-${i}`, {
      env: { account: `${i}`, region: 'us-east-1' },
    });
}
