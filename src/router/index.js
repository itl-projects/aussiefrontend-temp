import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Owner from "@/views/Owner";
import HostResult from "@/views/HostResult";
import PerfectMatch from "@/views/PerfectMatch";
import HostAccount from "@/views/HostAccount";
import HostDashboard from "@/components/Host/Dashboard";
import Message from '@/components/commons/Message';
import MessageBox from '@/components/commons/MessageBox';
import CanceledBookings from '@/components/commons/CanceledBookings';
import Booking from '@/components/commons/Booking';
import Photos from '@/components/commons/Photos';
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
import ShopPage from "@/views/Shop";
import OwnerContract from "@/components/Owner/Contract";
import HostContract from "@/components/Host/Contract";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path:"/login",
    name:"Login",
    component: Login
  },
  {
    path:"/signup",
    name:"Signup",
    component: Login
  },
  // {
  //   path: "/hostsearch",
  //   component: HostResult
  // },
  {
    path: "/hostsearch",
    component: HostResult,
    props: {city:true,service:true,start_date:false}
  },
  {
    path:"/perfect-match",
    name:"PerfectMatch",
    component: PerfectMatch
  },
  {
    path:"/hostdetail",
    name:"HostDetailPage",
    component: HostDetailPage,
    props: {city:true,service:true,query:true}
  },
  {
    path:"/shop",
    name:"ShopPage",
    component: ShopPage
  },
  {
    path:"/owner",
    component: Owner,
    children: [
      {
        path: '',
        component: Account
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'emergency',
        component: Emergency
      },
      {
        path: 'settings',
        component: Settings
      },
      {
        path: 'pets',
        name:"pets",
        component: Pet
      },
      {
        path: 'wallet',
        component: Profile
      },
      {
        path: "messages",
        component: Message
      },
      {
        path: 'chat-messages',
        component: MessageBox
      },
      {
        path: 'photos',
        component: Photos
      },
      {
        path: 'contracts',
        component: OwnerContract
      },
      {
        path: "bookings",
        component: Booking
      }
    ]
  },
  { path: '/host', component: HostAccount,
      children: [
        {
          path: '',
          component: HostDashboard
        },
        {
          path: 'messages',
          component: Message
        },
        {
          path: 'chat-messages',
          component: MessageBox,
          props: {uname:true}
        },
        {
          path: 'photos',
          component: Photos
        },
        {
          path: 'bookings',
          component: HostBooking
        },
        {
          path: 'canceled-bookings',
          component: CanceledBookings
        },
        {
          path: 'contracts',
          component: HostContract
        },
        
        {
          path: 'calendar',
          component: Message
        },
        {
          path: 'settings',
          component: HostSetting
        },
        {
          path: 'profile',
          component: HostProfile
        }
      ]
    },
    {
      path: "*",
      component: PageNotFound
    }
];

const router = new VueRouter({
  routes,
  mode:"history"
});

export default router;
