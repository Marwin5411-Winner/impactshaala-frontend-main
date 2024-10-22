import React from "react";

//imapactshaala pages

import Login from "../impactshaala/pages/login/index";
import ForgetPassword from "../impactshaala/pages/ForgetPassWord";
import Onboarding from '../impactshaala/pages/onboarding2';

// home page

import Home from "../impactshaala/pages/home/index";
import Profile from "../impactshaala/pages/home/components/Profile";

//project page

import Project from "../impactshaala/pages/projects/index";

//project details page

import ProjectDetailsIndex from "../impactshaala/pages/projectDetails/index";
import CreatePost from "../impactshaala/pages/posts/create-post";
import CreateProjectsInitiativesPost from "../impactshaala/pages/posts/create-projects-initiatives-post";
import CreatePollsQuestionsPost from "../impactshaala/pages/posts/create-polls-questions-post";
import CreateMediaPost from "../impactshaala/pages/posts/create-media-post";
import Chat from "../impactshaala/pages/chats/newChat";
import CreateCollab from "../impactshaala/pages/collab/create-collab";
import SavedPosts from "../impactshaala/pages/posts/saved-posts";
import EditProfile from "../impactshaala/pages/editProfile";
import MyProfile from "../impactshaala/pages/myProfile";
import AccountSettings from "../impactshaala/pages/accountSettings";
import Notification from "../impactshaala/pages/notifications/notification";
import CollaborationRequests from "../impactshaala/pages/collabRequests/collabRequests";
import InternshipApply from "../impactshaala/pages/job_or_internship/application";
import CreatePosting from "../impactshaala/pages/job_or_internship/createPosting";
import Search from "../impactshaala/pages/search/search";
import SettingsPage from "../impactshaala/pages/settings";
import ManageAdmins from "../impactshaala/pages/settings/ManageAdmin/ManageAdmins";
import AddAdmin from "../impactshaala/pages/settings/ManageAdmin/AddAdmin";
import UpdateAdmin from "../impactshaala/pages/settings/ManageAdmin/UpdateAdmin";
import ProfileDetails from "../impactshaala/pages/profileDetails";
import MyProject from "../impactshaala/pages/myProject";
import ChatSettings from "../impactshaala/pages/settings/ChatSettings/ChatSettings";
import VerifyAccount from "../impactshaala/pages/verifyAccount";
import ResetPassword from "../impactshaala/pages/resetPassword";
import { Navigate } from "react-router-dom";
import SignupSuccess from "../impactshaala/pages/signupSuccess/SignupSuccess";
import Success from "../impactshaala/pages/success/success";
import ComingSoon from "../impactshaala/pages/comingSoon/comingSoon";
import EditMediaPost from "../impactshaala/pages/posts/edit-media-post";
import EditPoll from "../impactshaala/pages/posts/edit-poll";
import GiveUsAReview from "../impactshaala/pages/giveUsAReview/index";
import RequirementForm from "../impactshaala/pages/requirementForm";
import AccomplishmentForm from "../impactshaala/pages/accomplishment/add";
import AccomplishmentPage from "../impactshaala/pages/accomplishment";
import CollaborativeAccomplishmentForm from "../impactshaala/pages/collabAccomplishment/add";



// this routes are rendered in the default layout
export const DefaultRouter = [
  {
    path: "/",
    element: <ComingSoon />
  },
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/signup-success",
    element: <SignupSuccess />
  },
  {
    path: "/dashboard/success",
    element: <Success />
  },
  {
    path: "/ForgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/test",
    element: <Profile />,
  },
  {
    path: "/project",
    element: <Project />,
  },
  {
    path: "/giveusareview",
    element: <GiveUsAReview/>
  },
  {
    path: "/requirement-form",
    element: <RequirementForm />
  },
  {
    path:"/project/:id",
    element:<ProjectDetailsIndex/>
  },
  {
    path:"/posts/create-post",
    element:<CreatePost/>
  },
  {
    path:"/posts/create-projects-initiatives-post",
    element:<CreateProjectsInitiativesPost/>
  },
  {
    path:"/posts/create-polls-questions-post",
    element:<CreatePollsQuestionsPost/>
  },
  {
    path: "/posts/edit-poll",
    element: <EditPoll />
  },
  {
    path:"/posts/create-media-post",
    element:<CreateMediaPost/>
  },
  {
    path: "/posts/edit-media-post",
    element: <EditMediaPost />
  },
  {
    path:"/posts/saved",
    element:<SavedPosts />
  },
  {
    path:"/chats",
    element:<Chat/>
  },
  {
    path: "/collab/create-collab",
    element: <CreateCollab />
  },
  {
    path: "/collab/requests",
    element: <CollaborationRequests />
  },
  {
    path: "/dashboard/app/edit-profile",
    element: <EditProfile />
  },
  {
    path: "/dashboard/app/profile",
    element: <MyProfile />
  },
  {
    path: "/dashboard/app/user-account-setting",
    element: <AccountSettings />
  },
  {
    path: "/notifications",
    element: <Notification />
  },
  {
    path: "/job-or-internship/apply",
    element: <InternshipApply />
  },
  {
    path: "/job-or-internship/create-posting",
    element: <CreatePosting />
  },
  {
    path: "/dashboard/search",
    element: <Search />
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/chat-settings",
    element: <ChatSettings />
  },
  {
    path: "/settings/manage-admins",
    element: <ManageAdmins />
  },
  {
    path: "/settings/add-admin",
    element: <AddAdmin />
  },
  {
    path: "/settings/update-admin",
    element: <UpdateAdmin />
  },
  {
    path: "/profile-details/:id",
    element: <ProfileDetails />
  },
  {
    path: "/dashboard/my-profile",
    element: <MyProfile />
  },
  {
    path: "/dashboard/my-projects/:id",
    element: <MyProject />
  },
  {
    path: "/verify-account/:id",
    element: <VerifyAccount />
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />
  },
  {
    path: "/accomplishment/add",
    element: <AccomplishmentForm />
  },
  {
    path: "/accomplishment",
    element: <AccomplishmentPage />
  },
  {
     path: "/collab-accomplishment/add",
     element: <CollaborativeAccomplishmentForm />
  }
];
