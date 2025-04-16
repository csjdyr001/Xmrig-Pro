import React from 'react';
import {
  Card, Switch, Text, View,
} from 'react-native-ui-lib';
import { SettingsCardProps } from '.';
import { IPowerSettings } from '../../../../core/settings/settings.interface';

const SettingsPowerCard:React.FC<SettingsCardProps<IPowerSettings>> = ({
  settings,
  onUpdate,
}) => (
  <Card enableShadow>
    <View centerV spread padding-20 paddingB-5>
      <Card.Section
        style={{ flexShrink: 1 }}
        content={[
          { text: '电量', text65: true, $textDefault: true },
          { text: '根据电池电量/设备充电暂停/恢复挖矿。', text90: true, $textNeutral: true },
        ]}
      />
    </View>
    <View spread padding-20 paddingT-10>
      <View marginB-10>
        <View flex marginB-5>
          <Text text75 $textDefault flex column row>停止挖矿</Text>
          <Text text100 $textDefault row>
            会暂停矿工，可以从同一点恢复
          </Text>
        </View>
        <View row flex paddingL-10 marginB-5>
          <Text text80 $textNeutralLight flex column marginB-5>充电器断开连接</Text>
          <Switch
            value={settings.pauseOnChargerDisconnected}
            onValueChange={(value) => onUpdate({ pauseOnChargerDisconnected: value })}
          />
        </View>
        <View row flex paddingL-10>
          <Text text80 $textNeutralLight flex column marginB-5>低电量</Text>
          <Switch
            value={settings.pauseOnLowBattery}
            onValueChange={(value) => onUpdate({ pauseOnLowBattery: value })}
          />
        </View>
      </View>
      <View marginB-10>
        <View flex marginB-5>
          <Text text75 $textDefault flex column row>恢复挖矿</Text>
          <Text text100 $textDefault row>
            将恢复挖矿，只有暂停才会恢复
          </Text>
        </View>
        <View row flex paddingL-10 marginB-5>
          <Text text80 $textNeutralLight flex column marginB-5>连接充电器</Text>
          <Switch
            value={settings.resumeOnChargerConnected}
            onValueChange={(value) => onUpdate({ resumeOnChargerConnected: value })}
          />
        </View>
        <View row flex paddingL-10>
          <Text text80 $textNeutralLight flex column marginB-5>电量充足</Text>
          <Switch
            value={settings.resumeOnBatteryOk}
            onValueChange={(value) => onUpdate({ resumeOnBatteryOk: value })}
          />
        </View>
      </View>
    </View>
  </Card>
);

export default SettingsPowerCard;
