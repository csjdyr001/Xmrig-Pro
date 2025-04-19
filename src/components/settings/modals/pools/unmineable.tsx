import React from 'react';
import { Incubator } from 'react-native-ui-lib';
import { IPool, sharedStyles } from '.';

const hostname = 'rx.unmineable.com';
const port = 13333;

export const Unmineable:React.FC<IPool> = ({ onChange }) => {
  const [type, setType] = React.useState<string>('');
  const [wallet, setWallet] = React.useState<string>('');
  const [worker, setWorker] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');

  React.useEffect(() => {
    onChange({
      hostname,
      port,
      username: `${type}:${wallet}.${worker}${(code == "" || code == undefined || code == null) ? "" : ("#" + code)}`,
      password: `x`,
    });
  }, [type, wallet, worker, code]);

  return (
    <>
      <Incubator.TextField
        label="加密货币代码"
        value={type}
        onChangeText={setType}
        enableErrors
        floatOnFocus
        showCharCounter
        maxLength={128}
        fieldStyle={sharedStyles.withUnderline}
        hint="DOGE"
        placeholder="DOGE"
        marginB-10
      />
      <Incubator.TextField
        label="钱包地址"
        value={wallet}
        onChangeText={setWallet}
        enableErrors
        floatOnFocus
        showCharCounter
        maxLength={128}
        fieldStyle={sharedStyles.withUnderline}
        hint="46gPyHjLPPM8HaayVyvCDcF2..."
        placeholder="46gPyHjLPPM8HaayVyvCDcF2..."
        marginB-10
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
        marginB-10
      />
      <Incubator.TextField
        label="推荐代码"
        value={code}
        onChangeText={setCode}
        floatOnFocus
        showCharCounter
        maxLength={128}
        fieldStyle={sharedStyles.withUnderline}
        hint="3mqe-j4s1"
        placeholder="3mqe-j4s1"
        marginB-10
      />
    </>
  );
};
