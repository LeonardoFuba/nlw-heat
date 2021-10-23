import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SignInBox(){
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        backgroundColor={COLORS.YELLOW}
        color={COLORS.BLACK_PRIMARY}
        title="ENTRAR COM GITHUB"
        icon="github"
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  );
}
