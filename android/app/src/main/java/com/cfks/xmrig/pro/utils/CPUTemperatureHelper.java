package com.cfks.xmrig.pro.utils;

import java.io.*;

public class CPUTemperatureHelper {
    public float getCpuTemperature() {
      String[] cpuTempPaths = new String[]{
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
      };

      for (String path : cpuTempPaths) {
         try {
            File file = new File(path);
            if (file.exists()) {
               String content = new String(java.nio.file.Files.readAllBytes(file.toPath())).trim();
               float temp = Float.parseFloat(content);

               // Some systems return in millidegrees Celsius, need to divide by 1000
               return temp > 1000 ? temp / 1000 : temp;
            }
         } catch (Exception e) {
            // Ignore exception and continue to the next path
            continue;
         }
      }

      return 0.0f;
   }
}