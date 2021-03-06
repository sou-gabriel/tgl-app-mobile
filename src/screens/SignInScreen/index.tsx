import React from "react";
import { ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  HighlightText,
  Input,
  SubmitButton,
  RedirectButton,
  Footer,
} from "@components";
import { useAuth } from "@shared/hooks/useAuth";

import {
  AuthContainer,
  Title,
  Form,
  ChangePasswordButtonContainer,
  ChangePasswordButton,
  ChangePasswordText,
} from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Campo de e-mail inválido")
    .required("O campo de e-mail é obrigatório"),
});

export const SignInScreen = ({
  navigation,
}: NativeStackScreenProps<ParamListBase>) => {
  const { onUserLogin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <ScrollView>
      <HighlightText />

      <AuthContainer>
        <Title>Authentication</Title>
        <Form>
          <Input
            name="email"
            control={control}
            placeholder="Email"
            autoCorrect={false}
            error={errors.email && errors.email.message}
          />
          <Input
            name="password"
            control={control}
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry
          />

          <ChangePasswordButtonContainer>
            <ChangePasswordButton
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <ChangePasswordText>I forgot my password</ChangePasswordText>
            </ChangePasswordButton>
          </ChangePasswordButtonContainer>

          <SubmitButton title="Login" onPress={handleSubmit(onUserLogin)} />
        </Form>
      </AuthContainer>

      <RedirectButton
        title="Sign Up"
        onRedirectButtonClick={() => navigation.navigate("SignUp")}
        arrowDirection="right"
      />

      <Footer />
    </ScrollView>
  );
};
