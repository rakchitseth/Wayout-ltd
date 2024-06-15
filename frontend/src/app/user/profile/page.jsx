'use client';
import { Button, FileButton, Grid, Group, Image, TextInput, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconLock, IconUpload, IconUserSquareRounded } from "@tabler/icons-react";
import { Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const UserProfile = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(typeof window !== 'undefined' ? sessionStorage.getItem('user') : null));

    const [profileData, setProfileData] = useState(null);

    const fetchProfileData = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getprofile`, {
            headers: {
                'x-auth-token': currentUser.token
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setProfileData(data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchProfileData();
    }, [])

    const handleSubmitForm = async (values) => {
        console.log(values);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${profileData._id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res.status);

        if (res.status === 200) {
            enqueueSnackbar('Profile Updated successfully', { variant: 'success' });
            const data = await res.json();
            console.log(data);
            setCurrentUser(data);
            if(typeof window !== 'undefined')
            sessionStorage.setItem('user', JSON.stringify(data));

        } else {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }

    }

    const handleFileUpload = async (file) => {
        // const file = e.target.files[0];
        const fd = new FormData();
        fd.append("myfile", file);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/uploadfile`, {
            method: "POST",
            body: fd,
        });
        if (res.status === 200) {
            console.log("file uploaded");
            // enqueueSnackbar('Profile Image Uploaded', { variant: 'success' });

            await handleSubmitForm({ avatar: file.name });
        }
    }

    return (
        <div>
            <Title order={1} mb="lg">Manage Profile</Title>
            {
                profileData !== null && (
                    <Formik initialValues={profileData} onSubmit={handleSubmitForm}>
                        {(profileForm) => (
                            <form onSubmit={profileForm.handleSubmit}>
                                <Grid gutter={{ base: 'xl' }}>
                                    <Grid.Col span={{ base: 12, md: 4 }}>

                                        <Image w="100%" h={300}
                                            fit="contain" src={`${process.env.NEXT_PUBLIC_API_URL}/${currentUser.avatar}`} alt="" />

                                    </Grid.Col>
                                    <Grid.Col my="auto" h="100%" span={{ base: 12, md: 8 }}>

                                        <TextInput
                                            mb="lg"
                                            required
                                            label="Name"
                                            leftSection={<IconUserSquareRounded style={{ width: rem(16), height: rem(16) }} />}
                                            id="name"
                                            onChange={profileForm.handleChange}
                                            value={profileForm.values.name}
                                            radius="md"
                                        />
                                        <TextInput
                                            mb="lg"
                                            required
                                            label="Email Address"
                                            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                                            id="email"
                                            onChange={profileForm.handleChange}
                                            value={profileForm.values.email}
                                            radius="md"
                                        />
                                        <TextInput
                                            mb="lg"
                                            required
                                            label="Password"
                                            leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
                                            id="password"
                                            onChange={profileForm.handleChange}
                                            value={profileForm.values.password}
                                            radius="md"
                                        />
                                        <Group mt="lg">
                                            <FileButton accept="image/png,image/jpeg" onChange={handleFileUpload}>
                                                {(props) => <Button color="red" radius="md" {...props} leftSection={<IconUpload size={14} />}> Upload Profile Image</Button>}
                                            </FileButton>
                                            <Button

                                                radius="md"
                                                type='submit'
                                            >Submit</Button>

                                        </Group>


                                    </Grid.Col>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                )
            }
        </div>
    )
}

export default UserProfile;