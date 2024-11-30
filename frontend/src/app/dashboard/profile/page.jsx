import { getProfileDetails } from "@/app/api/profile";
import { authOptions } from "@/app/libs/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Sidebar from "@/components/dashboard-layout/sidebar";
import MyProfileComponent from "@/components/my-profile";
import PageWrapper from "@/components/page-wrapper";
import { getServerSession } from "next-auth";
import React from "react";
import { SmoothScrollProvider } from "../../../../providers/smooth-scroll-provider";


const ProfilePage = async () => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'My Profile', link: '/dashboard/profile' }
    ];
    const session = await getServerSession(authOptions);
    const userProfile = await getProfileDetails(session?.user?.sub);

    return (
        <SmoothScrollProvider>
       <PageWrapper>
        <div className="pl-20">
            <Breadcrumbs items={breadcrumbItems} />
            <MyProfileComponent userProfile={userProfile?.data} />
        </div>
       </PageWrapper>
       </SmoothScrollProvider>
    );
};

export default ProfilePage;