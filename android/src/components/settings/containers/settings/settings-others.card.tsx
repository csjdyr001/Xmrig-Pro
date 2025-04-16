import React from 'react';
import {
  Card, Slider, Text, View,
} from 'react-native-ui-lib';
import { useDebouncedCallback } from 'use-debounce';
import { SettingsCardProps } from '.';
import { ISettings } from '../../../../core/settings/settings.interface';

const SettingsOthersCard:React.FC<SettingsCardProps<ISettings>> = ({
  settings,
  onUpdate,
}) => {
  const debouncedUpdate = useDebouncedCallback(onUpdate, 1000);

  return (
    <Card enableShadow>
      <View centerV spread padding-20 paddingB-5>
        <Card.Section
          style={{ flexShrink: 1 }}
          content={[
            { text: '其他', text65: true, $textDefault: true },
          ]}
        />
      </View>
      <View spread padding-20 paddingT-10>
        <View marginB-10>
          <View flex marginB-5>
            <Text text75 $textDefault flex column row>打印时间</Text>
            <Text text100 $textDefault row>
              打印哈希率报告每个指定的秒数
            </Text>
          </View>
          <View row flex centerV>
            <Slider
              containerStyle={{ flex: 1 }}
              minimumValue={0}
              maximumValue={300}
              step={10}
              value={settings.printTime}
              onValueChange={
              (value) => debouncedUpdate({ printTime: value })
            }
            />
            <Text marginL-10>
              {settings.printTime}
              秒
            </Text>
          </View>
        </View>
        <View marginB-10>
          <View flex marginB-5>
            <Text text75 $textDefault flex column row>捐赠级别</Text>
            <Text text100 $textDefault row>
              捐赠水平百分比，最低 1%（100 分钟中的 1 分钟）
            </Text>
          </View>
          <View row flex centerV>
            <Slider
              containerStyle={{ flex: 1 }}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={settings.donation}
              onValueChange={
              (value) => debouncedUpdate({ donation: value })
            }
            />
            <Text marginL-10>
              {settings.donation}
              %
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default SettingsOthersCard;
