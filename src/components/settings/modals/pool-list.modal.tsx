import _ from 'lodash';
import React from 'react';
import {
  Button, Chip, Colors, Incubator, Picker, Typography, View,
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { IConfiguratioPropertiesPool } from '../../../core/settings/settings.interface';
import {
  C3Pool,
  Hashcity,
  HashVault,
  IPoolState,
  IPredefinedPool,
  IPredefinedPoolInfo,
  MineXMR,
  MoneroOcean,
  Nano,
  PredefinedPoolName,
  predefinedPools,
  predefinedPoolsList,
  SupportXMR,
  XMRPoolEU,
  Unmineable,
} from './pools';

export type PoolListModalProps = Incubator.DialogProps & {
  onAdd: (pool: IConfiguratioPropertiesPool) => void;
}

const PoolListModal:React.FC<PoolListModalProps> = (
  {
    onAdd,
    onDismiss,
    ...rest
  },
) => {
  const [selected, setSelected] = React.useState<string>();
  const [pool, setPool] = React.useState<IConfiguratioPropertiesPool>({
    hostname: '',
    port: 0,
    username: '',
    password: '',
    sslEnabled: false,
  });

  const onChange = React.useCallback(
    (state: IPoolState) => setPool({
      hostname: state.hostname,
      port: state.port,
      username: state.username,
      password: state.password,
      sslEnabled: false,
    }),
    [],
  );

  const pools = React.useMemo<IPredefinedPool[]>(() => predefinedPoolsList, []);
  const poolInfo = React.useMemo<IPredefinedPoolInfo>(
    () => predefinedPools[selected as PredefinedPoolName],
    [selected],
  );

  const hide = (isOk: boolean = false) => {
    if (isOk === true) {
      onAdd(pool);
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <Incubator.Dialog
      onDismiss={onDismiss}
      center
      headerProps={{
        text: {
          title: '矿池预设',
        },
      }}
      containerStyle={{ width: '100%', minWidth: 300 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <View spread style={{ flexGrow: 1 }}>
        <View paddingH-20>
          <View height={50} paddingT-10>
            <Picker
              floatingPlaceholder={selected === null}
              placeholder="选择一个矿池"
              topBarProps={{ title: '矿池' }}
              value={selected}
              showSearch
              searchPlaceholder="搜索配置"
              onChange={(value: any) => setSelected(value)}
              style={{ ...Typography.text60, color: Colors.$textDefault }}
              floatingPlaceholderStyle={{ ...Typography.text70, color: Colors.$textDefault }}
              migrate
              migrateTextField
            >
              {_.map(pools, (item: IPredefinedPool) => (
                <Picker.Item
                  key={item.name}
                  value={item.name}
                  label={item.info.displayName}
                />
              ))}
            </Picker>
          </View>

          {poolInfo && (
            <View row paddingB-10 spread>
              <Chip size={10} label={`${poolInfo.fee}% 抽水`} />
              <Chip size={10} label={`${poolInfo.threshold} 分钟 支付`} marginH-10 />
              <Chip size={10} label={poolInfo.method} />
            </View>
          )}

          <View spread paddingB-20>
            <ScrollView>
            {selected && selected === PredefinedPoolName.MoneroOcean
              && <MoneroOcean onChange={onChange} />}
            {selected && selected === PredefinedPoolName.MineXMR
              && <MineXMR onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.SupportXMR
              && <SupportXMR onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.nanopool
              && <Nano onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.C3Pool
              && <C3Pool onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.XMRPoolEU
              && <XMRPoolEU onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.HashVault
              && <HashVault onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.Hashcity
              && <Hashcity onChange={onChange} /> }
            {selected && selected === PredefinedPoolName.Unmineable
              && <Unmineable onChange={onChange} /> }
            </ScrollView>
          </View>

        </View>
        <View bottom>
          <View height={1.5} bg-grey70 />
          <View paddingV-15 paddingH-20 right row centerV>
            <Button
              onPress={() => hide(true)}
              marginR-10
              label="保存"
              size={Button.sizes.medium}
            />
            <Button onPress={onDismiss} label="取消" backgroundColor={Colors.$backgroundDangerHeavy} size={Button.sizes.medium} />
          </View>
        </View>
      </View>
    </Incubator.Dialog>
  );
};

export default PoolListModal;
