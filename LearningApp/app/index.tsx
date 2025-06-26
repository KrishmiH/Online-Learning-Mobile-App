import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../src/context/AuthContext';
import { router } from 'expo-router';
import colors from '../src/styles/colors';

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<LoginFormData>();
  const { signIn } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.username, data.password);
      router.replace('/redirect'); // or redirect by role
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎓 EduSmart</Text>
      <Text style={styles.subtext}>Empower your learning journey with our smart mobile app!</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter username"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              autoCapitalize="none"
            />
          )}
        />

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
            />
          )}
        />

        <Button title="Sign In" onPress={handleSubmit(onSubmit)} color={colors.primary} />
        
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.registerText}>Don’t have an account? <Text style={{ color: colors.secondary }}>Register</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    textAlign: 'center',
    color: colors.lightText,
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    color: colors.text,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.lightText,
  },
});
