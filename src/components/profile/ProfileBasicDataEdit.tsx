import { UserBasicInformation } from './ProfileBasicDataShow';
import { useEffect, useState } from 'react';
import { AxiosResponse, AxiosError, isAxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import axiosInstance from '../../config/axios';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

export type ProfileBasicDataEditProps = {
    changeEdit: () => void;
};

const ProfileBasicDataEdit = ({ changeEdit }: ProfileBasicDataEditProps) => {
    const [basicInformation, setBasicInformation] = useState<UserBasicInformation>({
        firstName: '',
        lastName: '',
        zipcode: ''
    });

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("First Name is required")
            .min(2, "First Name must be at least 2 characters"),
        lastName: Yup.string()
            .required("Last Name is required")
            .min(2, "Last Name must be at least 2 characters"),
        zipcode: Yup.string()
            .required("Zipcode is required")
            .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Zipcode must be at leat 5 digits")
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
            console.log("data del edit",data)
            setBasicInformation(cloneDeep(data));  
        } catch (err) {
            alert("Error from get basic information");
            console.log(err);
        }
    }

    const handleSubmit = async (values: UserBasicInformation, { setSubmitting }: FormikHelpers<UserBasicInformation>) => {
        console.log('Form values', values);
        try {
            const response = await axiosInstance.put<
              null,
              AxiosResponse | AxiosError
            >("/api/user/edit", values);
            if (isAxiosError(response)) {
              console.log('Error is an axios error')
            } else {
                console.log('success')
                changeEdit();
            }
          } catch (error) {
            console.log("Error", error)
          } finally {
            setSubmitting(false);
          }
    }

    useEffect(() => {
        getBasicInformation();
      }, []);

      return (
        <div>
            <Formik
                initialValues={basicInformation}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <div className='form-group'>
                                <label htmlFor='firstName'>First Name</label>
                                <Field 
                                    type="text"
                                    name="firstName"
                                    className="form-edit"
                                />
                                <ErrorMessage name="firstName" component="div" className='text-danger' />
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label htmlFor='lasttName'>Last Name</label>
                                <Field 
                                    type="text"
                                    name="lastName"
                                    className="form-edit"
                                />
                                <ErrorMessage name="lastName" component="div" className='text-danger' />
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label htmlFor='zipcode'>Zipcode</label>
                                <Field 
                                    type="text"
                                    name="zipcode"
                                    className="form-edit"
                                />
                                <ErrorMessage name="zipcode" component="div" className='text-danger' />
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='col-6'> 
                                    <button type="submit" className='button-edit' disabled={isSubmitting}>
                                        Save Change
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <button className='button-cancel' disabled={isSubmitting}
                                    onClick={changeEdit}>
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </Form>
                    )
                }

            </Formik>
        </div>
      );

}

export default ProfileBasicDataEdit;