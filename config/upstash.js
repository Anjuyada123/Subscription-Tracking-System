import {Client as WorkflowClient} from '@upstash/workflow';

import { QSTASH_TOEKN,QSTASH_URL } from './env';

export const WorkflowClient=new WorkflowClient({
    baseUrl:QSTASH_URL,
    toekn:QSTASH_TOEKN,
});