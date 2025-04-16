import { merge } from 'lodash/fp';
import React from 'react';
import {
  Assets,
  Card, Colors, Icon, RadioButton, RadioGroup, SkeletonView, Text, View,
} from 'react-native-ui-lib';
import { EditSimpleCardProps } from './index';
import { ISimpleConfiguration, XMRigFork } from '../../../../../core/settings/settings.interface';

export const EditSimpleForkCard: React.FC<EditSimpleCardProps> = (
  { setLocalState, localState },
) => (
  <Card>
    <View centerV spread padding-20 paddingB-5>
      <View row>
        <Card.Section
          content={[
            { text: '常规', text65: true, $textDefault: true },
            { text: '您可以在原始XMRig和MoneroOcean的支持算法切换的分支之间进行选择。', text90: true, $textNeutral: true },
          ]}
        />
      </View>
    </View>

    <View spread padding-20 paddingT-10>
      <RadioGroup
        onValueChange={(value: XMRigFork) => {
          setLocalState((oldState: ISimpleConfiguration) => merge(
            oldState,
            {
              xmrig_fork: value,
            },
          ));
        }}
        initialValue={localState.xmrig_fork}
      >
        <View row spread>
          <RadioButton label="原始" value={XMRigFork.ORIGINAL} />
          <RadioButton label="MoneroOcean" value={XMRigFork.MONEROOCEAN} />
        </View>
      </RadioGroup>
      {localState.xmrig_fork === XMRigFork.MONEROOCEAN && (
        <View row centerV>
          <Icon source={Assets.icons.warning} tintColor={Colors.$textDanger} marginR-10 />
          <View>
            <Text text90L $textDanger textBreakStrategy="balanced" underline>
              Warning: Benchmarking may stuck on some algos.
            </Text>
            <Text text100L $textDangerLight textBreakStrategy="balanced">
              您可以使用特定算法使用
              下面或使用自定义的“算法”部分
              配置文件以“高级模式”。
            </Text>
          </View>
        </View>
      )}
    </View>
  </Card>
);

const EditSimpleForkCardSkeleton: React.FC<EditSimpleCardProps> = (props) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const interval = setTimeout(() => setLoaded(true), 600);
    return () => {
      clearTimeout(interval);
      setLoaded(false);
    };
  }, []);

  return (
    <SkeletonView
      template={SkeletonView.templates.TEXT_CONTENT}
      customValue={props}
      showContent={loaded}
      renderContent={
        // eslint-disable-next-line react/jsx-props-no-spreading
        (customProps: EditSimpleCardProps) => (<EditSimpleForkCard {...customProps} />)
      }
      times={2}
    />
  );
};

export default EditSimpleForkCardSkeleton;
