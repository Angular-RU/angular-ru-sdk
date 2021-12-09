import { Injectable } from '@angular/core';

import { WorkerThread } from './worker-thread';

@Injectable()
export class WebWorkerThreadService extends WorkerThread {}
