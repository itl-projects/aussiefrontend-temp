import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Owner from "@/views/Owner";
import HostResult from "@/views/HostResult";
// import PerfectMatch from "@/views/PerfectMatch";
import PerfectMatchHome from "@/views/PerfectMatchHome";
import HostAccount from "@/views/HostAccount";
import HostDashboard from "@/components/Host/Dashboard";
import Message from "@/components/commons/Message";
// import MessageBox from "@/components/commons/MessageBox";
import CanceledBookings from "@/components/commons/CanceledBookings";
import Booking from "@/components/commons/Booking";
import Photos from "@/components/commons/Photos";
import Account from "@/components/Owner/Account";
import Profile from "@/components/Owner/Profile";
import Emergency from "@/components/Owner/Emergency";
import Pet from "@/components/Owner/Pet";
import Settings from "@/components/Owner/Settings";
import HostSetting from "@/components/Host/Settings";
import HostProfile from "@/components/Host/Profile";
import HostBooking from "@/components/Host/Booking";
import PageNotFound from "@/views/PageNotFound";
import HostDetailPage from "@/views/HostDetails";
// import ShopPage from "@/views/Shop";
import ShopHome from "@/views/ShopHome";
import Shop from "@/components/Shop/Shop";
import FilterPage from "@/components/Shop/FilterPage";
import OwnerContract from "@/components/Owner/Contract";
import HostContract from "@/components/Host/Contract";
import HostQuiz from "@/components/Host/Quiz";
import Wallet from "@/components/Host/Wallet";
import DatingProfile from "@/views/DatingProfile";
import DatingHome from "@/views/DatingHome";
import PetCrush from "@/views/PetCrush";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Login,
  },
  // {
  //   path: "/hostsearch",
  //   component: HostResult
  // },
  {
    path: "/hostsearch",
    component: HostResult,
    props: {
      city: true,
      service: true,
      start_date: false
    },
  },
  {
    path: "/perfect-match",
    name: "PerfectMatchHome",
    component: PerfectMatchHome,
  },
  {
    path: "/dating-profile",
    name: "DatingProfile",
    component: DatingProfile,
  },
  {
    path: "/dating-home",
    name: "DatingHome",
    component: DatingHome,
  },
  {
    path: "/petcrush",
    name: "PetCrush",
    component: PetCrush,
  },
  {
    path: "/hostdetail",
    name: "HostDetailPage",
    component: HostDetailPage,
    props: {
      city: true,
      service: true,
      query: true
    },
  },
  {
    path: "/shop",
    name: "ShopHome",
    component: ShopHome,
    children: [{
        path: "",
        component: Shop,
      },
      {
        path: "products",
        component: FilterPage,
      },
    ],
  },
  // {
  //   path: "profile-view",
  //   name: "ProfileView",
  //   component: ProfileView,
  // },
  {
    path: "/owner",
    component: Owner,
    children: [{
        path: "",
        component: Account,
      },
      {
        path: "profile",
        component: Profile,
      },
      {
        path: "emergency",
        component: Emergency,
      },
      {
        path: "settings",
        component: Settings,
      },
      {
        path: "pets",
        name: "pets",
        component: Pet,
      },
      {
        path: "wallet",
        component: Profile,
      },
      {
        path: "messages",
        component: Message,
      },
      {
        path: "chat-messages",
        component: Message,
      },
      {
        path: "photos",
        component: Photos,
      },
      {
        path: "contracts",
        component: OwnerContract,
      },
      {
        path: "bookings",
        component: Booking,
      },
    ],
  },
  {
    path: "/host",
    component: HostAccount,
    children: [{
        path: "",
        component: HostDashboard,
      },
      {
        path: "messages",
        component: Message,
      },
      {
        path: "chat-messages",
        component: Message,
        props: {
          uname: true
        },
      },
      {
        path: "photos",
        component: Photos,
      },
      {
        path: "bookings",
        component: HostBooking,
      },
      {
        path: "canceled-bookings",
        component: CanceledBookings,
      },
      {
        path: "contracts",
        component: HostContract,
      },

      {
        path: "calendar",
        component: Message,
      },
      {
        path: "settings",
        component: HostSetting,
      },
      {
        path: "profile",
        component: HostProfile,
      },
      {
        path: "quiz",
        component: HostQuiz,
      },
      {
        path: "wallet",
        component: Wallet,
      },
    ],
  },
  {
    path: "*",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;