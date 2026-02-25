
import {App} from "./App";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import { LoginForm } from "@/features/auth/components/Login"
import {SignupForm} from '@/features/auth/components/Register'
import ResetPassword from '@/features/auth/components/ResetPassword'
import MainLayout from '@/components/shared/MainLayout'
import { ProtectedRoute, PublicRoute } from '@/features/auth/components/ProtectedRoute'

// Hon Su Viet feature
import HonSuVietLayout from '@/features/hon-su-viet/layouts/HonSuVietLayout'
import {Home} from '@/features/hon-su-viet/pages/HomePage'
import HonSuVietLessons from '@/features/hon-su-viet/pages/LessonsPage'
import HonSuVietLessonDetail from '@/features/hon-su-viet/pages/LessonDetailPage'
import HonSuVietTests from '@/features/hon-su-viet/pages/TestsPage'
import HonSuVietResources from '@/features/hon-su-viet/pages/ResourcesPage'
import HonSuVietForum from '@/features/hon-su-viet/pages/ForumPage'
import HonSuVietDictionary from '@/features/hon-su-viet/pages/DictionaryPage'
import HonSuVietGames from '@/features/hon-su-viet/pages/GamesPage'

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: ProtectedRoute, 
        children: [
          {
            Component: MainLayout,
            children: [
            ],
          },
        ],
      },
      {
        path: "auth",
        Component: PublicRoute, 
        children: [
          {
            Component: AuthLayout,
            children: [
              { path: "login", Component: LoginForm },
              { path: "register", Component: SignupForm },
              { path: "reset-password", Component: ResetPassword },
            ],
          },
        ],
      },
      {
        path: "hon-su-viet",
        Component: HonSuVietLayout,
        children: [
          { index: true, Component: Home },
          { path: "lessons", Component: HonSuVietLessons },
          { path: "lessons/:id", Component: HonSuVietLessonDetail },
          { path: "tests", Component: HonSuVietTests },
          { path: "resources", Component: HonSuVietResources },
          { path: "forum", Component: HonSuVietForum },
          { path: "dictionary", Component: HonSuVietDictionary },
          { path: "games", Component: HonSuVietGames },
        ],
      },
    ],
  },
];

export default routes;