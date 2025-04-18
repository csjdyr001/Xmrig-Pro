import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  Colors,
  Incubator,
  RadioGroup,
  RadioButton,
  Button,
} from 'react-native-ui-lib';
import { SettingsContext } from '../../../core/settings';
import { ConfigurationMode } from '../../../core/settings/settings.interface';
import { getConfigurationNameValidator, getConfigurationValidator } from '../../../core/utils/validators';

export type AddConfigurationsModalProps = Incubator.DialogProps & {
    onAdd: (name: string, mode: ConfigurationMode) => void;
}

const AddConfigurationsModal:React.FC<AddConfigurationsModalProps> = (
  {
    onAdd,
    onDismiss,
    ...rest
  },
) => {
  const { settings } = React.useContext(SettingsContext);
  const existsNames = React.useMemo<string[]>(
    () => settings.configurations.map(
      (c) => c.name,
    ),
    [settings.configurations],
  );

  const [name, setName] = React.useState('');
  const [configMode, setConfigMode] = React.useState<ConfigurationMode>(ConfigurationMode.SIMPLE);

  const isValid = React.useMemo(() => getConfigurationValidator(existsNames).validate({
    name,
    mode: configMode,
  }).error == null, [name, configMode]);

  const RenderRadioGroup = React.useCallback(() => (
    <RadioGroup
      onValueChange={(value: ConfigurationMode) => setConfigMode(value)}
      initialValue={configMode}
    >
      <RadioButton label="简单模式" value={ConfigurationMode.SIMPLE} marginB-10 />
      <RadioButton label="高级模式" value={ConfigurationMode.ADVANCE} />
    </RadioGroup>
  ), [configMode]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Incubator.Dialog
      onDismiss={onDismiss}
      center
      headerProps={{
        text: {
          title: '新配置',
        },
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      containerStyle={{ width: '100%', minWidth: 300, minHeight: 350 }}
    >
      <View spread flex-1>
        <View padding-20 style={{ flexGrow: 1 }}>
          <Incubator.TextField
            placeholder="名称"
            floatingPlaceholder
            value={name}
            onChangeText={(text) => setName(text)}
            validate={
              (value: string) => getConfigurationNameValidator(existsNames)
                .validate(value)
                .error === null
            }
            validationMessage={
              getConfigurationNameValidator(existsNames).validate(name).error?.message
            }
            validateOnChange
            enableErrors
            floatOnFocus
            showCharCounter
            maxLength={30}
            fieldStyle={styles.withUnderline}
            hint="输入配置名称"
          />
          <Text text85 $textNeutralLight marginT-10 marginB-15>编辑模式</Text>
          <RadioGroup
            onValueChange={(value: ConfigurationMode) => setConfigMode(value)}
          >
            <RadioButton label="简单模式" value={ConfigurationMode.SIMPLE} marginB-10 />
            <RadioButton label="高级模式" value={ConfigurationMode.ADVANCE} />
          </RadioGroup>
        </View>
        <View>
          <View height={1.5} bg-grey70 />
          <View paddingV-15 paddingH-20 right row>
            <Button
              disabled={!isValid}
              onPress={() => onAdd(name, configMode)}
              marginR-10
              label="添加"
              size={Button.sizes.medium}
            />
            <Button onPress={onDismiss} label="取消" backgroundColor={Colors.$backgroundDangerHeavy} size={Button.sizes.medium} />
          </View>
        </View>
      </View>
    </Incubator.Dialog>
  );
};

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabled,
    paddingBottom: 4,
  },
});

export default AddConfigurationsModal;
