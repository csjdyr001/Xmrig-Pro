package com.cfks.xmrig.pro.utils

import java.io.File

class CPUTemperatureHelper {
    companion object {
        fun getCpuTemperature(): Float {
            val cpuTempPaths = arrayOf(
                "/sys/devices/system/cpu/cpu0/cpufreq/cpu_temp",
                "/sys/devices/system/cpu/cpu0/cpufreq/FakeShmoo_cpu_temp",
                "/sys/devices/platform/tegra-i2c.3/i2c-4/4-004c/temperature",
                "/sys/devices/platform/omap/omap_temp_sensor.0/temperature",
                "/sys/devices/platform/tegra_tmon/temp1_input",
                "/sys/devices/platform/s5p-tmu/temperature",
                "/sys/devices/platform/s5p-tmu/curr_temp",
                "/sys/devices/virtual/thermal/thermal_zone1/temp",
                "/sys/devices/virtual/thermal/thermal_zone0/temp",
                "/sys/class/thermal/thermal_zone0/temp",
                "/sys/class/thermal/thermal_zone1/temp",
                "/sys/class/thermal/thermal_zone3/temp",
                "/sys/class/thermal/thermal_zone4/temp",
                "/sys/class/hwmon/hwmon0/device/temp1_input",
                "/sys/class/i2c-adapter/i2c-4/4-004c/temperature",
                "/sys/kernel/debug/tegra_thermal/temp_tj",
                "/sys/htc/cpu_temp",
                "/sys/devices/platform/tegra-i2c.3/i2c-4/4-004c/ext_temperature",
                "/sys/devices/platform/tegra-tsensor/tsensor_temperature"
            )

            for (path in cpuTempPaths) {
                try {
                    val file = File(path)
                    if (file.exists()) {
                        val content = file.readText().trim()
                        val temp = content.toFloat()

                        // 有些系统返回的是毫摄氏度，需要除以1000
                        return if (temp > 1000) temp / 1000 else temp
                    }
                } catch (e: Exception) {
                    // 忽略异常，继续尝试下一个路径
                    continue
                }
            }

            return 0.0f
        }
    }
}