/* eslint-disable quotes */
/* eslint-disable quote-props */
export const config = {
  "api": {
    "id": null,
    "worker-id": null,
  },
  "http": {
    "enabled": true,
    "host": "127.0.0.1",
    "port": 50080,
    "access-token": null,
    "restricted": true,
  },
  "autosave": true,
  "background": false,
  "colors": true,
  "title": true,
  "randomx": {
    "init": -1,
    "init-avx2": 0,
    "mode": "light",
    "1gb-pages": false,
    "rdmsr": true,
    "wrmsr": true,
    "cache_qos": false,
    "numa": true,
    "scratchpad_prefetch_mode": 1,
  },
  "cpu": {
    "enabled": true,
    "huge-pages": true,
    "huge-pages-jit": false,
    "hw-aes": null,
    "priority": 1,
    "memory-pool": true,
    "yield": true,
    "max-threads-hint": 100,
    "asm": true,
    "argon2-impl": null,
    "astrobwt-max-size": 100,
    "astrobwt-avx2": false,
  },
  "opencl": {
    "enabled": false,
    "cache": true,
    "loader": null,
    "platform": "AMD",
    "adl": true,
    "cn/0": false,
    "cn-lite/0": false,
    "panthera": false,
  },
  "cuda": {
    "enabled": false,
    "loader": null,
    "nvml": true,
    "cn/0": false,
    "cn-lite/0": false,
    "panthera": false,
    "astrobwt": false,
  },
  "donate-level": 0,
  "donate-over-proxy": 0,
  "log-file": null,
  "pools": [
    {
      "algo": null,
      "coin": null,
      "url": "",
      "user": "",
      "pass": "x",
      "rig-id": null,
      "nicehash": false,
      "keepalive": true,
      "enabled": true,
      "tls": false,
      "tls-fingerprint": null,
      "daemon": false,
      "socks5": null,
      "self-select": null,
      "submit-to-origin": false,
    },
  ],
  "print-time": 60,
  "health-print-time": 60,
  "dmi": true,
  "retries": 5,
  "retry-pause": 5,
  "syslog": false,
  "tls": {
    "enabled": false,
    "protocols": null,
    "cert": null,
    "cert_key": null,
    "ciphers": null,
    "ciphersuites": null,
    "dhparam": null,
  },
  "user-agent": null,
  "verbose": 1,
  "watch": true,
  "rebench-algo": false,
  "bench-algo-time": 20,
  "pause-on-battery": false,
  "pause-on-active": false,
};
