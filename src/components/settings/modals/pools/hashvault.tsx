import React from 'react';
import { Incubator } from 'react-native-ui-lib';
import { IPool, sharedStyles } from '.';
import { validateWalletAddress } from '../../../../core/utils';

const hostname = 'pool.hashvault.pro';
const port = 80;

export const HashVault:React.FC<IPool> = ({ onChange }) => {
  const [wallet, setWallet] = React.useState<string>('');
  const [worker, setWorker] = React.useState<string>('');

  React.useEffect(() => {
    onChange({
      hostname,
      port,
      username: `${wallet}`,
      password: `${worker}`,
    });
  }, [wallet, worker]);

  return (
    <>
      <Incubator.TextField
        label="钱包地址"
        value={wallet}
        onChangeText={setWallet}
        validate={['required', (value: string) => validateWalletAddress(value)]}
        validationMessage={['必须', '钱包验证失败']}
        validateOnChange
        enableErrors
        floatOnFocus
        showCharCounter
        maxLength={128}
        fieldStyle={sharedStyles.withUnderline}
        hint="46gPyHjLPPM8HaayVyvCDcF2..."
        placeholder="46gPyHjLPPM8HaayVyvCDcF2..."
        marginB-10
        numberOfLines={1}
        textBreakStrategy="simple"
      />
      <Incubator.TextField
        label="工人名称"
        value={worker}
        onChangeText={setWorker}
        floatOnFocus
        showCharCounter
        maxLength={128}
        fieldStyle={sharedStyles.withUnderline}
        hint="Worker1"
        placeholder="Worker1"
      />
    </>
  );
};
