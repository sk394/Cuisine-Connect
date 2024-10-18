-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteFood" TEXT DEFAULT 'pizza',
ADD COLUMN     "foodPreferences" TEXT[] DEFAULT ARRAY['pizza']::TEXT[],
ADD COLUMN     "hometown" TEXT DEFAULT 'New York',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
