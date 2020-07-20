import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";
import { BaseContainer, PageContainer } from "../../../../style/GlobalWrappers";
import { Styledh1 } from "../../../../style/GlobalTitles";
import { BigRedButton } from "../../../../style/GlobalButtons";
import { BaseInput } from "../../../../style/GlobalInputs";
import { connect, useDispatch } from "react-redux";
import { loginAction } from "../../../../store/actions/loginActions";
import Error from "../../../Shared/Error";
import { resetError } from "../../../../store/actions/verificationAction";

//////////
// STYLE
//////////

const LoginContainer = styled(BaseContainer)`
  padding-bottom: 40px;
  width: ${rem("700px")};
  height: ${rem("700px")};
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled(BaseInput)`
  width: ${rem("414px")};
  height: ${rem("72px")};
  border: transparent;
`;

const InteriorContainer = styled.div`
  height: ${rem("350px")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const EmailField = styled.div`
  padding-left: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const PasswordField = styled.div`
  padding-left: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${rem("20px")};
`;

//////////
// REACT
//////////

const Login = ({ loginAction, history, fieldErrors, non_field_error }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputHandler = (e, func) => {
    func(e.currentTarget.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(resetError());
    const loginData = { email, password };
    const response = await loginAction(loginData);
    if (response.status === 200) {
      history.push("/");
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Styledh1>Login</Styledh1>
        <InteriorContainer>
          <EmailField>
            <Icon icon={["fas", "user"]} />
            <LoginInput
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => inputHandler(e, setEmail)}
            />
          </EmailField>
          <Error errorMessage={fieldErrors["email"]} />
          <PasswordField>
            <Icon icon={["fas", "lock"]} />
            <LoginInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => inputHandler(e, setPassword)}
              required
            />
          </PasswordField>
          <Error errorMessage={fieldErrors["password"]} />
          <BigRedButton onClick={onSubmitForm}>Login</BigRedButton>
          <Error errorMessage={non_field_error} />
        </InteriorContainer>
      </LoginContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    fieldErrors: state.verificationReducer.verificationErrors,
    non_field_error: state.verificationReducer.non_field_error,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);
