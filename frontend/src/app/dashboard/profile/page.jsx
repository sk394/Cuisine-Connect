import { getProfileDetails } from "@/app/api/profile";
import { authOptions } from "@/app/libs/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import MyProfileComponent from "@/components/my-profile";
import PageWrapper from "@/components/page-wrapper";
import { getServerSession } from "next-auth";
import React from "react";


const ProfilePage = async () => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'My Profile', link: '/dashboard/profile' }
    ];
    const session = await getServerSession(authOptions);
    const userProfile = await getProfileDetails(session?.user?.sub);

    return (
       <PageWrapper>
        <div className="pl-20">
            <Breadcrumbs items={breadcrumbItems} />
            <MyProfileComponent userProfile={userProfile?.data} />
        </div>
       </PageWrapper>
    );
};

export default ProfilePage;