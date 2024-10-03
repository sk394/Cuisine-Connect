import { getServerSession } from "next-auth";
import { authOptions } from "../libs/auth";
import PageWrapper from "@/components/page-wrapper";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    return (
        <PageWrapper>
            <h1>Recipes Feed Section</h1>
        </PageWrapper>
    );
}

export default DashboardPage;