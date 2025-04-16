import { merge } from 'lodash/fp';
import React from 'react';
import {
  Card, Colors, GridView, SkeletonView, Switch, Text, View,
} from 'react-native-ui-lib';
import { Dimensions, ScaledSize } from 'react-native';
import { Algorithems, Algorithm } from '../../../../../core/settings/settings.interface';
import { EditSimpleCardProps } from './index';

const screen = Dimensions.get('screen');

export const EditSimpleAlgorithemsCard: React.FC<EditSimpleCardProps> = (
  { setLocalState, localState },
) => {
  const [dimensions, setDimensions] = React.useState<ScaledSize>({
    ...screen,
    width: screen.width - 20,
  });

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ screen: _screen }) => {
        setDimensions({
          ..._screen,
          width: _screen.width - 20,
        });
      },
    );
    return () => subscription?.remove();
  });

  const renderItem = React.useCallback((item: Algorithm) => (
    <View marginB-5 key={`algo-${item}`} style={{ borderBottomWidth: 1, borderColor: Colors.$outlineDisabled }} marginR-10 paddingB-10>
      <View row flex>
        <Text text90 $textNeutralLight flex column marginB-5>{item}</Text>
        <Switch
          value={localState.properties?.algos ? localState.properties?.algos[item] : true}
          onValueChange={(value) => setLocalState((oldState) => merge(
            oldState,
            {
              properties: {
                algos: {
                  [`${item}`]: value,
                },
              },
            },
          ))}
        />
      </View>
    </View>
  ), [localState.properties]);

  return React.useMemo(() => (
    <Card
      enableShadow
    >
      <View centerV spread padding-20 paddingB-5>
        <Card.Section
          style={{ flexShrink: 1 }}
          content={[
            { text: '算法', text65: true, $textDefault: true },
            { text: '启用/禁用矿工支持的算法，某些算法可能会在某些设备上解决问题。如果矿工在某些算法上被卡住/崩溃，则可以禁用这些算法。', text90: true, $textNeutral: true },
          ]}
        />
      </View>
      <View spread padding-20 paddingT-10>
        <GridView
          numColumns={2}
          viewWidth={dimensions.width - 20}
          itemSpacing={10}
          items={
          Algorithems.sort().map((item) => ({
            renderCustomItem: () => renderItem(item),
          }))
        }
        />
      </View>
    </Card>
  ), [dimensions.width, Algorithems, localState.properties?.algos]);
};

const EditSimpleAlgorithemsCardSkeleton: React.FC<EditSimpleCardProps> = (props) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const interval = setTimeout(() => setLoaded(true), 800);
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
        (customProps: EditSimpleCardProps) => (<EditSimpleAlgorithemsCard {...customProps} />)
      }
      times={5}
    />
  );
};

export default EditSimpleAlgorithemsCardSkeleton;
