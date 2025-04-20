export enum StartMode {
    START,
    STOP
}

export enum WorkingState {
    NOT_WORKING = '未工作',
    MINING = '挖矿中',
    PAUSED = '暂停',
}

export interface IXMRigLogEvent {
    log: string[];
}

export interface IHashrateHistory {
    historyCurrent: number[];
    history10s: number[];
    history60s: number[];
    history15m: number[];
    historyMax: number[];
}
