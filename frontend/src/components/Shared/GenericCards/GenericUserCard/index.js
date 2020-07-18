import React, {useState} from "react";
import Fade from "react-reveal/Fade";
import {rem} from "polished";
import styled from "styled-components";
import avatar from "../../../../assets/images/user.png";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    AddButton,
    BaseButton,
    BlueButton,
    RedButton,
    RoundGreyButton,
} from "../../../../style/GlobalButtons";
import {Styledh2} from "../../../../style/GlobalTitles";
import {BaseInput} from "../../../../style/GlobalInputs";
import GenericChallengeCardSmall from "../GenericChallengeCardSmall";
import Error from "../../Error";
import {connect, useDispatch} from "react-redux";
import {resetError} from "../../../../store/actions/verificationAction";
import {editSpecificUserAction, getAllUsersAction} from "../../../../store/actions/userActions";

//////////
// STYLES
//////////
const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 140px;
  margin-bottom: 8px;
  overflow: hidden;
  > div:first-child {
    width: 90%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  div:last-child {
    margin-left: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const UserAvatar = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px rgba(221, 221, 221, 0.67);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 100px;
    height: 100px;
  }
`;

const UserCardBig = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
  height: 320px;
  margin-bottom: 8px;
  overflow: hidden;

  > div:first-child {
    display: flex;
    width: 100%;
    height: 85%;
    margin-bottom: 12px;
  }
`;

const EditUserInfo = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  border-right: 1px solid black;
  > div {
    margin-right: 12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const RoleDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 38px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const EditUserChallenge = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const ChallengeCategoryDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 38px;
  width: 100%;
  &:focus {
    outline: none;
  }
  option {
    padding: 16px;
  }
`;

const AddChallenge = styled.div`
  width: 30%;
  margin-left: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    margin-top: 16px;
  }
`;

const ChallengeList = styled.div`
  width: 70%;
  border: 1px solid #dbdbdb;
  margin-left: 12px;
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 8px;
  height: 100%;
`;

const DeleteSave = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InputLabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledInput = styled(BaseInput)`
  width: 100%;
  font-size: 14px;
  height: 6px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const UploadButton = styled(BaseButton)`
  height: 38px;
  width: 100%;
  border-radius: 5px;
  color: #767676;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  font-size: ${rem("14px")};
  :hover {
    border: 1px solid #9a9a9a;
    color: #363636;
  }
`;

//////////
// REACT
//////////

const GenericUserCard = ({user, non_field_error, fieldErrors, editSpecificUserAction}) => {
    const dispatch = useDispatch();

    const [isUserEditing, setUserEditing] = useState(false);

    const [data, setData] = useState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone ? user.phone : '',
        avatar: user.avatar,
        is_staff: user.is_staff
    });

    const editUserHandler = () => {
        setUserEditing(!isUserEditing);
    };

    const userSaveHandler = async (e) => {
        e.preventDefault();
        dispatch(resetError());
        const userData = new FormData();
        userData.append("email", data.email);
        userData.append("first_name", data.first_name);
        userData.append("last_name", data.last_name);
        userData.append("phone", data.phone);
        userData.append("is_staff", data.is_staff);
        // if (data.avatar) {
        //     userData.append("avatar", data.avatar);
        // }
        const response = await editSpecificUserAction(user.id, userData);
        if (response.status === 200) {
            setUserEditing(!isUserEditing);
            dispatch(getAllUsersAction())
        }
    };

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value});
    };

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const imageSelectHandler = e => {
        if (e.target.files[0]) {
            setData({...data, avatar: e.target.files[0]})
        }
    };


    return (
        <>
            {isUserEditing ? (
                <UserCardBig>
                    <div>
                        <EditUserInfo>
                            <div>
                                <InputLabelDiv>
                                    <StyledLabel>First Name:</StyledLabel>
                                    <StyledInput
                                        type="text"
                                        placeholder="First Name"
                                        required
                                        value={data.first_name}
                                        onChange={handleInput}
                                        name='first_name'
                                    />
                                    <Error errorMessage={fieldErrors['first_name']}/>
                                </InputLabelDiv>
                                <InputLabelDiv>
                                    <StyledLabel>Last Name:</StyledLabel>
                                    <StyledInput
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        value={data.last_name}
                                        onChange={handleInput}
                                        name='last_name'
                                    />
                                    <Error errorMessage={fieldErrors['last_name']}/>
                                </InputLabelDiv>
                                <InputLabelDiv>
                                    <StyledLabel>Email:</StyledLabel>
                                    <StyledInput
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={data.email}
                                        onChange={handleInput}
                                        name='email'
                                    />
                                    <Error errorMessage={fieldErrors['email']}/>
                                </InputLabelDiv>
                            </div>
                            <div>
                                <InputLabelDiv>
                                    <StyledLabel>Phone:</StyledLabel>
                                    <StyledInput
                                        type="¨tel"
                                        placeholder="Phone Nr."
                                        required
                                        value={data.phone}
                                        onChange={handleInput}
                                        name='phone'
                                    />
                                    <Error errorMessage={fieldErrors['phone']}/>
                                </InputLabelDiv>
                                <InputLabelDiv>
                                    <StyledLabel>Role:</StyledLabel>
                                    <RoleDropdown id="role" name="Role"
                                                  defaultValue={user.is_staff ? true : false}>
                                        <option value={true}>Staff</option>
                                        <option value={false}>Candidate</option>
                                    </RoleDropdown>
                                </InputLabelDiv>
                                <InputLabelDiv>
                                    <StyledLabel>Avatar:</StyledLabel>
                                    <BtnWrapper>
                                        <UploadButton onClick={handleClick}>Upload Avatar</UploadButton>
                                        <input
                                            type="file"
                                            name="avatar"
                                            ref={hiddenFileInput}
                                            onChange={imageSelectHandler}
                                            style={{display: 'none'}}
                                        />
                                    </BtnWrapper>
                                </InputLabelDiv>
                            </div>
                        </EditUserInfo>
                        <EditUserChallenge>
                            <AddChallenge>
                                <InputLabelDiv>
                                    <StyledLabel>Add Challenge:</StyledLabel>
                                    <ChallengeCategoryDropdown>
                                        <option value="fullstack">Full Stack</option>
                                        <option value="datascience">Data Science</option>
                                        <option value="reactredux">React & Redux</option>
                                        <option value="dockerdeployment">
                                            Docker & Deployment
                                        </option>
                                        <option value="aiforleaders">AI for Leaders</option>
                                        <option value="pythonprogramming">
                                            Python programming
                                        </option>
                                    </ChallengeCategoryDropdown>
                                </InputLabelDiv>
                                <BlueButton>Create Challenge</BlueButton>
                                <InputLabelDiv>
                                    <StyledLabel>User Created:</StyledLabel>
                                    <p>{`on ${user.date_joined.slice(0,10)}`}</p>
                                </InputLabelDiv>
                            </AddChallenge>
                            <ChallengeList>
                                <GenericChallengeCardSmall/>
                                <GenericChallengeCardSmall/>
                                <GenericChallengeCardSmall/>
                                <GenericChallengeCardSmall/>
                            </ChallengeList>
                        </EditUserChallenge>
                    </div>
                    <DeleteSave>
                        <RedButton>Delete</RedButton>
                        <Error errorMessage={non_field_error}/>
                        <BlueButton onClick={userSaveHandler}>Save</BlueButton>
                    </DeleteSave>
                </UserCardBig>
            ) : (
                <UserCard>
                    <UserInfo>
                        <UserAvatar>
                            <img src={user.avatar ? user.avatar : `https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`} alt="avatar"/>
                        </UserAvatar>
                        <div>
                            <Styledh2>{`${user.first_name} ${user.last_name}`}</Styledh2>
                            <p>{user.is_staff ? "Staff" : "Candidate"}</p>
                        </div>
                    </UserInfo>
                    <RoundGreyButton onClick={editUserHandler}>
                        <FontAwesomeIcon icon={["fas", "pencil-alt"]}/>
                    </RoundGreyButton>
                </UserCard>
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        fieldErrors: state.verificationReducer.verificationErrors,
        non_field_error: state.verificationReducer.non_field_error,
        allUsers: state.userReducer.allUsers
    }
};

export default connect(mapStateToProps, {editSpecificUserAction, getAllUsersAction})(GenericUserCard);