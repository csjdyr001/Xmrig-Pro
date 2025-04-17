// IXMRigAPIService.aidl
package com.cfks.xmrig.pro.services;

interface IXMRigAPIService {
    void startSummaryUpdates();
    void stopSummaryUpdates();
    void pauseMiner();
    void resumeMiner();
}
