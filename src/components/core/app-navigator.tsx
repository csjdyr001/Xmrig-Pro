import React, { useEffect } from 'react';
import {
  TabController,
  View,
  Text,
  ViewProps,
} from 'react-native-ui-lib';

import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { LazyLoader } from './lazy-loader';
import ConfigurationEditScreen from '../settings/screens/configuration-edit.screen';
import { version } from '../../version';

import { Alert, Linking } from 'react-native';

const Stack = createStackNavigator();

const Settings = React.lazy(() => import('../settings/settings-view'));
const Miner = React.lazy(() => import('../miner/miner-view'));

const LazySettings = () => (<LazyLoader><Settings /></LazyLoader>);
const LazyMiner = () => (<LazyLoader><Miner /></LazyLoader>);

const AppTabs:React.FC<ViewProps> = () => (
  <TabController items={[{ label: '矿工' }, { label: '设置' }]}>
    <TabController.TabBar
      enableShadow
    />
    <View flex>
      <TabController.TabPage index={0}><LazyMiner /></TabController.TabPage>
      <TabController.TabPage index={1} lazy><LazySettings /></TabController.TabPage>
    </View>
  </TabController>
);

export const AppNavigator:React.FC<ViewProps> = () => {
  useEffect(() => {
    SplashScreen.hide();
    Alert.alert(
    "Xmrig Pro",
    "该软件仅供交流学习，汉化By caofangkuai",
    [
      {
        text: "确定",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "在Github上查看",
        onPress: () => Linking.openURL("https://github.com/csjdyr001/Xmrig-Pro/"),
        style: "default",
      },
    ]
  );
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={AppTabs}
        // eslint-disable-next-line react/jsx-one-expression-per-line
        options={{
          title: 'Xmrig Pro',
          headerTitleContainerStyle: { marginLeft: 10 },
          headerRightContainerStyle: { marginRight: 10 },
          headerRight: () => (
            <Text>
              Version
              {' '}
              {version}
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Configuration"
        component={ConfigurationEditScreen}
        getId={({ params }: any) => params.id}
        options={{ title: 'Xmrig Pro | 配置' }}
      />
    </Stack.Navigator>
  );
};
