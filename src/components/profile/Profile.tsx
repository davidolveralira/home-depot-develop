import { useState } from "react";
import ProfileBasicDataShow from "./ProfileBasicDataShow";
import ProfileBasicDataEdit from "./ProfileBasicDataEdit";



const Profile = () => {

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    return (
        <div>
            {
                !edit && 
                <div>
                    <ProfileBasicDataShow changeEdit={handleEdit}/>
                </div>
            }
            {
                edit && 
                <div>
                    <ProfileBasicDataEdit changeEdit={handleEdit}/>
                </div>
            }
        </div>
    );
}
export default Profile;