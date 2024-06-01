export enum RoutePaths {
  HOME = "/",

  // Auth
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgotPassword",
  CHANGE_PASSWORD = "/changePassword",
  REGISTER_LECTURER = "/register-lecturer",
  TWO_FA = "/2fa",
  VERIFY_EMAIL = "/verify-email/:token",

  PROFILE = "/profile",
  EDIT_PROFILE = "/edit-profile",

  // reports
  REPORTS = "/reports",
  GENERAL_REPORTS = "/reports/general",
  ALGORITHMS_REPORTS = "/reports/algorithms",

  // Animations
  STACK = "/stack",
  QUEUE = "/queue",
  HEAP = "/heap",
  BST = "/bst",
  AVL = "/avl",
  LINKED_LIST = "/linkedlist",
  QUICK_SORT = "/quicksort",
  INSERTION_SORT = "/insertionsort",
  COUNTING_SORT = "/countingsort",
  MERGE_SORT = "/mergesort",
  BUCKET_SORT = "/bucketsort",
  RADIX_SORT = "/radixsort",

  // feedbacks
  POST_FEEDBACK = "/post-feedback",
  ALL_FEEDBACKS = "/all-feedbacks",
}

export default RoutePaths;
