import React from 'react';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import { SafeAreaView, Alert } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsContext, SettingsContextProvider } from './core/settings';
import { AppNavigator } from './components';
import { SessionDataContextProvider } from './core/session-data/session-data.context';
import { PowerContextProvider } from './core/power/power.context';
import { LoggerContextProvider } from './core/logger';
import { ToasterProvider } from './core/hooks/use-toaster/toaset.context';
import { LoadAssets } from './assets';
import RNRestart from 'react-native-restart';

enableScreens(false);

// 设置全局错误处理
ErrorUtils.setGlobalHandler((error, isFatal) => {
  // 打印错误信息
  console.log('Global error handler triggered');
  console.log(error.toString());
  Alert.alert(
  	'Xmrig Pro-报错',
  	error.toString(),
  	[{ text: '确定', onPress: () => {
    	// 在此处执行一些清理操作或重启应用
    	RNRestart.restart();
    }}]
  );
});

const AppWithSettings:React.FC = () => {
  React.useEffect(() => {
    LoadAssets();
    Colors.loadSchemes({
      light: {
        screenBG: Colors.grey70,
        textColor: Colors.grey10,
        moonOrSun: Colors.yellow30,
        mountainForeground: Colors.green30,
        mountainBackground: Colors.green50,
      },
      dark: {
        screenBG: Colors.grey10,
        textColor: Colors.white,
        moonOrSun: Colors.grey80,
        mountainForeground: Colors.violet10,
        mountainBackground: Colors.violet20,
      },
    });
    Colors.setScheme('light');
  }, []);

  return (
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  );
};

const App = () => {
  const { settings } = React.useContext(SettingsContext);

  if (settings.ready === false) {
    return <LoaderScreen message="加载中..." color={Colors.grey40} />;
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <LoggerContextProvider>
        <PowerContextProvider>
          <SessionDataContextProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <ToasterProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </ToasterProvider>
            </SafeAreaView>
          </SessionDataContextProvider>
        </PowerContextProvider>
      </LoggerContextProvider>
    </SafeAreaProvider>
  );
};

export default AppWithSettings;
