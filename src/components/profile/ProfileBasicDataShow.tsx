import { useEffect, useState } from "react";
import axiosInstance from '../../config/axios';
import { cloneDeep } from "lodash";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

export type UserBasicInformation = {
    firstName: string;
    lastName: string;
    zipcode: string;
};

export type ProfileBasicDataShowProps = {
    changeEdit: () => void;
};

const ProfileBasicDataShow = ({ changeEdit }: ProfileBasicDataShowProps) => {

    const [basicInformation, setBasicInformation] = useState<UserBasicInformation>({
        firstName: '',
        lastName: '',
        zipcode: ''
    });

    const getBasicInformation = async () => {
        try {
            const response = await axiosInstance.get<null, AxiosResponse<UserBasicInformation> | AxiosError>("/api/basic-information");
            console.log("response ->", response);
            if (isAxiosError(response)) {
                alert("Error from get basic information");
                throw response;
            }
            const { data } = response;
            console.log(data)
            setBasicInformation(cloneDeep(data));   
        } catch (err) {
            alert("Error from get basic information");
            console.log(err);
        }
    }

    useEffect(() => {
        getBasicInformation();
      }, []);

    return (
        <div>   
            <div className="row">
                <div className="col-10">
                    <h3>PERSONAL DETAILS</h3>
                </div>
                <div className="col-2 mt-2">
                    <p className="text-decoration-underline cursor-pointer" onClick={changeEdit}>Edit</p>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <p>
                        <strong>First Name</strong>
                    </p>
                </div>
                <div className="col-6">
                    <p>{basicInformation.firstName}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <p>
                        <strong>Last Name</strong>
                    </p>
                </div>
                <div className="col-6">
                    <p>{basicInformation.lastName}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <p>
                        <strong>Zipcode</strong>
                    </p>
                </div>
                <div className="col-6">
                    <p>{basicInformation.zipcode}</p>
                </div>
            </div>
        </div>
    );
}
export default ProfileBasicDataShow;