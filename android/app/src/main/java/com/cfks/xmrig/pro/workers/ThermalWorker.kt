package com.cfks.xmrig.pro.workers

import android.content.Context
import android.util.Log
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.cfks.xmrig.pro.events.ThermalEvent
import com.cfks.xmrig.pro.utils.CPUTemperatureHelper
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import org.greenrobot.eventbus.EventBus

class ThermalWorker(appContext: Context, workerParams: WorkerParameters):
        CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result {
        return withContext(Dispatchers.IO) {
            Log.d("ThermalWorker", "override suspend fun doWork()")
            val cpuTemp = CPUTemperatureHelper.getCpuTemperature()
            EventBus.getDefault().post(ThermalEvent(cpuTemp))
            Result.success()
        }
    }

}
