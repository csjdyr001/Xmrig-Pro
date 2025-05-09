/**
 * @format
 */

import { AppRegistry, LogBox, Alert } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreAllLogs(false); // 启用红屏但不崩溃
AppRegistry.registerComponent(appName, () => App);

const noop = () => {}

const setJSExceptionHandler = (customHandler = noop, allowedInDevMode = false) => {
    if (typeof allowedInDevMode !== 'boolean' || typeof customHandler !== 'function') {
        console.log('setJSExceptionHandler is called with wrong argument types.. first argument should be callback function and second argument is optional should be a boolean')
        console.log('Not setting the JS handler .. please fix setJSExceptionHandler call')
        return
    }
    /* eslint-disable */
    const allowed = allowedInDevMode ? true : !__DEV__
    if (allowed) {
        global.ErrorUtils.setGlobalHandler(customHandler)
        console.error = (message, error) => global.ErrorUtils.reportError(error) // sending console.error so that it can be caught
    } else {
        console.log('Skipping setJSExceptionHandler: Reason: In DEV mode and allowedInDevMode = false')
    }
}

const getJSExceptionHandler = () => global.ErrorUtils.getGlobalHandler()

setJSExceptionHandler((e, isFatal) => {
    if (isFatal) {
        Alert.alert(
            '发生意外错误',
            `
            ${e && e.stack}
            `,
            [{
                text: '确定',
                onPress: () => {
                    //console.log('ok')
                }
            }]
        )
    } else {
        console.log(e)
    }
}, true)