import React from "react";

import { RoutePaths } from "./RoutePaths";

import AvlPage from "../pages/Animations/DataStructure/AvlPage";
import BSTreePage from "../pages/Animations/DataStructure/BSTreePage";
import HeapPage from "../pages/Animations/DataStructure/HeapPage";
import QueuePage from "../pages/Animations/DataStructure/QueuePage";
import StackPage from "../pages/Animations/DataStructure/StackPage";
import { BucketSortPage } from "../pages/Animations/sorts/BucketSortPage";
import CountingSortPage from "../pages/Animations/sorts/CountingSortPage";
import InsertionSortPage from "../pages/Animations/sorts/InsertionSortPage";
import MergeSortPage from "../pages/Animations/sorts/MergeSortPage";
import QuickSortPage from "../pages/Animations/sorts/QuickSortPage";
import RadixSortPage from "../pages/Animations/sorts/RadixSortPage";
import ChangePassword from "../pages/ChangePassword";
import EditProfilePage from "../pages/EditProfilePage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import AddFeedbackPage from "../pages/general/AddFeedBackPage";
import AlgorithmsReportPage from "../pages/general/AlgorithmsReportsPage";
import FeedbacksPage from "../pages/general/FeedbacksPage";
import GeneralReportsPage from "../pages/general/GeneralReportsPage";
import ReportsPage from "../pages/general/ReportsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterLecturerPage from "../pages/RegisterLecturerPage";
import RegistrationPage from "../pages/RegistrationPage";
import TwoFactorAuthPage from "../pages/TwoFactorAuthPage";
import LinkedListPage from "../pages/Animations/DataStructure/LinkedListPage";
import DFSPage from "../pages/Animations/DataStructure/DFSPage";
import HashTablePage from "../pages/Animations/DataStructure/HashTablePage";
import BellmanFordPage from "../pages/Animations/DataStructure/BellmanFordPage";

export interface RouteItem {
  path: string;
  element: React.ComponentType;
}

// route for non-logged in users
export const publicRoutes: RouteItem[] = [
  { path: RoutePaths.HOME, element: HomePage },
  { path: RoutePaths.LOGIN, element: LoginPage },
  { path: RoutePaths.REGISTER, element: RegistrationPage },
  { path: RoutePaths.FORGOT_PASSWORD, element: ForgotPasswordPage },
  { path: RoutePaths.TWO_FA, element: TwoFactorAuthPage },
  { path: RoutePaths.VERIFY_EMAIL, element: EmailVerificationPage },
  { path: RoutePaths.POST_FEEDBACK, element: AddFeedbackPage },
];

export const userRoutes: RouteItem[] = [
  { path: RoutePaths.HOME, element: HomePage },
  { path: RoutePaths.POST_FEEDBACK, element: AddFeedbackPage },
  { path: RoutePaths.PROFILE, element: ProfilePage },
  { path: RoutePaths.EDIT_PROFILE, element: EditProfilePage },
  { path: RoutePaths.CHANGE_PASSWORD, element: ChangePassword },

  // Animations
  { path: RoutePaths.STACK, element: StackPage },
  { path: RoutePaths.QUEUE, element: QueuePage },
  { path: RoutePaths.HEAP, element: HeapPage },
  { path: RoutePaths.BST, element: BSTreePage },
  { path: RoutePaths.AVL, element: AvlPage },
  { path: RoutePaths.LINKED_LIST, element: LinkedListPage },
  { path: RoutePaths.HASH_TABLE, element: HashTablePage },
  { path: RoutePaths.QUICK_SORT, element: QuickSortPage },
  { path: RoutePaths.INSERTION_SORT, element: InsertionSortPage },
  { path: RoutePaths.COUNTING_SORT, element: CountingSortPage },
  { path: RoutePaths.MERGE_SORT, element: MergeSortPage },
  { path: RoutePaths.BUCKET_SORT, element: BucketSortPage },
  { path: RoutePaths.RADIX_SORT, element: RadixSortPage },
  { path: RoutePaths.DFS, element: DFSPage },
  { path: RoutePaths.BELLMAN_FORD, element: BellmanFordPage },
];

export const lecturerRoutes: RouteItem[] = [
  { path: RoutePaths.REPORTS, element: ReportsPage },
  { path: RoutePaths.REGISTER_LECTURER, element: RegisterLecturerPage },
  { path: RoutePaths.GENERAL_REPORTS, element: GeneralReportsPage },
  { path: RoutePaths.ALGORITHMS_REPORTS, element: AlgorithmsReportPage },
  { path: RoutePaths.ALL_FEEDBACKS, element: FeedbacksPage },
];
