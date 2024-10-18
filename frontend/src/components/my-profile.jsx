import { Bell, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import EditProfileDialog from "./edit-profile-dialog";
import Image  from "next/image";
import { Card, CardHeader, CardContent } from "./ui/card";


const MyProfileComponent = ({ userProfile }) => {
    const starRating = Math.floor(userProfile?.howdyFoody) ?? 0;
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Card className="relative bg-gray-800">
                    <CardHeader className="flex items-center pl-auto pr-auto justify-center pb-0">
                        <div className="relative justify-between items-center">
                            {/* <Image
                                src={userProfile?.imageName}
                                alt="Profile Picture"
                                width={128}
                                height={128}
                                className="rounded-full"
                            /> */}
                            <img src={userProfile?.image} alt={userProfile.image} className="w-40 h-40 object-cover rounded-full  px-2" />
                            <EditProfileDialog user={userProfile} />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-3 text-center">
                        <h1 className="text-2xl font-bold">{userProfile?.name}</h1>
                        <p className="text-gray-500 mb-4">{userProfile?.email}</p>
                        <div className="grid grid-cols-2 gap-6 xs:grid-cols-1 mb-3">
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">What foods Do I like?</h2>
                                    {userProfile?.foodPreferences?.map((food, index) =>
                                        <p key={index} className="space-x-2">
                                            {food}
                                        </p>)
                                    }
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">What Is Your Favorite Food?</h2>
                                    <p>{userProfile?.favoriteFood}</p>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">Where Am I From?</h2>
                                    <p>{userProfile?.hometown}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">Streak & Posts History</h2>
                                <div className="flex flex-wrap space-y-1 space-x-1 ">
                                    {[...Array(starRating)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`h-4 w-4 text-yellow-400 `}
                                        />
                                    ))}
                                    <blockquote className="text-sm font-sans italic">"The stars above shows the average rating for your recipes."</blockquote>
                                </div>
                                <div className="mt-6 justify-between mx-auto">
                                    <TooltipProvider>
                                        <Tooltip className="border-6">
                                            <TooltipTrigger asChild>
                                                <Badge className="space-x-2 rounded-lg cursor-pointer">
                                                    <Bell className="fill-current" />
                                                    <span className="text-lg">{userProfile?.streak}</span>
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent className="flex flex-wrap w-60 bg-white border-red-100">
                                                <div className="flex flex-col items-center justify-center mb-4">
                                                    <Bell className="fill-current w-10 h-10 rounded-full justify-center bg-gray-200 p-2 mb-4" />
                                                    <p className="text-black text-lg font-semibold items-center mb-2">Your FoodyScore</p>
                                                    <Badge className="w-10 mb-4 rounded-md justify-center text-blue-600 font-bold">{userProfile?.streak}</Badge>
                                                    <p className="font-mono text-lg">Your foody-score increases when you maintain a streak of posting recipes daily.</p>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MyProfileComponent;
