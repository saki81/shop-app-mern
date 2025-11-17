import styled from "styled-components";
import { SlUser} from "react-icons/sl";
import { MdOutlineEmail} from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/apiCalls";
import useToaster from "../../hooks/useToaster";

const Profile = () => {

  const dispatch = useDispatch();
  const toaster = useToaster();

  const auth  = useSelector((state) => state.auth.currentUser)

  const [updatedProfile, setUpdatedProfile] = useState({
   
    username: auth?.username || "",
 
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleUpdate = async (e) => {
  e.preventDefault();

  const { username: newUsername } = updatedProfile;
  const { currentPassword, newPassword } = passwords;

  const isUsernameChanged = newUsername.trim() && newUsername !== auth?.username;
  const isPasswordFilled = currentPassword && newPassword;

  if (!isUsernameChanged && !isPasswordFilled) {
    toaster.showError("No changes to update", 3000);
    return;
  }

  // ✅ Update username
  if (isUsernameChanged) {
    const result = await updateUser(dispatch, auth._id, { username: newUsername.trim() });
    if (result.success) {
      toaster.showSuccess("Username updated", 2000);
    } else {
      toaster.showError(result.error, 5000);
      return;
    }
  }

  // ✅ Update password
  if (isPasswordFilled) {
    const result = await updateUser(dispatch, auth._id, { currentPassword, password: newPassword });
    if (result.success) {
      toaster.showSuccess("Password updated", 2000);
      setPasswords({ currentPassword: "", newPassword: "" });
    } else {
      toaster.showError(result.error, 5000);
      return;
    }
  }
};

  return (
    <ProfileUpdate>
      <Wrapper>
        <Title>Profile</Title>
        <UserTitle>Account Details</UserTitle>

        <UserInfo>
       
          <UserBox>
            <SlUser />
            <User>{auth?.username}</User>
          </UserBox>

          <UserBox>
            <MdOutlineEmail />
            <User>{auth?.email}</User>
          </UserBox>

          <UserEdit>Edit Profile</UserEdit>

          <FormEdit>
            <UpdateItem>
              <Label>Username</Label>
              <FormInput
                type="text"
                placeholder="Change Username"
                value={updatedProfile?.username}
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    username: e.target.value,
                  })
                }
              />
            </UpdateItem>

             <UpdateItem>
              <Label>Current Password</Label>
              <FormInput
                type="password"
                placeholder="Current Password"
                value={passwords?.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
              />
            </UpdateItem>

            <UpdateItem>
              <Label>New Password</Label>
              <FormInput
                type="password"
                placeholder="New Password"
                value={passwords?.newPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    newPassword: e.target.value,
                  })
                }
              />
            </UpdateItem>
          </FormEdit>

          <EditProfile onClick={handleUpdate}>Update</EditProfile>
        </UserInfo>
      </Wrapper>
    </ProfileUpdate>
  );
};

export default Profile;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0;
`;
const Title = styled.h1`
  padding:  60px 0;
`;
const ProfileUpdate = styled.section`
  
`;
const UserTitle = styled.h2`
padding-bottom: 20px;
`;
const UserInfo = styled.div`
 
`;
const UserBox = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: start;
  align-items: center;
  margin-top: -10px;
`;
const User = styled.h3`
  margin-left: 30px;
`;
const UserEdit = styled.h2`
  margin-top: 60px;
  text-align: center;
`;
const FormEdit = styled.form`
  
`;
const UpdateItem = styled.div`

`;
const Label = styled.h3`
  margin-bottom: 5px;
`;
const FormInput = styled.input`
  padding: 5px 5px;
  width: 310px;
`;
const EditProfile = styled.button`
  
`;

